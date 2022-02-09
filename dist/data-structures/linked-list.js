"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_models_1 = require("./models/linked-list-models");
const util_1 = require("../util");
class LinkedList {
    constructor(equalsFn = util_1.defaultEquals) {
        this.equalsFn = equalsFn;
        this.count = 0;
    }
    push(element) {
        const node = new linked_list_models_1.Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 1; i <= index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new linked_list_models_1.Node(element);
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            }
            else {
                const prev = this.getElementAt(index - 1);
                node.next = prev.next;
                prev.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            }
            else {
                const prev = this.getElementAt(index - 1);
                current = prev.next;
                prev.next = current.next;
                current.next = null;
            }
            this.count--;
            return current;
        }
        return undefined;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    getHead() {
        return this.head;
    }
    clear() {
        this.head = undefined;
        this.count = 0;
    }
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
exports.default = LinkedList;
//# sourceMappingURL=linked-list.js.map