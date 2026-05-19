import express from 'express';
import helloRouter from './routes/hello.js';

const app = express();

app.use(express.json());

// Mount feature routes here. Add new routers as the app grows.
app.use('/', helloRouter);

export default app;
