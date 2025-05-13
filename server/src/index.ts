import http from "http";
import SocketService from "./services/socket";
import dotenv from "dotenv";

async function startServer() {
  const server = http.createServer();
  const PORT = process.env.PORT || 8080;

  dotenv.config();

  const socketService = new SocketService();
  socketService.io.attach(server);

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });

  socketService.initListeners();
}

startServer();
