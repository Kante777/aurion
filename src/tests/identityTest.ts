import { IdentityCore } from "../core/identity/identityCore";
import { IdentityMonitor } from "../core/identity/identityMonitor";

const core = new IdentityCore();
const monitor = new IdentityMonitor(core);

console.log("🧠 IDENTITY TEST START");

for (let i = 0; i < 10; i++) {

  const signal = {
    market: "EURUSD",
    noise: Math.random()
  };

  const result = monitor.runCycle(signal);

  console.log({
    cycle: i,
    coherence: result.identity.coherence,
    drift: result.driftDetected,
    status: result.status
  });
}

console.log("🧠 IDENTITY TEST COMPLETE");
