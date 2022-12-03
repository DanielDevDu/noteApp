import app from './app.js';
import { PORT } from './config.js';
import swaggerApp from './swagger.js';

app.listen(PORT, () => {
  console.log('App listening on port..... ', PORT);
  swaggerApp(app, PORT);
});
