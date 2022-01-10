export default class Queue<T> {
    private count: number
    private lowestCount: number
    private items: any

    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    enqueue(element: T) {
        this.items[this.count] = element
        this.count++
    }

    dequeue(): T {
        if (this.isEmpty()) {
            return undefined
        }
        const res = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return res
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    isEmpty(): boolean {
        return this.size() === 0
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    size(): number {
        return this.count - this.lowestCount
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let res = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            res = `${res},${this.items[i]}`
        }
        return res
    }
}
