import express from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';
import cors from "cors"
import http from "http";
import { Server } from "socket.io";
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import documentRouter from './routes/documentRoutes';
dotenv.config();
const prisma = new PrismaClient()


async function main() {
  const app = express();
  const port = process.env.PORT || 5000;
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
  });
  app.use(express.json())
  app.use(cors())
  app.use('/api/auth', authRouter)
  app.use('/api/user', userRouter)
  app.use('/api/document', documentRouter)
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
