import express, { json, urlencoded } from 'express';
import connection from './config/connection.js';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', router);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
