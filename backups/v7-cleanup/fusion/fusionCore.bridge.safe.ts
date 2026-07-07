export function ensureBridge(bridge: any) {
  if (!bridge.applyOutcome) {
    throw new Error("AdaptiveFusionBridge missing applyOutcome()");
  }
  if (!bridge.getWeights) {
    throw new Error("AdaptiveFusionBridge missing getWeights()");
  }
  return bridge;
}
