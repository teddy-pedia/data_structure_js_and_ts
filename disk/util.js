"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOES_NOT_EXIST = exports.Compare = void 0;
exports.biggerEquals = biggerEquals;
exports.defaultCompare = defaultCompare;
exports.defaultDiff = defaultDiff;
exports.defaultEquals = defaultEquals;
exports.defaultToString = defaultToString;
exports.lesserEquals = lesserEquals;
exports.reverseCompare = reverseCompare;
exports.swap = swap;

require("core-js/modules/es.regexp.to-string.js");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};
exports.Compare = Compare;
const DOES_NOT_EXIST = -1;
exports.DOES_NOT_EXIST = DOES_NOT_EXIST;

function lesserEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

function biggerEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function defaultEquals(a, b) {
  return a === b;
}

function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return "".concat(item);
  }

  return item.toString();
}

function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp; // [array[a], array[b]] = [array[b], array[a]]
}

function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

function defaultDiff(a, b) {
  return Number(a) - Number(b);
}