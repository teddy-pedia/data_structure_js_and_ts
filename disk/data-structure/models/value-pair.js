"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValuePair = void 0;

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return "[#".concat(this.key, ": ").concat(this.value, "]");
  }

}

exports.ValuePair = ValuePair;