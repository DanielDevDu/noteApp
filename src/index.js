import express from 'express';
import notesRoutes from './routes/notes.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(indexRoutes);
app.use(notesRoutes);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
