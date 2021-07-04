const roads = [
  `Alice's House-Bob's House`,   `Alice's House-Cabin`,
  `Alice's House-Post Office`,   `Bob's House-Town Hall`,
  `Daria's House-Ernie's House`, `Daria's House-Town Hall`,
  `Ernie's House-Grete's House`, `Grete's House-Farm`,
  `Grete's House-Shop`,          `Marketplace-Farm`,
  `Marketplace-Post Office`,     `Marketplace-Shop`,
  `Marketplace-Town Hall`,       `Shop-Town Hall`
];

const mailRoute = [
  "Alice's House", "Cabin",
  "Alice's House", "Bob's House",
  "Town Hall", "Daria's House",
  "Ernie's House", "Grete's House",
  "Shop", "Grete's House",
  "Farm", "Marketplace",
  "Post Office"
];


let buildGraph = edges => edges.map(edge => edge.split("-"))
  .reduce((acc, [from, to]) => {
    acc.has(from) ? acc.get(from).push(to) : acc.set(from, [to]);
    acc.has(to) ? acc.get(to).push(from) : acc.set(to, [from]);

    return acc;
  }, new Map());

let roadGraph = buildGraph(roads);

let randomPick = array => array[Math.floor(Math.random() * array.length)];


class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {

    console.log("Moving to " + destination);

    return !roadGraph.get(this.place).includes(destination)
      ? this : new VillageState(destination,
        this.parcels.map(p => p.get("place") != this.place
          ? p : p.set("place", destination))
        .filter(p => p.get("place") != p.get("address")));
  }

  static random(parcelCount = 5) {
    
    let parcels = [];

    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Array.from(roadGraph.keys()));
      let place;
  
      do {
        place = randomPick(Array.from(roadGraph.keys()));
      } while (place == address);

      let parcel = new Map();
      parcel.set("place", place);
      parcel.set("address", address);

      parcels.push(parcel);
    }

    return new VillageState("Post Office", parcels);
  }
}


function runRobot(state, robot, memory) {

  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      turn > 1 ? console.log(`Delivered in ${turn} turns`)
        : console.log(`Delivered in ${turn} turn`);
      break;
    }

    let action = robot(state, memory);

    state = state.move(action.get("direction"));
    memory = action.get("memory");
  }
};


// random robot
function randomRobot(state) {
  return new Map().set("direction", randomPick(roadGraph.get(state.place)));
}

// runRobot(VillageState.random(), randomRobot);

// pathfinding robot
function findRoute(graph, from, to) {
  let routes = new Map();
  routes.set("at", from);
  routes.set("route", []);

  let work = [routes];

  for (let i = 0; i < work.length; i++) {
    let [at, route] = work[i].values();
 
    for(let node of graph.get(at)){
      if (node == to) return route.concat(node);

      if (!work.some(w => w.get(at) == node)) {
        let map = new Map();
        map.set("at", node);
        map.set("from", route.concat(node));
        work.push(map);
      }
    };
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    route = (parcel.get("place") != place)
      ? findRoute(roadGraph, place, parcel.get("place"))
      : findRoute(roadGraph, place, parcel.get("address"));
  }

  let map = new Map();
  map.set("direction", route[0]);
  map.set("memory", route.slice(1));

  return map;
}


// runRobot(VillageState.random(), goalOrientedRobot, []);


function routeRobot(state, route) {
  if (route.length == 0) route = mailRoute;

  let map = new Map();
  map.set("direction", route[0]);
  map.set("memory", route.slice(1));
  return map;
}

runRobot(VillageState.random(), routeRobot, []);

