import { Compare, defaultCompare, ICompareFunction } from '../util'
import { Node } from './models/Node'

export default class BinarySearchTree<T> {
    protected root: Node<T>

    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

    insert(key: T) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    protected insertNode(node: Node<T>, key: T) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            // 往左侧插入，如果左侧节点存在，则以左侧节点w
            // 为根节点继续往后寻找插入位置
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    inOrderTravase(callback: Function) {
        this.inOrderTravaseNode(this.root, callback)
    }

    private inOrderTravaseNode(node: Node<T>, callback: Function) {
        if (node == null) return
        this.inOrderTravaseNode(node.left, callback)
        callback(node.key)
        this.inOrderTravaseNode(node.right, callback)
    }

    preOrderTravase(callback: Function) {
        this.preOrderTravaseNode(this.root, callback)
    }

    private preOrderTravaseNode(node: Node<T>, callback: Function) {
        if (node == null) return
        callback(node.key)
        this.preOrderTravaseNode(node.left, callback)
        this.preOrderTravaseNode(node.right, callback)
    }

    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback)
    }

    private postOrderTraverseNode(node: Node<T>, callback: Function) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    min() {
        return this.minNode(this.root)
    }

    protected minNode(node: Node<T>) {
        if (!node.left) {
            return node
        }
        return this.minNode(node.left)
    }

    max() {
        return this.maxNode(this.root)
    }

    protected maxNode(node: Node<T>) {
        if (!node.right) return node
        return this.maxNode(node.right)
    }

    search(key: T) {
        return this.searchNode(this.root, key)
    }

    protected searchNode(node: Node<T>, key: T) {
        if (node == null) {
            return false
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        }
        return true
    }

    remove(key: T) {
        this.root = this.removeNode(this.root, key)
    }

    protected removeNode(node: Node<T>, key: T) {
        if (node == null) return null

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            // 需要在左子树中寻找节点删除
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // 相当的情况
            // 1. 该节点没有左右孩子
            if (node.left == null && node.right == null) {
                node = null
                return node
            }
            // 2. 该节点有左孩子或者右孩子
            if (node.left == null && node.right != null) {
                node = node.right
                return node
            } else if (node.left != null && node.right == null) {
                node = node.left
                return node
            }
            // 3. 该节点有左右孩子
            // 当都存在的时候，可以找到node节点右侧最小的节点，进行复制
            // 然后删除最小的节点（叶节点无左右孩子）
            const temp = this.minNode(node.right)
            node.key = temp.key
            node.right = this.removeNode(node.right, temp.key)
            return node
        }
    }
}

// test
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

// tree.inOrderTravase(console.log)
// tree.preOrderTravase(console.log)
// console.log(tree.max())
console.log(tree.search(15))
