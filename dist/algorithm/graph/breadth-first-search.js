"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bfs = exports.breadthFirstSearch = void 0;
const queue_1 = require("../../data-structure/queue");
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};
const initializeColor = (vertices) => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};
const breadthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new queue_1.default();
    // 初始节点入队，默认为vertices[0]
    queue.enqueue(vertices[0]);
    while (!queue.isEmpty()) {
        const u = queue.dequeue(), neighbors = adjList.get(u);
        // 设置u为被发现的节点，但未被完全探索
        color[u] = Colors.BLACK;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) { // u的邻居w还未被发现
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }
        }
        // 此时u节点的邻居节点都被发现，设置u为完全探索节点
        color[u] = Colors.BLACK;
        if (callback) {
            callback(u);
        }
    }
};
exports.breadthFirstSearch = breadthFirstSearch;
const bfs = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new queue_1.default();
    const distances = {};
    const predecessors = {};
    queue.enqueue(startVertex);
    // 初试化distances和predecessors
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0;
        predecessors[vertices[i]] = null;
    }
    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                queue.enqueue(w);
                distances[w] = distances[u] + 1;
                predecessors[w] = u;
            }
        }
        color[u] = Colors.BLACK;
        if (callback) {
            callback(u);
        }
    }
    return {
        distances,
        predecessors
    };
};
exports.bfs = bfs;
//# sourceMappingURL=breadth-first-search.js.map