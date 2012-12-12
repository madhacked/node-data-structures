function Trie() {
    this.words = 0;
    this.prefixes = 0;
    this.edges = [];
}

Trie.prototype.setWords = function(words) {
    this.words = words;
};

Trie.prototype.getWords = function() {
    return this.words;
};

Trie.prototype.setPrefixes = function(prefixes) {
    this.prefixes = prefixes;
};

Trie.prototype.getPrefixes = function() {
    return this.prefixes;
};

Trie.prototype.getEdges = function() {
    return this.edges;
};

Trie.prototype.addWord = function(word) {
    if (!word) {
        this.setWords(this.getWords() + 1);
    } else {
        this.setPrefixes(this.getPrefixes() + 1);
        var k = word[0];
        if (this.edges[k] === undefined) {
            this.edges[k] = new trie();
        }
        this.edges[k].addWord(word.substring(1));
    }
};

Trie.prototype.countWords = function(word) {
    if (!word) {
        return this.getWords();
    }

    var k = word[0];
    if (this.edges[k]) {
        return this.edges[k].countWords(word.substring(1));
    }

    return 0;
};

Trie.prototype.countPrefixes = function(prefix) {
    if (!prefix) {
        return this.getPrefixes();
    }

    var k = prefix[0];

    if (this.edges[k]) {
        return this.edges[k].countPrefixes(prefix.substring(1));
    }

    return 0;
};

Trie.prototype.autocomplete = function(prefix) {
    var words = [];
    this._autocomplete(prefix, '', words);
    return words;
};

Trie.prototype._autocomplete = function(prefix, letters, words) {
    if (!prefix) {
        return;
    }

    var k = prefix[0];
    letters += k;

    if (this.edges[k]) {
        if (this.edges[k].getWords() > 0) {
            words.push(letters);
        }
        this.edges[k]._autocomplete(prefix.substring(1), letters, words);
        if (prefix.length === 1) {
            this.edges[k]._printwords(letters, words);
        }
    }

    return;
};

Trie.prototype.printwords = function() {
    var words = [];
    this._printwords('', words);
    return words;
};

Trie.prototype._printwords = function(letters, words) {
    if (this.getPrefixes() === 0) {
        return;
    }

    var keys = Object.keys(this.edges);
    for ( var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (this.edges[key].getWords() > 0) {
            words.push(letters + key);
        }
        this.edges[key]._printwords(letters + key, words);
    }
};

module.exports.Trie = Trie;
