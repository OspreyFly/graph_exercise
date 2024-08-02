class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.addVertex(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    this.nodes.add(v1); // Ensure both nodes exist in the graph
    this.nodes.add(v2);
    
    // Update adjacency lists
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }
  

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    const v1Adjacents = [...v1.adjacent];
    const v2Adjacents = [...v2.adjacent];
  
    if (v1Adjacents.includes(v2)) {
      v1.adjacent.delete(v2);
    }
  
    if (v2Adjacents.includes(v1)) {
      v2.adjacent.delete(v1);
    }
  }
  

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    const adjacents = [...vertex.adjacent];
    adjacents.forEach(adjacent => adjacent.adjacent.delete(vertex));
  
    this.nodes.delete(vertex);
  }
  
  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // base case
      if (!vertex) {
        return null;
      }
      // visit node
      visited.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);

    return result;
  }
  
  
  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = [];
    const queue = [start]; // Start with the start node itself
    
    while (queue.length > 0) {
      const current = queue.shift(); // Remove the first node from the queue
      const currentValue = current.value; // Convert Node object to its value
      if (!visited.includes(currentValue)) {
        visited.push(currentValue);
        // Push the entire Node object to the queue so we can access .adjacent later
        queue.push(...current.adjacent);
      }
    }
    
    return visited;
  }
}

module.exports = {Graph, Node}