import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { clientRoutes } from './routes/client.routes';
import { scheduleRoutes } from './routes/schedule.routes';
import { rootRoutes } from './routes/root.routes';
import { errorMiddleware } from './middlewares/error';
import { errors } from 'celebrate';

import 'dotenv/config';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// routes
server.use('/clients', clientRoutes);
server.use('/schedules', scheduleRoutes);
server.use('/roots', rootRoutes);

server.use(errors());
server.use(errorMiddleware);
export { server };