import 'reflect-metadata'

import { createExpressServer, useContainer } from 'routing-controllers';
import { Express, Request, Response } from 'express';
import { Container } from 'typedi';

import { MovieController } from './controller/MovieController';
 

const PORT = 5002;

const routes = [MovieController];

useContainer(Container);

const app = createExpressServer(
    {
        controllers: routes,
    }
);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});