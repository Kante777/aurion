import http from "http";
import { EventBus } from "../core/bus/eventBus";

export class DashboardServer {
  constructor(private bus: EventBus) {}

  start(port = 8080) {
    const server = http.createServer((req, res) => {

      if (req.url === "/health") {
        res.writeHead(200);
        res.end("AURION DASHBOARD ONLINE");
        return;
      }

      if (req.url === "/state") {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          status: "active",
          system: "AURION",
          mode: "cognitive-streaming"
        }));

        return;
      }

      res.writeHead(404);
      res.end("Not Found");
    });

    server.listen(port, () => {
      console.log(`🧠 Dashboard running → http://localhost:${port}`);
    });
  }
}
