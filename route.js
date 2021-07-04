
/**
 * THE MAIL TRUCK'S ROUTE
 */

// a route that passes all places in the village
const mailRoute = [
  "Alice's House", "Cabin",
  "Alice's House", "Bob's House",
  "Town Hall", "Daria's House",
  "Ernie's House", "Grete's House",
  "Shop", "Grete's House",
  "Farm", "Marketplace",
  "Post Office"
];


export function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }

  let map = new Map();
  map.set("direction", memory[0]);
  map.set("memory", memory.slice(1));
  return map;
}
