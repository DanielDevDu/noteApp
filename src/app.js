import express from 'express';
import notesRoutes from './routes/notes.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use('/api', notesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
