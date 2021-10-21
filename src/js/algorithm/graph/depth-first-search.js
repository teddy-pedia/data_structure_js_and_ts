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

/**
 * 执行深度优先搜索算法
 * @param graph 需要搜索的图
 * @param callback 回调函数
 */
export const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)

    for (let i = 0; i < vertices.length; i++) {
        // 对于还未发现的顶点进行探索
        if (color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisit(vertices[i], color, adjList, callback)
        }
    }
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    // 标记u为发现的节点
    color[u] = Colors.GREY
    // console.log('discoverd ' + u)
    if (callback) {
        callback(u)
    }
    // 找到u的邻居，对u的邻居遍历，如果还有未发现的邻居
    // 节点就再次执行该函数，若都为发现的节点，则u设置为被探索
    const neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === Colors.WHITE) {
            depthFirstSearchVisit(w, color, adjList, callback)
        }
    }
    color[u] = Colors.BLACK
    console.log('explored ' + u)
}

/**
 * 深度优先搜索图，并给出每个节点被探索到的时间已经完成探索的时间
 * @param graph 指定的一个图
 * @returns 返回探索时间、完成探索时间以及每个节点被探索时的前置节点
 */
export const DFS = (graph) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const d = {} // 发现时间
    const f = {} // 完成时间
    const p = {} // 前置节点
    const time = { count: 0 }
    // 初始化发现时间、完后曾时间和前置节点列表
    for (let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0
        d[vertices[i]] = 0
        p[vertices[i]] = null
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList)
        }
    }
    return {
        discovery: d,
        finished: f,
        predecessors: p,
    }
}

/**
 *
 * @param u 被发现的节点
 * @param color
 * @param d 发现时间
 * @param f 完成时间
 * @param p 前置节点
 * @param time 总时间
 * @param adjList 邻接表
 */
const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY
    d[u] = ++time.count // 确定发现时间
    const neighbors = adjList.get(u)
    // 对邻居节点进行探索
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === Colors.WHITE) {
            p[w] = u
            DFSVisit(w, color, d, f, p, time, adjList)
        }
    }
    color[u] = Colors.BLACK
    f[u] = ++time.count // 完成探索
}
