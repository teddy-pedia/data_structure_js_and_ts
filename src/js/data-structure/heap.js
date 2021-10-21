import { Compare, defaultCompare } from '../util'
import { swap } from '../util'

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = []
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        if (index === 0) {
            return undefined
        }
        return (index - 1) >> 1
    }

    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.size() === 0
    }

    clear() {
        this.heap = []
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]
    }

    /**
     * 插入一个元素到堆中
     * 先将需要插入的元素插入到堆末尾，再和父节点
     * 进行比较，如果比父节点小，则和父节点进行交换
     * 直到小于父节点或者到达根节点
     * @param {number}} value
     */
    insert(value) {
        if (value != null) {
            const index = this.heap.length
            this.heap.push(value)
            this.siftUp(index)
            return true
        }
        return false
    }

    /**
     * 将堆的最后一个元素向上移动到合适的位置
     * @param {number} index 堆最后一个元素的下标
     */
    siftUp(index) {
        let parent = this.getParentIndex(index)
        while (
            index > 0 &&
            this.compareFn(this.heap[parent], this.heap[index]) ===
                Compare.BIGGER_THAN
        ) {
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }

    /**
     * 移出堆顶元素并返回
     */
    extract() {
        if (this.isEmpty()) {
            return undefined
        }
        if (this.size() === 1) {
            return this.heap.shift()
        }
        const removedValue = this.heap[0]
        // 把堆最尾部的元素放在堆顶
        this.heap[0] = this.heap.pop()
        this.siftDown(0)
        return removedValue
    }

    /**
     * 从指定的下标index元素开始，将该元素进行下沉
     * @param {number} index
     */
    siftDown(index) {
        let element = index
        let left = this.getLeftIndex(index)
        let right = this.getRightIndex(index)
        const size = this.size()
        if (
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) ===
                Compare.BIGGER_THAN
        ) {
            element = left
        }
        if (
            right < size &&
            this.compareFn(this.heap[element], this.heap[right]) ===
                Compare.BIGGER_THAN
        ) {
            element = right
        }
        // 比较结束后，判断是否要进行交换
        if (element !== index) {
            swap(this.heap, element, index)
            this.siftDown(element)
        }
    }

    /**
     * 对给定的数组进行堆化
     * @param {number[]} array
     */
    heapify(array) {
        if (array) {
            this.heap = array
        }
        const maxIndex = (this.size() >> 1) - 1
        for (let i = 0; i <= maxIndex; i++) {
            this.siftDown(i)
        }
        return this.heap
    }

    getAsArray() {
        return this.heap
    }
}

const heap = new MinHeap()
for (let i = 1; i < 10; i++) {
    heap.insert(i)
}
console.log(heap.extract())
console.log(heap)

heap.heapify([5, 4, 3, 2, 1]) // test again
console.log(heap)
