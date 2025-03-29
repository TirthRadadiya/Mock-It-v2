import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("initializing socket service");
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
      },
    });
  }

  public initListeners() {
    console.log("initializing socket listeners");
    this._io.on("connection", (socket) => {
      console.log("new user connected", socket.id);

      socket.on("event:message", ({ message }: { message: string }) => {
        console.log("new message received", message);

        setTimeout(() => {
          socket.emit("event:receive-message", {
            message: "message received" + socket.id,
          });
        }, 3000);
      });
    });
  }

  public get io() {
    return this._io;
  }
}

export default SocketService;
