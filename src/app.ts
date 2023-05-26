import * as dotenv from 'dotenv';
import createServer from './utils/server';

dotenv.config();

const port = Number(process.env.PORT) || 3333;

const app = createServer();

app.listen(port, '0.0.0.0', () =>
  console.log(`API available on http://localhost:${port}`),
);
