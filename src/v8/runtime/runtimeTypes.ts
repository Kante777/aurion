export enum RuntimeStatus {

    CREATED = "CREATED",

    INITIALIZING = "INITIALIZING",

    RUNNING = "RUNNING",

    PAUSED = "PAUSED",

    STOPPED = "STOPPED"

}


export interface RuntimeSnapshot {

    status: RuntimeStatus;

    cycles: number;

    startedAt:number;

    lastCycle?:number;

}