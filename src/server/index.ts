import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error';

import 'dotenv/config';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use(errorMiddleware);
export { server };