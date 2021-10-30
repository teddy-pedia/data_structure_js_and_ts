"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinarySearchTree = void 0;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _node = require("./models/node");

class BinarySearchTree {
  constructor() {
    this.root = undefined;
  }
  /**
   *
   * @param {number[]} val_list
   */


  createBinarySearchTree(val_list) {
    if (!val_list || !val_list.length) {
      this.root = null;
      return;
    }

    for (let val of val_list) {
      if (val) {
        this.insert(val);
      }
    }
  }

  insert(value) {
    if (this.root == null) {
      this.root = new _node.Node(value);
    } else {
      this.insertNode(this.root, value);
    }
  }

  insertNode(node, value) {
    if (value < node.value) {
      if (node.left == null) {
        node.left = new _node.Node(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right == null) {
        node.right = new _node.Node(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
  }
  /**
   * 递归前序遍历
   * @param {Node} root
   */


  preOrder(root) {
    let res = [];

    const pre = root => {
      if (!root) {
        return;
      }

      res.push(root.value);
      pre(root.left);
      pre(root.right);
    };

    pre(root);
    return res;
  }
  /**
   * 递归中序遍历
   * @param {Node} root
   */


  midOrder(root) {
    let res = [];

    const mid = root => {
      if (!root) {
        return;
      }

      mid(root.left);
      res.push(root.value);
      mid(root.right);
    };

    mid(root);
    return res;
  }
  /**
   * 递归后序遍历
   * @param {Node} root
   */


  postOrder(root) {
    let res = [];

    const post = root => {
      if (!root) {
        return;
      }

      post(root.left);
      post(root.right);
      res.push(root.value);
    };

    post(root);
    return res;
  }
  /**
   * 前序遍历非递归形式
   * @param {Node} root
   */


  preOrderByStack(root) {
    let res = [];
    let stack = [];

    while (root || stack.length) {
      while (root) {
        stack.push(root);
        res.push(root.value);
        root = root.left;
      }

      let node = stack.pop();
      root = node.right;
    }

    return res;
  }
  /**
   * 中序遍历非递归形式
   * @param {Node} root
   */


  midOrderByStack(root) {
    let res = [];
    let stack = [];

    while (root || stack.length) {
      while (root) {
        stack.push(root);
        root = root.left;
      }

      let node = stack.pop();
      res.push(node.value);
      root = node.right;
    }

    return res;
  }
  /**
   * 后序遍历非递归形式，单栈
   * 输出顺序为左-右-中
   * 那么往数组头插的顺序为中-右-左
   * 出栈顺序为中-左-右
   * @param {Node} root
   */


  postOrderByOneStack(root) {
    if (!root) return [];
    let res = [];
    let stack = [];
    stack.push(root);

    while (stack.length) {
      let node = stack.pop();
      res.unshift(node.value); // 插入到数组头部

      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }

    return res;
  }
  /**
   * 双栈实现后序遍历
   * @param {Node} root
   */


  postOrderByTwoStack(root) {
    if (!root) return [];
    let res = [];
    let stack1 = [];
    let stack2 = [];
    stack1.push(root);

    while (stack1.length) {
      let node = stack1.pop();
      stack2.push(node); // 相当于单栈的往res尾部插入

      node.left && stack1.push(node.left);
      node.right && stack1.push(node.right);
    }

    while (stack2.length) {
      res.push(stack2.pop().value);
    }

    return res;
  }
  /**
   * 层序遍历
   * @param {Node} root
   */


  levelOrder(root) {
    if (!root) return [];
    let res = [];
    let queue = [];
    queue.push(root);

    while (queue.length) {
      let node = queue.shift();
      res.push(node.value);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    return res;
  }

} // test


exports.BinarySearchTree = BinarySearchTree;
const tree = new BinarySearchTree();
tree.createBinarySearchTree([4, 2, 6, 1, 3, 5, 7]); // console.log(tree.preOrder(tree.root)) //   4, 2, 1, 3, 6, 5, 7
// console.log(tree.midOrder(tree.root)) //   1, 2, 3, 4, 5, 6, 7
// console.log(tree.postOrder(tree.root)) //    1, 3, 2, 5, 7, 6, 4

console.log(tree.preOrderByStack(tree.root));
console.log(tree.midOrderByStack(tree.root));
console.log(tree.postOrderByOneStack(tree.root));
console.log(tree.postOrderByTwoStack(tree.root));
console.log(tree.levelOrder(tree.root)); //  4, 2, 6, 1, 3, 5, 7