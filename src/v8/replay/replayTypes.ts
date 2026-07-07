import {
CognitionArtifact
}
from "../cognition/output";


export interface ReplayRecord {

artifact:CognitionArtifact;

createdAt:number;

outcome?:unknown;

}


export interface ReplayMatch {

similarity:number;

artifact:CognitionArtifact;

}


export interface ReplayResult {

matches:ReplayMatch[];

confidence:number;

}

