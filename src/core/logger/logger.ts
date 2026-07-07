export class Logger {

  static info(message: string, data?: any) {
    this.log("INFO", message, data);
  }

  static warn(message: string, data?: any) {
    this.log("WARN", message, data);
  }

  static error(message: string, data?: any) {
    this.log("ERROR", message, data);
  }

  private static log(level: string, message: string, data?: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data: data || null,
    };

    console.log(JSON.stringify(logEntry));
  }
}
