function Node(value) {
    if (value) {
        this.value = value;
    }
    this.left = null;
    this.right = null;
    this.parent = null;
}

function BinaryTree() {
    this.root = null;
}

BinaryTree.prototype.insert = function(value) {
    var y = null;
    var x = this.root;

    while (x != null) {
        y = x;

        if (value < x.value) {
            x = x.left;
        } else {
            x = x.right;
        }
    }

    var z = new Node(value);
    z.parent = y;

    if (y == null) {
        this.root = z;
    } else if (value < y.value) {
        y.left = z;
    } else {
        y.right = z;
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

BinaryTree.prototype.successor = function(node) {
    if (node.right != null) {
        return this.min(node.right);
    }

    var y = node.parent;
    var x = node;

    while (y != null && x == y.right) {
        x = y;
        y = y.parent;
    }

    return y;
};

BinaryTree.prototype.predecessor = function(node) {
    if (node.left != null) {
        return this.max(node.left);
    }

    var y = node.parent;
    var x = node;

    while (y != null && x == y.left) {
        x = y;
        y = y.parent;
    }

    return y;
};

BinaryTree.prototype.remove = function(z) {
    var y = null;
    var x = null;

    if (z.left == null || z.right == null) {
        y = z;
    } else {
        y = this.successor(z);
    }
    
    if (x != null) {
        x.parent = y.parent;
    }

    if (y.left != null) {
        x = y.left;
    } else {
        x = y.right;
    }

    var y_parent = y.parent;

    if (y_parent == null) {
        this.root = x;
    } else if (y == y_parent.left) {
        y_parent.left = x;
    } else {
        y_parent.right = x;
    }

    if (y != z) {
        z.value = y.value;
    }

    return y;
};

module.exports.BinaryTree = BinaryTree;
module.exports.Node = Node;
