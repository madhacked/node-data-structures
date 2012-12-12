var LinkedList = require('./linked_list').LinkedList;

function HashMap(initial_capacity, load_factor) {
    this.DEFAULT_INITIAL_CAPACITY = 16;
    this.MAXIMUM_CAPACITY = parseInt(1 << 30, 10);
    this.DEFAULT_LOAD_FACTOR = 0.75;
    this.table = [];

    if (!initial_capacity || isNaN(initial_capacity) || initial_capacity <= 0) {
        initial_capacity = this.DEFAULT_INITIAL_CAPACITY;
    }

    if (initial_capacity > this.MAXIMUM_CAPACITY) {
        initial_capacity = this.MAXIMUM_CAPACITY;
    }

    if (!load_factor || isNaN(load_factor) || load_factor <= 0) {
        load_factor = this.DEFAULT_LOAD_FACTOR;
    }

    var capacity = 1;
    while (capacity < initial_capacity) {
        capacity = capacity << 1;
    }

    for ( var i = 0; i < capacity; i++) {
        this.table[i] = new LinkedList();
    }

    this.load_factor = load_factor;
    this.threshold = parseInt(capacity * load_factor, 10);
    this.size = 0;
}

HashMap.prototype._hashString = function(key) {
    var hash = 0;

    for ( var i = 0; i < key.length; i++) {
        hash = 31 * hash + key.charCodeAt(i);
    }

    return hash;
};

HashMap.prototype._hash = function(key) {
    var result = null;

    if ('string' === typeof key) {
        result = this._hashString(key);
    } else if ('number' === typeof key) {
        if (parseFloat(key) === parseInt(key)) {
            result = key;
        } else {
            result = this._hashString('' + key);
        }
    } else {
        throw new Error('only strings and numbers can be used as keys');
    }

    result = result ^ ((result >>> 20) ^ (result >>> 12));
    return result ^ (result >>> 7) ^ (result >>> 12);
};

HashMap.prototype._indexFor = function(h, length) {
    return h & (length - 1);
};

HashMap.prototype.put = function(key, value) {
    if (!key) {
        throw new Error('key is required');
    }

    var hash = this._hash(key);
    var i = this._indexFor(hash, this.table.length);
    var l = this.table[i];
    var e = l.getHead();
    while (e != null) {
        if (e.getItem() != null && e.getItem().hash === hash && e.getItem().key === key) {
            var old_value = e.getItem().value;
            e.getItem().value = value;
            return old_value;
        }
        e = e.getNext();
    }

    this._addEntry(hash, key, value, i);
    return null;
};

HashMap.prototype.remove = function(key) {
    if (!key) {
        throw new Error('invalid key');
    }

    var hash = this._hash(key);
    var i = this._indexFor(hash, this.table.length);
    var l = this.table[i];
    var e = l.getHead();
    var index = 0;

    while (e != null) {
        var item = e.getItem();
        e = e.getNext();
        if (item.hash === hash && item.key === key) {
            this.size--;
            l.remove(index);
            return item.value;
        }
        index++;
    }

    return null;
};

HashMap.prototype.contains = function(key) {
    return this.get(key) !== null;
};

HashMap.prototype.get = function(key) {
    if (!key) {
        throw new Error('invalid key');
    }

    var hash = this._hash(key);
    var i = this._indexFor(hash, this.table.length);
    var l = this.table[i];
    var e = l.getHead();

    while (e != null) {
        var item = e.getItem();
        if (item.hash === hash && item.key === key) {
            return item.value;
        }
    }

    return null;
};

HashMap.prototype._addEntry = function(hash, key, value, bucketIndex) {
    this.table[bucketIndex].add({
        hash : hash,
        key : key,
        value : value
    });

    if (this.size++ >= this.threshold) {
        this._resize(2 * table.length);
    }
};

HashMap.prototype._resize = function(new_capacity) {
    var old_table = this.table;
    var old_capacity = old_table.length;
    if (old_capacity === this.MAXIMUM_CAPACITY) {
        this.threshold = Number.MAX_VALUE;
        return;
    }

    var new_table = [];
    for ( var i = 0; i < new_capacity; i++) {
        new_table[i] = new LinkedList();
    }
    this._transfer(new_table);
    this.table = new_table;
    this.threshold = parseInt(new_capacity * this.load_factor, 10);
};

HashMap.prototype._transfer = function(new_table) {
    var src = this.table;
    var new_capacity = new_table.length;
    for ( var j = 0; j < src.length; j++) {
        var l = src[j];
        var e = l.getHead();
        if (e != null) {
            src[j] = null;
            while (e != null) {
                var item = e.getItem();
                var i = this._indexFor(item.hash, new_capacity);
                new_table[i].add(item);
                e = e.getNext();
            }
        }
        l.clear();
    }
};

HashMap.prototype.keys = function() {
    var result = [];
    for ( var i = 0; i < this.table.length; i++) {
        var l = this.table[i];
        var e = l.getHead();
        while (e != null) {
            result.push(e.getItem().key);
            e = e.getNext();
        }
    }

    return result;
};

HashMap.prototype.values = function() {
    var result = [];
    for ( var i = 0; i < this.table.length; i++) {
        var l = this.table[i];
        var e = l.getHead();
        while (e != null) {
            result.push(e.getItem().value);
            e = e.getNext();
        }
    }

    return result;
};

module.exports.HashMap = HashMap;
