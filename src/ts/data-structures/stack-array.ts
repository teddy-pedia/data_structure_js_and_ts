export default class StackArray<T> {
    private items: T[]

    constructor() {
        this.items = []
    }

    push(element: T) {
        this.items.push(element)
    }

    pop(): T {
        return this.items.pop()
    }

    peek(): T {
        return this.items[this.items.length - 1]
    }

    isEmpty(): boolean {
        return this.items.length === 0
    }

    size(): number {
        return this.items.length
    }

    clear() {
        this.items = []
    }

    toArray() {
        return this.items
    }

    toString() {
        return this.items.toString()
    }
}
