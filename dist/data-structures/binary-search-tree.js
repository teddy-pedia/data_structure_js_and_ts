"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const Node_1 = require("./models/Node");
class BinarySearchTree {
    constructor(compareFn = util_1.defaultCompare) {
        this.compareFn = compareFn;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new Node_1.Node(key);
        }
        else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === util_1.Compare.LESS_THAN) {
            // 往左侧插入，如果左侧节点存在，则以左侧节点w
            // 为根节点继续往后寻找插入位置
            if (node.left == null) {
                node.left = new Node_1.Node(key);
            }
            else {
                this.insertNode(node.left, key);
            }
        }
        else {
            if (node.right == null) {
                node.right = new Node_1.Node(key);
            }
            else {
                this.insertNode(node.right, key);
            }
        }
    }
    inOrderTravase(callback) {
        this.inOrderTravaseNode(this.root, callback);
    }
    inOrderTravaseNode(node, callback) {
        if (node == null)
            return;
        this.inOrderTravaseNode(node.left, callback);
        callback(node.key);
        this.inOrderTravaseNode(node.right, callback);
    }
    preOrderTravase(callback) {
        this.preOrderTravaseNode(this.root, callback);
    }
    preOrderTravaseNode(node, callback) {
        if (node == null)
            return;
        callback(node.key);
        this.preOrderTravaseNode(node.left, callback);
        this.preOrderTravaseNode(node.right, callback);
    }
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        if (!node.left) {
            return node;
        }
        return this.minNode(node.left);
    }
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        if (!node.right)
            return node;
        return this.maxNode(node.right);
    }
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === util_1.Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        }
        else if (this.compareFn(key, node.key) === util_1.Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        }
        return true;
    }
    remove(key) {
        this.root = this.removeNode(this.root, key);
    }
    removeNode(node, key) {
        if (node == null)
            return null;
        if (this.compareFn(key, node.key) === util_1.Compare.LESS_THAN) {
            // 需要在左子树中寻找节点删除
            node.left = this.removeNode(node.left, key);
            return node;
        }
        else if (this.compareFn(key, node.key) === util_1.Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else {
            // 相当的情况
            // 1. 该节点没有左右孩子
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            // 2. 该节点有左孩子或者右孩子
            if (node.left == null && node.right != null) {
                node = node.right;
                return node;
            }
            else if (node.left != null && node.right == null) {
                node = node.left;
                return node;
            }
            // 3. 该节点有左右孩子
            // 当都存在的时候，可以找到node节点右侧最小的节点，进行复制
            // 然后删除最小的节点（叶节点无左右孩子）
            const temp = this.minNode(node.right);
            node.key = temp.key;
            node.right = this.removeNode(node.right, temp.key);
            return node;
        }
    }
}
exports.default = BinarySearchTree;
// test
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
// tree.inOrderTravase(console.log)
// tree.preOrderTravase(console.log)
// console.log(tree.max())
console.log(tree.search(15));
//# sourceMappingURL=binary-search-tree.js.map