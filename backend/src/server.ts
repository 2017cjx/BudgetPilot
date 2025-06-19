import app from './app';
import http from 'http';
import env from './config/env'

const server = http.createServer(app);

const PORT = env.PORT

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
})
