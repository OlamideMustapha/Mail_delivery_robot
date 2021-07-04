import { VillageState }      from "./village.js";
import { randomRobot }       from "./random.js";
import { routeRobot }        from "./route.js";
import { goalOrientedRobot } from "./pathfinder.js";
/**
 * ROBOT
 * a program that performs a mail delivery task in a virtual world
 * a mail-delivery robot picking up and dropping off parcels
 * 
 * TASK
 * The robot will be moving around the village
 * There are parcels in various laction, each addressed to some other location in the village
 * The robot picks up parcels when it comes to them and delivers them when it arrives at their destinaion
 */



/**
 * SIMULATION
 * Simply saying the "robot" is a function that takes a VillageState object and returns the name of a nearby place
 * The robots has memory and return a new memory, this helps them remember things, so that they can make and execute plans
 * 
 * @param {state} Object the current village state
 * @param {robot}
 * @param {memory} _ the robot's memory
 * @return {void}
 */

function runRobot(state, robot, memory) {

  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.info(`Done in ${turn} turns`);
      break;
    }

    let action = robot(state, memory);
    let initialPickup = state.parcels.map(
      p => p.place == action.get("direction") ? p.place : null);
    
    state = state.move(action.get("direction"));
    memory = action.get("memory");
    
    initialPickup.forEach(item => item != null
      ? console.log(`Picking up percel from ${item}`)
      : null);
    
  }
}

// runRobot(VillageState.random(100), randomRobot);

runRobot(VillageState.random(100), routeRobot, []);

// runRobot(VillageState.random(100), goalOrientedRobot, []);