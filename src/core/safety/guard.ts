export class SafetyGuard {

  static registerGlobalHandlers() {

    process.on("uncaughtException", (err) => {
      console.error("💥 UNCAUGHT EXCEPTION", err);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("💥 UNHANDLED PROMISE REJECTION", reason);
    });

    process.on("SIGTERM", () => {
      console.log("🛑 SIGTERM received — shutting down safely");
      process.exit(0);
    });
  }
}
