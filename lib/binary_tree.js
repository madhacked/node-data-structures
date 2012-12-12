function Node(value) {
    if (value) {
        this.value = value;
    }
    this.left = null;
    this.right = null;
}

function BinaryTree() {
    this.root = null;
}

BinaryTree.prototype.insert = function(value) {
    var x = this.root;
    var y = null;

    while (x != null) {
        y = x;

        if (value < x.value) {
            x = x.left;
        } else {
            x = x.right;
        }
    }

    var p = new Node(value);

    if (y == null) {
        this.root = p;
    } else if (value < y.value) {
        y.left = p;
    } else {
        y.right = p;
    }
};

BinaryTree.prototype.search = function(k, node) {
    var x = this.root;

    if (node) {
        x = node;
    }

    if (x == null || k === x.value) {
        return x;
    }

    if (k < x.value) {
        return this.search(k, x.left);
    } else {
        return this.search(k, x.right);
    }
};

BinaryTree.prototype.min = function(node) {
    var x = this.root;

    if (node) {
        x = node;
    }

    while (x.left != null) {
        x = x.left;
    }

    return x;
};

BinaryTree.prototype.max = function(node) {
    var x = this.root;

    if (node) {
        x = node;
    }

    while (x.right != null) {
        x = x.right;
    }

    return x;
};

BinaryTree.prototype.parent = function(node) {
    var x = this.root;

    while (x != null) {
        if (x.left == node || x.right == node) {
            return x;
        }

        if (node.value < x.value) {
            x = x.left;
        } else {
            x = x.right;
        }
    }

    return null;
};

BinaryTree.prototype.successor = function(node) {
    if (node.right != null) {
        return this.min(node.right);
    }

    var y = this.parent(node);
    var x = node;

    while (y != null && x == y.right) {
        x = y;
        y = this.parent(y);
    }

    return y;
};

BinaryTree.prototype.predecessor = function(node) {
    if (node.left != null) {
        return this.max(node.left);
    }

    var y = this.parent(node);
    var x = node;

    while (y != null && x == y.left) {
        x = y;
        y = this.parent(y);
    }

    return y;
};

BinaryTree.prototype.remove = function(node) {
    var y = null;
    var x = null;

    if (node.left == null || node.right == null) {
        y = node;
    } else {
        y = this.successor(node);
    }

    if (y.left != null) {
        x = y.left;
    } else {
        x = y.right;
    }

    var y_parent = this.parent(y);    

    if (y_parent == null) {
        this.root = x;
    } else if (y == y_parent.left) {
        y_parent.left = x;
    } else {
        y_parent.right = x;
    }

    if (y != node) {
        node.value = y.value;
    }

    return y;
};

module.exports.BinaryTree = BinaryTree;
module.exports.Node = Node;
