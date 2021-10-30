"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.to-string.js");

var _dictionary = _interopRequireDefault(require("./dictionary"));

var _breadthFirstSearch = require("../algorithm/graph/breadth-first-search");

var _depthFirstSearch = require("../algorithm/graph/depth-first-search");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Graph {
  constructor() {
    let isDirected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new _dictionary.default();
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []); // initialize adjacency list with array as well;
    }
  }

  addEdge(a, b) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }

    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }

    this.adjList.get(a).push(b);

    if (this.isDirected !== true) {
      this.adjList.get(b).push(a);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';

    for (let i = 0; i < this.vertices.length; i++) {
      let cur = this.vertices[i];
      s += "".concat(this.vertices[i], " -> ");
      const neighbors = this.adjList.get(cur);

      for (let k = 0; k < neighbors.length; k++) {
        s += "".concat(neighbors[k], " ");
      }

      s += '\n';
    }

    console.log(s);
  }

} // graph structure test


exports.default = Graph;
let graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');
graph.addVertex('H');
graph.addVertex('I');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('E', 'I');
graph.toString(); // breadthFirstSearch(graph, 'A')
// const { distances, predecessors } = BFS(graph, 'A')
// console.log(distances)
// console.log(predecessors)
// depthFirstSearch(graph)

const {
  discovery,
  finished,
  predecessors
} = (0, _depthFirstSearch.DFS)(graph);
console.log(discovery);
console.log(finished);
console.log(predecessors);