"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '[]';
    }

    let str = "from top to buttom is [";

    for (let i = this.count - 1; i >= 0; i--) {
      if (i !== 0) {
        str += "".concat(this.items[i], ",");
      } else {
        str += "".concat(this.items[i]);
      }
    }

    str += "]";
    return str;
  }

} // test
// const s = new Stack()
// s.push(1)
// s.push(2)
// s.push(3)
// console.log(s.toString())
// s.pop()
// console.log(s.toString())
// console.log(s.peek())
// s.clear()
// console.log(s.toString())


exports.default = Stack;