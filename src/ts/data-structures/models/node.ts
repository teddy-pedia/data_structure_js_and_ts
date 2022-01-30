export class Node<T> {
    private element: T
    private next: Node<T>
    constructor(element: T) {
        this.element = element
        this.next = undefined
    }
}
