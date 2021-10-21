import Queue from '../../data-structure/queue'

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2,
}

const initializeColor = (vertices) => {
    const color = {}
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }
    return color
}

export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const queue = new Queue()

    queue.enqueue(startVertex)
    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        // u has been visited but its neighbors
        color[u] = Colors.GREY
        // explore its neighbors
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
        console.log(u) // print how bfs works
        if (callback) {
            callback(u)
        }
    }
}

// BFS && return distance between any vertex and start vertex
export const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const distances = {}
    const predecessors = {}
    const queue = new Queue()
    queue.enqueue(startVertex)

    // initialize distances and predecessors
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }

    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        // explore its neighbors
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                queue.enqueue(w)
                distances[w] = distances[u] + 1
                predecessors[w] = u
            }
        }
        color[u] = Colors.BLACK
    }

    return {
        distances,
        predecessors,
    }
}