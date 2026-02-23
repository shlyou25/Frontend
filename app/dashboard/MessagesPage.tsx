"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

interface DomainGroup {
  domainId: string;
  domain: string;
  conversations: Conversation[];
}

interface Conversation {
  conversationId: string;
  user: string;
}

interface Message {
  _id: string;
  message: string;
  createdAt: string;
  isMine: boolean;
}

export default function MessagesPage() {
  const [domains, setDomains] = useState<DomainGroup[]>([]);
  const [activeDomain, setActiveDomain] = useState<DomainGroup | null>(null);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [myUserId, setMyUserId] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const hasConnectedRef = useRef(false);

  const API =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080/api/";
  const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";
  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await axios.get(`${API}auth/authenticate`, {
          withCredentials: true
        });

        setMyUserId(res.data?.user?.id || res.data?.id);
      } catch (err) {
        console.error("Failed to load user");
      }
    };

    loadMe();
  }, [API]);
  useEffect(() => {
    if (hasConnectedRef.current) return;
    hasConnectedRef.current = true;

    console.log("🔌 connecting socket to:", SOCKET_URL);

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ socket connected", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ socket connect error:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      hasConnectedRef.current = false;
    };
  }, [SOCKET_URL]);
  useEffect(() => {
    if (!activeConversation) return;

    const socket = socketRef.current;
    if (!socket) return;

    const joinRoom = () => {
      console.log("📩 joining room:", activeConversation.conversationId);
      socket.emit("join_conversation", activeConversation.conversationId);
    };

    if (!socket.connected) {
      socket.once("connect", joinRoom);
    } else {
      joinRoom();
    }
  }, [activeConversation]);
useEffect(() => {
  const socket = socketRef.current;
  if (!socket || !myUserId || !activeConversation) return;

  const handler = (msg: any) => {
    console.log("🔥 realtime message received", msg);

    if (msg.communicationId !== activeConversation.conversationId) return;

    setMessages(prev => {
      if (prev.some(m => m._id === msg._id)) return prev;

      const isMineIncoming =
        String(msg.senderId) === String(myUserId);
      if (isMineIncoming) {
        const optimisticIndex = prev.findIndex(
          m =>
            m._id.startsWith("temp-") &&
            m.isMine &&
            m.message === msg.message
        );

        if (optimisticIndex !== -1) {
          console.log("🔄 replacing optimistic message");

          const updated = [...prev];
          updated[optimisticIndex] = {
            _id: msg._id,
            message: msg.message,
            createdAt: msg.createdAt,
            isMine: true
          };

          return updated;
        }

        return prev;
      }
      return [
        ...prev,
        {
          _id: msg._id,
          message: msg.message,
          createdAt: msg.createdAt,
          isMine: false
        }
      ];
    });
  };

  socket.on("new_message", handler);

  return () => {
    socket.off("new_message", handler);
  };
}, [activeConversation, myUserId]);
  useEffect(() => {
    const loadInbox = async () => {
      try {
        console.log("📡 fetching inbox from:", `${API}communication`);

        const res = await axios.get(`${API}communication`, {
          withCredentials: true
        });

        console.log("📥 inbox response:", res.data);

        setDomains(res.data || []);

        if (res.data?.length) {
          setActiveDomain(res.data[0]);
          setActiveConversation(res.data[0].conversations?.[0] || null);
        }
      } catch (err) {
        console.error("❌ Failed to load inbox", err);
      }
    };

    loadInbox();
  }, [API]);
  useEffect(() => {
    if (!activeConversation) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `${API}communication/${activeConversation.conversationId}/messages`,
          { withCredentials: true }
        );

        setMessages(res.data || []);
      } catch (err) {
        console.error("❌ Failed to load messages", err);
      }
    };

    loadMessages();
  }, [activeConversation, API]);
  const sendReply = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!reply.trim() || !activeConversation) return;

    const tempId = "temp-" + Date.now();

    setMessages((prev) => [
      ...prev,
      {
        _id: tempId,
        message: reply,
        createdAt: new Date().toISOString(),
        isMine: true
      }
    ]);

    const messageToSend = reply;
    setReply("");

    try {
      await axios.post(
        `${API}communication/${activeConversation.conversationId}/reply`,
        { message: messageToSend },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("❌ Failed to send reply", err);
    }
  };
  return (
    <div className="h-auto flex bg-gray-100">
      <aside className="w-64 bg-white border-r overflow-y-auto">
        <div className="p-4 font-semibold border-b">Domains</div>

        {domains.length === 0 && (
          <div className="p-4 text-sm text-gray-400">
            No conversations yet
          </div>
        )}

        {domains.map((d) => (
          <button
            key={d.domainId}
            onClick={() => {
              setActiveDomain(d);
              setActiveConversation(d.conversations?.[0] || null);
            }}
            className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${activeDomain?.domainId === d.domainId ? "bg-blue-50" : ""
              }`}
          >
            {d.domain}
          </button>
        ))}
      </aside>

      <aside className="w-72 bg-white border-r overflow-y-auto">
        <div className="p-4 font-semibold border-b">Conversations</div>

        {activeDomain?.conversations?.map((c) => (
          <button
            key={c.conversationId}
            onClick={() => setActiveConversation(c)}
            className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${activeConversation?.conversationId === c.conversationId
                ? "bg-blue-100"
                : ""
              }`}
          >
            <div className="font-medium">{c.user}</div>
          </button>
        ))}
      </aside>
      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`flex ${m.isMine ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${m.isMine
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 border rounded-bl-sm"
                  }`}
              >
                <p className="whitespace-pre-wrap">{m.message}</p>
                <div
                  className={`text-xs mt-1 ${m.isMine ? "text-blue-100" : "text-gray-400"
                    }`}
                >
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t px-3 py-3 shrink-0">
          <form onSubmit={sendReply} className="flex items-end gap-2">
            <textarea
              placeholder="Type your message…"
              rows={1}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-2xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button
              type="submit"
              disabled={!reply.trim()}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white disabled:bg-gray-300"
            >
              ➤
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}