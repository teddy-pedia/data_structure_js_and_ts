// 双端队列
export default class Dequeue<T> {
    private count: number
    private lowestCount: number
    private items: any

    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    addFront(element: T) {
        if (this.isEmpty()) {
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            this.lowestCount--
            this.items[this.lowestCount] = element
        } else if (this.lowestCount === 0) {
            // 当为0的时候，需要将0~count向后移动一位
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }
            this.count++
            this.items[0] = element
        }
    }

    addBack(element: T) {
        this.items[this.count] = element
        this.count++
    }

    removeFront(): T {
        if (this.isEmpty()) {
            return undefined
        }
        const res = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return res
    }

    removeBack(): T {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--
        const res = this.items[this.count]
        delete this.items[this.count]
        return res
    }

    peekFront(): T {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    peekBack(): T {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.size() === 0
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    size() {
        return this.count - this.lowestCount
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}
