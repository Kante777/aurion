"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    listeners = new Map();
    on(event, fn) {
        const list = this.listeners.get(event) || [];
        list.push(fn);
        this.listeners.set(event, list);
    }
    emit(event, data) {
        const list = this.listeners.get(event) || [];
        for (const fn of list)
            fn(data);
    }
    // compatibility hook (fix TS errors)
    onAny(fn) {
        this.on("*", (data) => fn("*", data));
    }
}
exports.EventBus = EventBus;
