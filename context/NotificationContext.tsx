"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: any) => {
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>({});

  const API = process.env.NEXT_PUBLIC_apiLink;
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

  // ✅ TOTAL COUNT (optimized)
  const totalUnread = Object.values(unreadMap).reduce(
    (sum, count) => sum + count,
    0
  );

  // ================= INITIAL LOAD =================
  useEffect(() => {
    const loadUnread = async () => {
      try {
        const res = await axios.get(`${API}communication`, {
          withCredentials: true,
        });

        const data = res.data || [];
        const map: Record<string, number> = {};

        data.forEach((d: any) => {
          d.conversations?.forEach((c: any) => {
            if (c.unread > 0) {
              map[c.conversationId] = c.unread;
            }
          });
        });

        setUnreadMap(map);
      } catch (err) {
        console.error("Failed to load unread", err);
      }
    };

    loadUnread();
  }, [API]);

  // ================= SOCKET GLOBAL =================
  useEffect(() => {
    if (!SOCKET_URL) return;

    const socket: Socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    // 🔥 NEW MESSAGE
    socket.on("new_message", (msg: any) => {
      setUnreadMap((prev) => ({
        ...prev,
        [msg.communicationId]:
          (prev[msg.communicationId] || 0) + 1,
      }));
    });

    // 🔥 SEEN RESET
    socket.on("messages_seen", ({ conversationId }: any) => {
      setUnreadMap((prev) => ({
        ...prev,
        [conversationId]: 0,
      }));
    });

    // ✅ CLEANUP FIX
    return () => {
      socket.disconnect();
    };
  }, [SOCKET_URL]);

  return (
    <NotificationContext.Provider
      value={{ unreadMap, setUnreadMap, totalUnread }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);