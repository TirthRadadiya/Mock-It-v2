import { Server } from "socket.io";
import { GoogleGenerativeAI } from "@google/generative-ai";

class SocketService {
  private _io: Server;
  private genAI: GoogleGenerativeAI;

  constructor() {
    console.log("initializing socket service");
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
      },
    });

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  }

  private async getAIResponse(userMessage: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction:
          "You are an interviwer who has taken many interview. Based on given user's response ask next question and analyze user's response. Behave like an interviweer",
      });
      const result = await model.generateContent(userMessage);
      const responseText = result.response.text();

      return responseText || "I couldn't understand that, please try again.";
    } catch (error) {
      console.error("Error in Gemini API:", error);
      return "There was an error processing your request.";
    }
  }

  public initListeners() {
    console.log("initializing socket listeners");
    this._io.on("connection", (socket) => {
      console.log("new user connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("new message received", message);

        // socket.emit("event:receive-message", {
        //   message:
        //     "Hello How are you doing today Sir? Let me know how Can I help you?",
        // });
        try {
          // Get AI response
          const aiResponse = await this.getAIResponse(message);

          console.log(aiResponse);

          // Emit the AI-generated response back to the client
          socket.emit("event:receive-message", {
            message: aiResponse,
          });
        } catch (error) {
          console.error("Error getting AI response:", error);
          socket.emit("event:receive-message", {
            message:
              "Sorry, I am unable to process your request at the moment.",
          });
        }
      });
    });
  }

  public get io() {
    return this._io;
  }
}

export default SocketService;
