

export type EntityType =
 | "INSTRUMENT"
 | "MARKET_SESSION"
 | "LIQUIDITY_POOL"
 | "REGIME";


export interface WorldEntity {


 id:string;


 type:EntityType;


 properties:Record<string, unknown>;


}


