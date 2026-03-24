"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { Send } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

interface Conversation {
  conversationId: string;
  user: string;
}

interface DomainGroup {
  domainId: string;
  domain: string;
  conversations: Conversation[];
}

interface Message {
  _id: string;
  message: string;
  createdAt: string;
  isMine: boolean;
  seen?: boolean;
}

export default function MessagesPage() {
  const [domains, setDomains] = useState<DomainGroup[]>([]);
  const [activeDomain, setActiveDomain] = useState<DomainGroup | null>(null);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);


  const [messages, setMessages] = useState<Message[]>([]);
  const { unreadMap, setUnreadMap, totalUnread } = useNotifications();
  const [reply, setReply] = useState("");
  const [myUserId, setMyUserId] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API = process.env.NEXT_PUBLIC_apiLink;
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

  // ================= SCROLL =================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= LOAD USER =================
  useEffect(() => {
    axios
      .get(`${API}auth/authenticate`, { withCredentials: true })
      .then((res) => {
        setMyUserId(res.data?.user?.id || res.data?.id);
      });
  }, [API]);

  // ================= SOCKET INIT (ONCE) =================
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect(); // ✅ now returns void
    };
  }, [SOCKET_URL]);

  // ================= SOCKET EVENTS =================
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    // NEW MESSAGE
    const handleNewMessage = (msg: any) => {
      const isCurrent =
        msg.communicationId === activeConversation?.conversationId;

      const isMine = String(msg.senderId) === String(myUserId);

      if (isCurrent) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;

          return [
            ...prev,
            {
              _id: msg._id,
              message: msg.message,
              createdAt: msg.createdAt,
              isMine,
              seen: msg.seen ?? false, // ✅ DO NOT FORCE FALSE
            },
          ];
        });
      } else {
        setUnreadMap((prev:any) => ({
          ...prev,
          [msg.communicationId]:
            (prev[msg.communicationId] || 0) + 1,
        }));
      }
    };

    // SEEN EVENT
    const handleSeen = ({ conversationId }: any) => {
      if (conversationId !== activeConversation?.conversationId) return;

      setMessages((prev) => {
        const updated = [...prev];

        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].isMine) {
            updated[i] = { ...updated[i], seen: true };
            break;
          }
        }

        return updated;
      });
    };

    socket.on("new_message", handleNewMessage);
    socket.on("messages_seen", handleSeen);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("messages_seen", handleSeen);
    };
  }, [activeConversation, myUserId]);

  // ================= JOIN ROOM =================
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !activeConversation) return;

    socket.emit("join_conversation", activeConversation.conversationId);
  }, [activeConversation]);

  // ================= MARK AS SEEN =================
  useEffect(() => {
    if (!activeConversation) return;

    axios.post(
      `${API}communication/${activeConversation.conversationId}/seen`,
      {},
      { withCredentials: true }
    );

    setUnreadMap((prev:any) => ({
      ...prev,
      [activeConversation.conversationId]: 0,
    }));
  }, [activeConversation]);

  // ================= LOAD INBOX =================
  useEffect(() => {
    axios
      .get(`${API}communication`, { withCredentials: true })
      .then((res) => {
        setDomains(res.data || []);

        if (res.data?.length) {
          setActiveDomain(res.data[0]);
          setActiveConversation(res.data[0].conversations?.[0]);
        }
      });
  }, [API]);

  // ================= LOAD MESSAGES (SAFE MERGE) =================
  useEffect(() => {
    if (!activeConversation) return;

    axios
      .get(
        `${API}communication/${activeConversation.conversationId}/messages`,
        { withCredentials: true }
      )
      .then((res) => {
        setMessages((prev) => {
          const incoming = res.data || [];

          return incoming.map((msg: any) => {
            const existing = prev.find((p) => p._id === msg._id);

            return existing
              ? {
                ...msg,
                seen: existing.seen ?? msg.seen ?? false, // ✅ NEVER downgrade
              }
              : msg;
          });
        });
      });
  }, [activeConversation, API]);

  // ================= SEND =================
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
        isMine: true,
        seen: false,
      },
    ]);

    const msg = reply;
    setReply("");

    await axios.post(
      `${API}communication/${activeConversation.conversationId}/reply`,
      { message: msg },
      { withCredentials: true }
    );
  };

  // ================= UI =================
  if (!domains.length)
    return <div className="p-6 text-center">No messages yet</div>;

  return (
    <div className="h-full flex bg-gray-100">
      {/* DOMAINS */}
      <aside className="w-64 bg-white border-r">
        {domains.map((d) => (
          <button
            key={d.domainId}
            onClick={() => {
              setActiveDomain(d);
              setActiveConversation(d.conversations[0]);
            }}
            className="w-full text-left px-4 py-3 border-b hover:bg-gray-50"
          >
            {d.domain}
          </button>
        ))}
      </aside>

      {/* CONVERSATIONS */}
      <aside className="w-72 bg-white border-r">
        {activeDomain?.conversations.map((c) => (
          <button
            key={c.conversationId}
            onClick={() => setActiveConversation(c)}
            className="w-full text-left px-4 py-3 border-b flex justify-between"
          >
            <span>{c.user}</span>

            {unreadMap[c.conversationId] > 0 && (
              <span className="bg-red-500 text-white px-2 rounded-full text-xs">
                {unreadMap[c.conversationId]}
              </span>
            )}
          </button>
        ))}
      </aside>

      {/* CHAT */}
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white font-semibold">
          {activeConversation?.user}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`flex ${m.isMine ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[60%]
                ${m.isMine
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                  }`}
              >
                {m.message}

                <div className="text-[10px] mt-1 flex gap-1">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                  {m.isMine && (
                    <span>
                      {m.seen ? "✓✓ Seen" : "✓ Sent"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendReply} className="p-3 flex gap-2 bg-white">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-lg"
            placeholder="Type message..."
          />
          <button className="bg-blue-600 text-white px-4 rounded-lg">
            <Send size={16} />
          </button>
        </form>
      </main>
    </div>
  );
}