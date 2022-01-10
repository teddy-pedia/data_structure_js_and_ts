"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyNode = exports.Node = void 0;
class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
exports.Node = Node;
class DoublyNode extends Node {
    constructor(element, next, pre) {
        super(element, next);
        this.element = element;
        this.next = next;
        this.pre = pre;
    }
}
exports.DoublyNode = DoublyNode;
//# sourceMappingURL=linked-list-models.js.map