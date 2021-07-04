import { roadGraph } from "./graph.js";

/**
 * PATHFINDING
 */
function findRoute(graph, from, to) {
  let map = new Map();
  map.set("at", from);
  map.set("route", []);

  let work = [map];

  for (let i = 0; i < work.length; i++) {
    let [at, route] = work[i].values();
  
    for (let place of graph.get(at)){
      if (place == to) return route.concat(place);
      if (!work.some(w => w.get(at) == place)) {
        let map = new Map();
        map.set("at", place);
        map.set("route", route.concat(place));
        work.push(map);
      }
    };
  };
}


export function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
  
    let parcel = parcels[0];
    if (parcel.get("place") != place) {
      route = findRoute(roadGraph, place, parcel.get("place"));
    } else {
      route = findRoute(roadGraph, place, parcel.get("address"));
    }
  }
  
  let map = new Map();
  map.set("direction", route[0]);
  map.set("memory", route.slice(1));
  return map;
}