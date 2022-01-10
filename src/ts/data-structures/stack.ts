export default class Stack<T> {
    private count: number
    private items: any

    constructor() {
        this.count = 0
        this.items = {}
    }

    push(element: T) {
        this.items[this.count] = element
        this.count++
    }

    pop(): T {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--
        const res = this.items[this.count]
        delete this.items[this.count]
        return res
    }

    isEmpty(): boolean {
        return this.count === 0
    }

    size(): number {
        return this.count
    }

    clear() {
        this.count = 0
        this.items = {}
    }

    toString(): string {
        if (this.isEmpty()) {
            return ''
        }
        let res = `${this.items[0]}`
        for (let i = 1; i < this.count; i++) {
            res = `${res}, ${this.items[i]}`
        }
        return res
    }
}
