import express from 'express';
import helloRouter from './routes/hello.js';
import worldmapRouter from './routes/worldmap.js';

const app = express();

app.use(express.json());

// Mount feature routes here. Add new routers as the app grows.
app.use('/', helloRouter);
app.use('/', worldmapRouter);

export default app;
