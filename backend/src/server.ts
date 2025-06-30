import app from './app';
import http from 'http';
import env from './config/env'
import connectDB from './config/db';

const server = http.createServer(app);

connectDB()

const PORT = env.PORT

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
})
