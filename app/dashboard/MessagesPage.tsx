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
    process.env.NEXT_PUBLIC_apiLink
  const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL
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
  <div className="h-full flex bg-gray-100">
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="px-5 py-4 font-semibold text-gray-900 border-b sticky top-0 bg-white z-10">
        Domains
      </div>

      <div className="overflow-y-auto">
        {domains.length === 0 && (
          <div className="p-6 text-sm text-gray-400 text-center">
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
            className={`w-full text-left px-5 py-3 border-b transition-all
              hover:bg-gray-50
              ${
                activeDomain?.domainId === d.domainId
                  ? "bg-blue-50 border-l-4 border-l-blue-600"
                  : ""
              }`}
          >
            <div className="font-medium text-sm text-gray-900 truncate">
              {d.domain}
            </div>
            <div className="text-xs text-gray-400">
              {d.conversations?.length || 0} chats
            </div>
          </button>
        ))}
      </div>
    </aside>

    {/* ================= MIDDLE: CONVERSATIONS ================= */}
    <aside className="w-72 bg-white border-r flex flex-col">
      <div className="px-5 py-4 font-semibold text-gray-900 border-b sticky top-0 bg-white z-10">
        Conversations
      </div>

      <div className="overflow-y-auto">
        {activeDomain?.conversations?.map((c) => (
          <button
            key={c.conversationId}
            onClick={() => setActiveConversation(c)}
            className={`w-full text-left px-5 py-3 border-b flex items-center gap-3
              transition-all hover:bg-gray-50
              ${
                activeConversation?.conversationId === c.conversationId
                  ? "bg-blue-50"
                  : ""
              }`}
          >
            {/* Avatar */}
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
              {c.user?.charAt(0)?.toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">
                {c.user}
              </div>
              <div className="text-xs text-gray-400">Active chat</div>
            </div>
          </button>
        ))}
      </div>
    </aside>

    {/* ================= RIGHT: CHAT ================= */}
    <main className="flex-1 flex flex-col bg-gray-50">
      {/* ===== Chat Header ===== */}
      <div className="px-6 py-4 bg-white border-b flex items-center gap-3 sticky top-0 z-10">
        {activeConversation ? (
          <>
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold">
              {activeConversation.user?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <div className="font-semibold text-gray-900">
                {activeConversation.user}
              </div>
             
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-400">
            Select a conversation
          </div>
        )}
      </div>

      {/* ===== Messages ===== */}
      <div
        id="messages-container"
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
      >
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No messages yet
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m._id}
            className={`flex ${
              m.isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[65%] px-4 py-2.5 rounded-2xl text-sm shadow-sm
                ${
                  m.isMine
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 border rounded-bl-sm"
                }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">
                {m.message}
              </p>
              <div
                className={`text-[11px] mt-1 ${
                  m.isMine ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Input ===== */}
      <div className="bg-white border-t px-4 py-3">
        <form onSubmit={sendReply} className="flex items-end gap-3">
          <textarea
            placeholder="Type a message..."
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl resize-none text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              max-h-32"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />

          <button
            type="submit"
            disabled={!reply.trim()}
            className="h-11 w-11 flex items-center justify-center rounded-full
              bg-blue-600 text-white disabled:bg-gray-300
              hover:bg-blue-700 transition-all shadow-sm"
          >
            ➤
          </button>
        </form>
      </div>
    </main>
  </div>
);
}