import { Server as SocketIOServer, Socket } from 'socket.io';

let io: SocketIOServer;

export const initializeSocket = (socketServer: SocketIOServer) => {
  io = socketServer;

  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    // Handle custom events here
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    // Example: Join a room
    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    // Example: Leave a room
    socket.on('leaveRoom', (room: string) => {
      socket.leave(room);
      console.log(`User ${socket.id} left room ${room}`);
    });
  });
};

export const emitToRoom = (room: string, event: string, data: any) => {
  if (io) {
    io.to(room).emit(event, data);
  }
};

export const emitToAll = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
  }
};

export const emitToSocket = (socketId: string, event: string, data: any) => {
  if (io) {
    io.to(socketId).emit(event, data);
  }
};
