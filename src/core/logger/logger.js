"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static info(message, data) {
        this.log("INFO", message, data);
    }
    static warn(message, data) {
        this.log("WARN", message, data);
    }
    static error(message, data) {
        this.log("ERROR", message, data);
    }
    static log(level, message, data) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data: data || null,
        };
        console.log(JSON.stringify(logEntry));
    }
}
exports.Logger = Logger;
