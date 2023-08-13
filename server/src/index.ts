import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';
import userRouter from './routes/authRoutes';
dotenv.config();



const app: Express = express();
const port = process.env.PORT;
app.use(express.json())
const prisma = new PrismaClient()
async function main() {
  app.use('/api/auth', userRouter);
  app.listen(port, () => {
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
