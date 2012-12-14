function Node(value, black) {
    if (value) {
        this.value = value;
    }
    if (black != undefined && (black === true || black === false)) {
        this.black = black;
    } else {
        this.black = true;
    }
    this.left = null;
    this.right = null;
    this.parent = null;
}

function RedBlackTree() {
    this.root = null;
}

RedBlackTree.prototype._left_rotate = function(x) {
    var y = x.right;
    x.right = y.left;
    if (y.left !== null) {
        y.left.parent = x;
    }
    y.parent = x.parent;

    if (x.parent === null) {
        this.root = y;
    } else if (x == x.parent.left) {
        x.parent.left = y;
    } else {
        x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
};

RedBlackTree.prototype.insert = function(value) {
    var x = this._insert(value);
    x.black = false;

    var y = null;

    while (x != this.root && x.parent != null && x.parent.black == false) {
        if (x.parent == x.parent.parent.left) {
            y = x.parent.parent.left;
            if (y.black == false) {
                x.parent.black = true;
                y.black = true;
                x.parent.parent.black = false;
                x = x.parent.parent;
            } else {
                if (x == x.parent.right) {
                    x = x.parent;
                    this._left_rotate(x);
                }
                x.parent.black = true;
                x.parent.parent.black = false;
                this._right_rotate(x.parent.parent);
            }
        } else {
            y = x.parent.parent.right;
            if (y.black == false) {
                x.parent.black = true;
                y.black = true;
                x.parent.parent.black = false;
                x = x.parent.parent;
            } else {
                if (x == x.parent.left) {
                    x = x.parent;
                    this._right_rotate(x);
                }
                x.parent.black = true;
                x.parent.parent.black = false;
                this._left_rotate(x.parent.parent);
            }
        }
    }

    this.root.black = true;
};

RedBlackTree.prototype._insert = function(value) {
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

    return z;
};

RedBlackTree.prototype._right_rotate = function(x) {
    var y = x.left;
    x.left = y.right;
    if (y.right !== null) {
        y.right.parent = x;
    }
    y.parent = x.parent;

    if (x.parent === null) {
        this.root = y;
    } else if (x == x.parent.left) {
        x.parent.left = y;
    } else {
        x.parent.right = y;
    }

    y.right = x;
    x.parent = y;
};

RedBlackTree.prototype.search = function(k, node) {
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

RedBlackTree.prototype.min = function(node) {
    var x = this.root;

    if (node) {
        x = node;
    }

    while (x.left != null) {
        x = x.left;
    }

    return x;
};

RedBlackTree.prototype.max = function(node) {
    var x = this.root;

    if (node) {
        x = node;
    }

    while (x.right != null) {
        x = x.right;
    }

    return x;
};

module.exports.RedBlackTree = RedBlackTree;