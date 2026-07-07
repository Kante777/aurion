

export class ConflictMonitor {


 evaluate(
  conflicts:number
 ){

  return {

   conflicts,

   severity:
    conflicts > 3
    ? "HIGH"
    :
    conflicts > 0
    ? "MEDIUM"
    :
    "NONE"

  };


 }


}


