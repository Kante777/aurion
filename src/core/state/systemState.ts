import { Instrument } from "../contracts/instrument";

export interface SystemState {
  timestamp: number;

  activeInstruments: Instrument[];

  regime: Record<string, string>;

  liquidityMap: Record<string, any>;

  narrativeMap: Record<string, any>;

  contradictionIndex: number;
}

export class SystemStateManager {
  private state: SystemState;

  constructor() {
    this.state = {
      timestamp: Date.now(),
      activeInstruments: [],
      regime: {},
      liquidityMap: {},
      narrativeMap: {},
      contradictionIndex: 0,
    };
  }

  update(partial: Partial<SystemState>) {
    this.state = {
      ...this.state,
      ...partial,
      timestamp: Date.now(),
    };
  }

  getState(): SystemState {
    return this.state;
  }
}
