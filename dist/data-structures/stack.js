"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        const res = this.items[this.count];
        delete this.items[this.count];
        return res;
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    clear() {
        this.count = 0;
        this.items = {};
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let res = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            res = `${res}, ${this.items[i]}`;
        }
        return res;
    }
}
exports.default = Stack;
//# sourceMappingURL=stack.js.map