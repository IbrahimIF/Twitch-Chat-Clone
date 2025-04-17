import {useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT

export default function useChatConnection() {
    const [socket, setSocket] = useState<Socket | null>(null);
  
    useEffect(() => {
      const socketIo = io(ENDPOINT, {
        reconnection: true,
        reconnectionAttempts: 5,
      });
  
      setSocket(socketIo);
  
      return () => {
        socketIo.disconnect();
      };
    }, []);
  
    return socket;
  }