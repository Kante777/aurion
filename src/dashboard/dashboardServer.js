"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServer = void 0;
const http_1 = __importDefault(require("http"));
class DashboardServer {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    start(port = 8080) {
        const server = http_1.default.createServer((req, res) => {
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
exports.DashboardServer = DashboardServer;
