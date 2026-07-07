export interface RuntimeComponent {

name:string;

status:"offline"|"online";

}


export interface RuntimeState {

initialized:boolean;

components:RuntimeComponent[];

timestamp:number;

}

