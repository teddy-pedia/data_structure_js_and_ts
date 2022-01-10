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
        let cur;
        if (!this.head) { // 头节点为空
            this.head = node;
        }
        else {
            cur = this.head;
            // 找到链表尾
            while (cur.next) {
                cur = cur.next;
            }
            cur.next = node;
        }
        this.count++;
    }
    getElementAt(index) {
        if (index < 0 || index > this.count)
            return undefined;
        let node = this.head;
        for (let i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    }
    insert(element, index) {
        if (index < 0 || index > this.count)
            return false;
        const node = new linked_list_models_1.Node(element);
        if (index === 0) {
            const cur = this.head;
            node.next = cur;
        }
        else {
            const pre = this.getElementAt(index - 1);
            node.next = pre.next;
            pre.next = node;
        }
        this.count++;
        return true;
    }
    removeAt(index) {
        if (index < 0 || index > this.count)
            return undefined;
        let cur = this.head;
        if (index === 0) {
            this.head = cur.next;
        }
        else {
            const pre = this.getElementAt(index - 1);
            cur = pre.next;
            pre.next = cur.next;
        }
        this.count--;
        return cur.element;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    indexOf(element) {
        let cur = this.head;
        for (let i = 0; i < this.size() && cur != null; i++) {
            if (this.equalsFn(element, cur.element)) {
                return i;
            }
            cur = cur.next;
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
        let cur = this.head.next;
        for (let i = 1; i < this.size() && cur != null; i++) {
            objString = `${objString}, ${cur.element}`;
            cur = cur.next;
        }
        return objString;
    }
}
exports.default = LinkedList;
// test
/*
const list = new LinkedList()
list.push(1)
list.push(2)
list.push(3)
list.push(4)
list.push(5)
list.push(6)
console.log(list.toString())
list.remove(5)
console.log(list.toString())
*/
//# sourceMappingURL=linked-list.js.map