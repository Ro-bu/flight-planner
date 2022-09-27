
const possibleRoutes = [
    {planet:"Neptune", destinations:["Mercury", "Uranus"]},
    {planet:"Uranus", destinations:["Saturn", "Neptune"]},
    {planet:"Saturn",  destinations:["Neptune", "Earth"]},
    {planet:"Jupiter", destinations:["Mars", "Venus"]},
    {planet:"Mars", destinations:["Venus"]},
    {planet:"Earth", destinations:["Jupiter", "Uranus"]},
    {planet:"Venus", destinations:["Earth", "Mercury"]},
    {planet:"Mercury", destinations:["Venus"]}
]

let currentList = [];

let  v;
 
let adjList;
 
// A directed graph using
// adjacency list representation
function Graph(vertices)
{
    // initialise vertex count
        v = vertices;
  
        // initialise adjacency list
        initAdjList();
}
 
// utility method to initialise
    // adjacency list
function initAdjList()
{
    adjList = new Array(v);
  
        for (let i = 0; i < v; i++) {
            adjList[i] = [];
        }
}
 
// add edge from u to v
function addEdge(u,v)
{
    // Add v to u's list.
        adjList[u].push(v);
}
 
// Prints all paths from
    // 's' to 'd'
function printAllPaths(s,d)
{
     let isVisited = new Array(v);
     for(let i=0;i<v;i++)
         isVisited[i]=false;
        let pathList = [];
  
        // add source to path[]
        pathList.push(s);
  
        // Call recursive utility
        printAllPathsUtil(s, d, isVisited, pathList);
}
 
// A recursive function to print
    // all paths from 'u' to 'd'.
    // isVisited[] keeps track of
    // vertices in current path.
    // localPathList<> stores actual
    // vertices in the current path
function printAllPathsUtil(u,d,isVisited,localPathList)
{
    if (u === (d)) {
        currentList.push([...localPathList])
        return localPathList;
        }
  
        // Mark the current node
        isVisited[u] = true;
  
        // Recur for all the vertices
        // adjacent to current vertex
        for (let i=0;i< adjList[u].length;i++) {
            if (!isVisited[adjList[u][i]]) {
                // store current node
                // in path[]
                localPathList.push(adjList[u][i]);
                printAllPathsUtil(adjList[u][i], d,
                isVisited, localPathList);
  
                // remove current node
                // in path[]
                localPathList.splice(localPathList.indexOf
                (adjList[u][i]),1);
            }
        }
  
        // Mark the current node
        isVisited[u] = false;
}
 
 // Driver program
// Create a sample graph
function initializeGraph(){
    Graph(possibleRoutes.length);
    possibleRoutes.forEach((planet) => {
        let pathStart = possibleRoutes.indexOf(planet)
        planet.destinations.forEach((destinationPlanet) => {
            possibleRoutes.forEach((checkedDestination) => {
                if(destinationPlanet === checkedDestination.planet){
                    addEdge(pathStart, possibleRoutes.indexOf(checkedDestination))
                }
            })
        })
    })
}
 
function getPlanetIndex(planetName) {
    let index
    possibleRoutes.forEach((planetObject) => {
        if(planetObject.planet === planetName){
            index = possibleRoutes.indexOf(planetObject)
        }
    })
    return index;
}
 
function getPossibleRoutes(from, to) {
    currentList = [];
    initializeGraph();
    let fromPlanetIndex = getPlanetIndex(from);
    let toPlanetIndex = getPlanetIndex(to);
    printAllPaths(fromPlanetIndex, toPlanetIndex);
    return currentList;
}

export {getPossibleRoutes, possibleRoutes}