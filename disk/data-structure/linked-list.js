"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedList = void 0;

var _linkedListModels = require("./models/linked-list-models.js");

var _util = require("../util");

class LinkedList {
  constructor() {
    this.dummy = new _linkedListModels.Node(); // 哨兵节点，不存放任何数据

    this.count = 0;
    this.equalFn = _util.defaultEquals;
  }

  push(element) {
    const node = new _linkedListModels.Node(element);
    let cur = this.dummy;

    while (cur.next) {
      cur = cur.next;
    }

    cur.next = node;
    this.count++;
  }

  getElementAt(index) {
    if (index < 0 || index > this.count) return null;
    let cur = this.dummy.next;

    for (let i = 0; i < index && cur.next; i++) {
      cur = cur.next;
    }

    return cur;
  }

  insert(element, index) {
    if (index < 0 || index > this.count) return false;
    let cur = this.dummy.next;
    let pre = this.dummy;

    for (let i = 0; i < index; i++) {
      pre = cur;
      cur = cur.next;
    }

    const node = new _linkedListModels.Node(element);
    node.next = cur;
    pre.next = node;
    this.count++;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index >= this.count) return null;
    let cur = this.dummy.next;
    let pre = this.dummy;

    for (let i = 0; i < index; i++) {
      pre = cur;
      cur = cur.next;
    }

    pre.next = cur.next;
    this.count--;
    return cur;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let cur = this.dummy;

    for (let i = 0; i < this.size(); i++) {
      cur = cur.next;

      if (this.equalFn(cur.element, element)) {
        return i;
      }
    }

    return -1;
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  toString() {
    let cur = this.dummy.next;
    if (!cur) return '';
    let objString = "".concat(cur.element);

    while (cur.next) {
      cur = cur.next;
      objString = "".concat(objString, ", ").concat(cur.element);
    }

    return objString;
  }

} // test
// const list = new LinkedList()
// list.push(1)
// list.push(2)
// list.push(3)
// list.push(4)
// console.log(list.toString())
// console.log(list.getElementAt(0))
// console.log(list.insert(5, -1))
// console.log(list.toString())
// console.log(list.removeAt(4))
// console.log(list.toString())
// console.log(list.remove(4))
// console.log(list.toString())


exports.LinkedList = LinkedList;