function Node(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
}

Node.prototype.getItem = function() {
    return this.item;
};

Node.prototype.setItem = function(item) {
    this.item = item;
};

Node.prototype.getPrev = function() {
    return this.prev;
};

Node.prototype.setPrev = function(node) {
    this.prev = node;
};

Node.prototype.getNext = function() {
    return this.next;
};

Node.prototype.setNext = function(node) {
    this.next = node;
};

function LinkedList() {
    this.head = null;
    this.current = null;
    this.size = 0;
}

LinkedList.prototype.getSize = function() {
    return this.size;
};

LinkedList.prototype.getHead = function() {
    return this.head;
};

LinkedList.prototype.add = function(item) {
    var node = new Node(item);

    if (!this.head) {
        this.head = node;
    }

    if (!this.current) {
        this.current = node;
    } else {
        this.current.setNext(node);
        node.setPrev(this.current);
        this.current = node;
    }

    this.size++;
};

LinkedList.prototype.clear = function() {
    if (this.size === 0) {
        return;
    }

    var node = this.current;
    while (node != null) {
        var temp = node;
        temp.setNext(null);
        temp.setItem(null);
        node = temp.getPrev();
        temp.setPrev(null);
    }

    if (this.head) {
        this.head.setNext(null);
        this.head.setItem(null);
        this.head.setPrev(null);
    }

    this.head = null;
    this.current = null;
    this.size = 0;
};

LinkedList.prototype.get = function(index) {
    if (index < 0 || index >= this.size) {
        throw new Error('invalid index');
    }

    var i = 0;
    var node = this.head;

    while (node != null) {
        if (index === i) {
            return node.getItem();
        }
        i++;
        node = node.getNext();
    }

    return null;
};

LinkedList.prototype.remove = function(index) {
    if (index < 0 || index >= this.size) {
        throw new Error('invalid index');
    }

    var result = null;
    var i = 0;
    var node = this.head;

    while (node != null) {
        if (index === i) {
            break;
        }
        i++;
        node = node.getNext();
    }

    if (node == this.head) {
        this.head = node.getNext();
    }

    if (node == this.current) {
        this.current = node.getPrev();
    }

    result = node.getItem();
    if (node.getPrev()) {
        node.getPrev().setNext(node.getNext());
    }
    if (node.getNext()) {
        node.getNext().setPrev(node.getPrev());
    }

    node.setItem(null);
    node.setNext(null);
    node.setPrev(null);

    this.size--;

    return result;
};

LinkedList.prototype.items = function() {
    var result = [];
    var node = this.head;

    while (node != null) {
        result.push(node.getItem());
        node = node.getNext();
    }

    return result;
};

module.exports.Node = Node;
module.exports.LinkedList = LinkedList;