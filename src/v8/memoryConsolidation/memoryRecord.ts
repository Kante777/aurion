
export interface MemoryRecord {

 id:string;

 event:string;

 confidence:number;

 outcome:
 "SUCCESS"
 |
 "FAILURE"
 |
 "UNKNOWN";

 importance:number;

 timestamp:number;

 tags:string[];

}

