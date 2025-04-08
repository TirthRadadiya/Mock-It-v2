"use client";

import React, { useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  sendMessage: (message: string) => any;
  socket: Socket | null;
  agentMessage: string;
  // startSocket: (path: string) => void;
}

interface SocketProviderProps {
  children?: React.ReactNode;
}

const socketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = React.useContext(socketContext);

  //   if (!state) {
  //     throw new Error("useSocket must be used within a SocketProvider");
  //   }

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [agentMessage, setAgentMessage] = React.useState<string>("");

  // const startSocket: ISocketContext["startSocket"] = (path: string) => {
  //   const _socket = io(path);
  //   _socket.on("connect", () => {
  //     console.log("socekt connected", _socket.id);
  //   });
  //   setSocket(_socket);
  // };

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message) => {
      console.log("send message", message);
      if (socket) {
        console.log("socket", socket.id);
        socket.emit("event:message", { message });
      }
    },
    [socket]
  );

  useEffect(() => {
    const _socket = io("http://localhost:8080");
    setSocket(_socket);

    _socket.on("connect", () => {
      console.log("connected", _socket.id);
    });

    _socket.on("event:receive-message", (data) => {
      console.log("receive message", data);
      setAgentMessage(data.message);
    });

    return () => {
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <socketContext.Provider value={{ sendMessage, socket, agentMessage }}>
      {children}
    </socketContext.Provider>
  );
};
