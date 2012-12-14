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

RedBlackTree.prototype._rb_delete_fixup = function(f_x) {
    var x = f_x;
    var w = null;

    while (x != this.root && (x && x.black)) {
        if (x == x.parent.left) {
            w = x.parent.right;
            if (w.black == false) {
                w.black = true;
                x.parent.black = false;
                this._left_rotate(x.parent);
                w = x.parent.right;
            } else if ((w.left == null || w.left.black) && (w.right == null || w.right.black)) {
                w.black = false;
                x = x.parent;
            } else {
                if (w.right == null || w.right.black) {
                    if (w.left != null) {
                        w.left.black = true;
                        w.black = false;
                        this._right_rotate(w);
                        w = x.parent.right;
                    }
                }
                w.black = x.parent.black;
                x.parent.black = true;
                if (w.right != null) {
                    w.right.black = true;
                }
                this._left_rotate(x.parent);
                x = this.root;
            }
        } else {
            w = x.parent.left;
            if (w.black == false) {
                w.black = true;
                x.parent.black = false;
                this._right_rotate(x.parent);
                w = x.parent.left;
            } else if ((w.left == null || w.left.black) && (w.right == null || w.right.black)) {
                w.black = false;
                x = x.parent;
            } else {
                if (w.left == null || w.left.black) {
                    if (w.right != null) {
                        w.right.black = true;
                        w.black = false;
                        this._left_rotate(w);
                        w = x.parent.left;
                    }
                }
                w.black = x.parent.black;
                x.parent.black = true;
                if (w.left != null) {
                    w.left.black = true;
                }
                this._right_rotate(x.parent);
                x = this.root;
            }
        }
    }

    x.black = true;
};

RedBlackTree.prototype.remove = function(z) {
    var y = null;
    var x = null;

    if (z.left == null || z.right == null) {
        y = z;
    } else {
        y = this.successor(z);
    }

    if (y.left != null) {
        x = y.left;
    } else {
        x = y.right;
    }

    x.parent = y.parent;

    if (y.parent == null) {
        this.root = x;
    } else if (y === y.parent.left) {
        y.parent.left = x;
    } else {
        y.parent.right = x;
    }

    if (y != z) {
        z.value = y.value;
    }

    if (y.black) {
        this._rb_delete_fixup(x);
    }

    return y;
};

RedBlackTree.prototype.insert = function(value) {
    var x = this._insert(value);
    x.black = false;

    var y = null;

    while (x != this.root && x.parent.black == false) {
        if (x.parent == x.parent.parent.left) {
            y = x.parent.parent.right;
            if (y && y.black == false) {
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
            y = x.parent.parent.left;
            if (y && y.black == false) {
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

RedBlackTree.prototype.successor = function(node) {
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

RedBlackTree.prototype.predecessor = function(node) {
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

module.exports.Node = Node;
module.exports.RedBlackTree = RedBlackTree;