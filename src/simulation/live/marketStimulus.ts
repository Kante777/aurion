
export class MarketStimulus {

  generateShockStream() {

    return [
      {
        type: "NEWS",
        instrument: "EURUSD",
        impact: "HIGH",
        sentiment: -1,
        volatility: 0.9
      },
      {
        type: "CORRELATION_BREAK",
        instrument: "GBPUSD",
        impact: "MEDIUM",
        sentiment: -0.4,
        volatility: 0.6
      },
      {
        type: "LIQUIDITY_SPIKE",
        instrument: "XAUUSD",
        impact: "HIGH",
        sentiment: 0.8,
        volatility: 1.2
      },
      {
        type: "REGIME_FLIP",
        instrument: "NAS100",
        impact: "CRITICAL",
        sentiment: -0.2,
        volatility: 1.5
      }
    ];
  }
}
