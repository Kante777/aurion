export class EventBus {

  private listeners: Map<string, Function[]> = new Map();

  on(event: string, fn: Function) {
    const list = this.listeners.get(event) || [];
    list.push(fn);
    this.listeners.set(event, list);
  }

  emit(event: string, data: any) {
    const list = this.listeners.get(event) || [];
    for (const fn of list) fn(data);
  }

  // compatibility hook (fix TS errors)
  onAny(fn: (event: string, data: any) => void) {
    this.on("*", (data: any) => fn("*", data));
  }
}
