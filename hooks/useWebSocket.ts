"use client";

import { useEffect, useRef, useState } from "react";
import type { WSInbound, WSOutbound } from "./types";
import { theme } from "@/lib/theme";

export const useWebSocket = () => {
  const [status, setStatus] = useState<
    "connected" | "disconnected" | "reconnecting"
  >("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef<number>(0);

  const connect = () => {
    const url = theme.ws();
    setStatus(retryRef.current ? "reconnecting" : "disconnected");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      retryRef.current = 0;
      setStatus("connected");
    };

    ws.onclose = () => {
      setStatus("disconnected");
      const delay = Math.min(1000 * Math.pow(2, retryRef.current++), 8000);
      setTimeout(connect, delay);
    };

    ws.onerror = () => {
      setStatus("reconnecting");
      ws.close();
    };
  };

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, []);

  const send = (msg: WSOutbound) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const addListener = (fn: (data: WSInbound) => void) => {
    wsRef.current?.addEventListener("message", (ev) => {
      try {
        const data = JSON.parse(ev.data) as WSInbound;
        fn(data);
      } catch {}
    });
  };

  return { status, send, addListener };
};
