"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

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

  const API = process.env.NEXT_PUBLIC_apiLink;

  useEffect(() => {
    const loadInbox = async () => {
      try {
        const res = await axios.get(`${API}communication`, {
          withCredentials: true
        });

        setDomains(res.data);

        if (res.data.length) {
          setActiveDomain(res.data[0]);
          setActiveConversation(res.data[0].conversations[0]);
        }
      } catch (err) {
        console.error("Failed to load inbox", err);
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
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    loadMessages();
  }, [activeConversation, API]);

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !activeConversation) return;

    try {
      await axios.post(
        `${API}communication/${activeConversation.conversationId}/reply`,
        { message: reply },
        { withCredentials: true }
      );
      setReply("");
      const res = await axios.get(
        `${API}communication/${activeConversation.conversationId}/messages`,
        { withCredentials: true }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  return (
    <div className="h-auto flex bg-gray-100">
      <aside className="w-64 bg-white border-r overflow-y-auto">
        <div className="p-4 font-semibold border-b">Domains</div>
        {domains.map(d => (
          <button
            key={d.domainId}
            onClick={() => {
              setActiveDomain(d);
              setActiveConversation(d.conversations[0]);
            }}
            className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${
              activeDomain?.domainId === d.domainId ? "bg-blue-50" : ""
            }`}
          >
            {d.domain}
          </button>
        ))}
      </aside>
      <aside className="w-72 bg-white border-r overflow-y-auto">
        <div className="p-4 font-semibold border-b">Conversations</div>
        {activeDomain?.conversations.map(c => (
          <button
            key={c.conversationId}
            onClick={() => setActiveConversation(c)}
            className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${
              activeConversation?.conversationId === c.conversationId
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
          {messages.map(m => (
            <div
              key={m._id}
              className={`flex ${m.isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm
                  ${m.isMine
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 border rounded-bl-sm"
                  }
                `}
              >
                <p className="whitespace-pre-wrap">{m.message}</p>
                <div
                  className={`text-xs mt-1 ${
                    m.isMine ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
<div className="bg-white border-t px-3 py-3 shrink-0">
  <form
    onSubmit={sendReply}
    className="flex items-end gap-2 max-w-full"
  >
    {/* Textarea wrapper */}
    <div className="flex-1 relative">
      <textarea
        placeholder="Type your message…"
        rows={1}
        className="
          w-full
          px-4 py-2.5
          border border-gray-300
          rounded-2xl
          resize-none
          text-sm
          leading-5
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition
          max-h-32
        "
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendReply();
          }
        }}
      />
    </div>

    {/* Send Button */}
    <button
      type="submit"
      disabled={!reply.trim()}
      className="
        h-10 w-10
        flex items-center justify-center
        rounded-full
        bg-blue-600
        text-white
        hover:bg-blue-700
        disabled:bg-gray-300
        disabled:cursor-not-allowed
        transition
      "
      aria-label="Send message"
    >
      {/* Send Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
        />
      </svg>
    </button>
  </form>
</div>

      </main>
    </div>
  );
}
