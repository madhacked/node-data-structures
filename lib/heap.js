function Heap(list) {
    this.tree = list;
    this.heapSize = list.length;
    var index = parseInt(this.tree.length / 2, 10) + 1;

    for ( var i = index; i > 0; i--) {
        this._heapify(i);
    }
}

Heap.prototype.getTree = function() {
    return this.tree;
};

Heap.prototype._left = function(index) {
    return 2 * index + 1;
};

Heap.prototype._right = function(index) {
    return (2 * index) + 2;
};

Heap.prototype._parent = function(index) {
    return parseInt(index / 2, 10);
};

Heap.prototype._heapify = function(i) {
    var l = this._left(i);
    var r = this._right(i);

    var largest = i;
    if (l < this.heapSize && this.tree[l] > this.tree[i]) {
        largest = l;
    }

    if (r < this.heapSize && this.tree[r] > this.tree[largest]) {
        largest = r;
    }
    if (largest !== i) {
        var temp = this.tree[i];
        this.tree[i] = this.tree[largest];
        this.tree[largest] = temp;
        this._heapify(largest);
    }
};

Heap.prototype.heapsort = function() {
    var h = new Heap(this.tree);
    h._heapsort();
    return h.getTree();
};

Heap.prototype._heapsort = function() {
    var length = this.heapSize;
    for ( var i = length - 1; i > 0; i--) {
        var temp = this.tree[0];
        this.tree[0] = this.tree[i];
        this.tree[i] = temp;
        this.heapSize--;
        this._heapify(0);
    }
};

module.exports.Heap = Heap;