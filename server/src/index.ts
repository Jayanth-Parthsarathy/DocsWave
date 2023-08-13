import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';
dotenv.config();



const app: Express = express();
const port = process.env.PORT;
const prisma = new PrismaClient()
async function main() {
  app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

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
