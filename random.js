import { roadGraph } from "./graph.js";

/**
 * RANDOM ROBOT
 * for a randomly moving robot, it randomly move around the nodes on the graph and 
   picks up parcels if it come across any on it way. also randomly dilvering the parcels to each address
 * @param {array state} array 
 */

/**
 * @function randomPick picks a random location on the graph
 * @param {Array<String>} array 
 * @returns {String}
 */
export let randomPick = array => array[Math.floor(Math.random() * array.length)];


export function randomRobot(state) {
  return new Map().set("direction", randomPick(roadGraph.get(state.place)));
}
