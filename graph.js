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
    const visited = [];
    const stack = [start];
  
    while (stack.length > 0) {
      const current = stack.pop();
      if (!visited.includes(current)) {
        visited.push(current);
        stack.push(...current.adjacent);
      }
    }
  
    return visited;
  }
  

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = [];
    const queue = [start];
  
    while (queue.length > 0) {
      const current = queue.shift();
      if (!visited.includes(current)) {
        visited.push(current);
        queue.push(...current.adjacent);
      }
    }
  
    return visited;
  }
  
}

module.exports = {Graph, Node}