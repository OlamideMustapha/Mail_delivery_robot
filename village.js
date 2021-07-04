import { roadGraph } from "./graph.js";
import { randomPick } from "./random.js";

export class VillageState {
  constructor(place, parcels) {

/**
 * The village is condensed to the minimal set of values that defines it
 * There's the robot's current location and the collection of underlivered parcels, each of which has a current location and a destination address
 */
    /**
     * @var {String} place robots current location
     */
    this.place = place;

    /**
     * @var {Array<String>} parcels array of undelivered parcels
     */
    this.parcels = parcels;
  } // close constructor

  move(destination) {

  /**
   * Checking whether there is a road going fromt the current place to the destination, and if not, it returns the old state since this is not a valid move 
   * 
   */
    console.info(`Moved to ${destination}`);
  
    if (!roadGraph.get(this.place).includes(destination)) {
      return this;
    } else {
  
      let parcels = this.parcels.map(p => {
          if (p.get("place") != this.place) return p;
          
          p.set("place", destination);
  
          if (p.get("place") == p.get("address")) console.log(`Delivering Percels to ${p.get("address")}`);
  
          return p;
          })
        .filter(p => p.get("place") != p.get("address"));
  
      return new VillageState(destination, parcels);
    }
  } // close method

  static random (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Array.from(roadGraph.keys()));
      let place;
  
      do {
        place = randomPick(Array.from(roadGraph.keys()));
      } while (place == address);
      
      let map = new Map();
      map.set("place", place);
      map.set("address", address);

      parcels.push(map);
    }
    return new VillageState("Post Office", parcels);
  } // close method
} // close class
