'use client';

import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL;

const socket: Socket | null = typeof window !== 'undefined'
  ? io(SOCKET_URL ?? undefined, {
      autoConnect: true,
      transports: ['websocket'],
    })
  : null;

export default socket;
