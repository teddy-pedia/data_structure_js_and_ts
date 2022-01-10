"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = require("./dictionary");
const breadth_first_search_1 = require("../algorithm/graph/breadth-first-search");
class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new dictionary_1.default();
    }
    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
            return true;
        }
        return false;
    }
    addEdge(a, b) {
        if (!this.adjList.get(a)) {
            this.addVertex(a);
        }
        if (!this.adjList.get(b)) {
            this.addVertex(b);
        }
        this.adjList.get(a).push(b);
        if (!this.isDirected) {
            this.adjList.get(b).push(a);
        }
        return true;
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
            s += this.vertices[i] + ' -> ';
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let k = 0; k < neighbors.length; k++) {
                s += neighbors[k] + ' ';
            }
            s += '\n';
        }
        return s;
    }
}
exports.default = Graph;
// graph structure test
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
// console.log(graph.toString())
// breadthFirstSearch(graph, console.log)
const { distances, predecessors } = breadth_first_search_1.bfs(graph, 'A', console.log);
console.log(distances);
console.log(predecessors);
//# sourceMappingURL=graph.js.map