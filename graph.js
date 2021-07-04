/**
 * The virtual world (MEADOWFIELD) consists of 11 places with 14 roads between them
 * The network of roads in the village forms a graph
 * A graph is a collection of points(places in the village) with lines between them (roads)
 * Array of roads is converted into a data structure that, for each place, tells us what can be reached
 */

const roads = [
  `Alice's House-Bob's House`,   `Alice's House-Cabin`,
  `Alice's House-Post Office`,   `Bob's House-Town Hall`,
  `Daria's House-Ernie's House`, `Daria's House-Town Hall`,
  `Ernie's House-Grete's House`, `Grete's House-Farm`,
  `Grete's House-Shop`,          `Marketplace-Farm`,
  `Marketplace-Post Office`,     `Marketplace-Shop`,
  `Marketplace-Town Hall`,       `Shop-Town Hall`
];


// conversion
function buildGraph(edges) {  
  return edges.map(r => r.split("-")).reduce((acc, [from, to]) => {
    !acc.has(from) ? acc.set(from, [to]) : acc.get(from).push(to);
    !acc.has(to)   ? acc.set(to, [from]) : acc.get(to).push(from);

    return acc;
  }, new Map());
}

export const roadGraph = buildGraph(roads);