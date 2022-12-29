import 'reflect-metadata'

import { createExpressServer, useContainer } from 'routing-controllers';
import { Request, Response } from 'express';
import { Container } from 'typedi';

import { MovieController } from './controller/MovieController';
 

const PORT = process.env.SERVER_PORT || 5002;

const routes = [MovieController];

useContainer(Container);

const app = createExpressServer(
    {
        cors: true,
        controllers: routes,
    }
);

app.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export { app, server };