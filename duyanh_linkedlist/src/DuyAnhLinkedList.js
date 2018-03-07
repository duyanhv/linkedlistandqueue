var DuyAnhNode = require('./DuyAnhNode');

var DuyAnhList = function () {
	this._count = 0;
	this._head = null;
	this._tail = null;
};

DuyAnhList.prototype.head = function () {
	return this._head;
};

DuyAnhList.prototype.tail = function () {
	return this._tail;
};

DuyAnhList.prototype.count = function () {
	return this._count;
};

DuyAnhList.prototype.get = function (index) {
	var node = this._head;

	for (var i = 0; i < index; i++) {
		node = node.next();
	}

	return node;
};

DuyAnhList.prototype.set = function (index, value) {
	var node = this.get(index);
	node.set(value);
};

DuyAnhList.prototype.push = function (value) {
	var node = new DuyAnhNode(value, this._tail, null);

	if (this._tail !== null) {
		this._tail.setNext(node);
	}

	if (this._head === null) {
		this._head = node;
	}

	this._tail = node;
	this._count++;

	return node;
};

DuyAnhList.prototype.pop = function () {
	var node = this._tail;

	var new_tail = null;
	if (this._tail.previous() !== null) {
		new_tail = this._tail.previous();
		new_tail.setNext(null);
	}
	
	this._tail = new_tail;

	this._count--;

	if (this._count === 0) {
		this._head = null;
	}

	return node;
};

DuyAnhList.prototype.unshift = function (value) {
	var node = new DuyAnhNode(value, null, this._head);

	if (this._head !== null) {
		this._head.setPrevious(node);
	}

	if (this._tail === null) {
		this._tail = node;
	}
	
	this._head = node;

	this._count++;

	return node;
};

DuyAnhList.prototype.shift = function () {
	var node = this._head;

	var new_head = null;
	if (this._head.next() !== null) {
		new_head = this._head.next();
		new_head.setPrevious(null);
	}

	this._head = new_head;

	this._count--;

	if (this._count === 0) {
		this._tail = null;
	}

	return node;
};

DuyAnhList.prototype.asArray = function () {
	var arr = [];
	var node = this._head;

	while (node) {
		arr.push(node.value());
		node = node.next();
	}

	return arr;
};

DuyAnhList.prototype.truncateTo = function (length) {
	this._count = length;

	if (length === 0) {
		this._head = null;
		this._tail = null;

		return;
	}

	var node = this.get(length-1);
	node.setNext(null);
	this._tail = node;
};

DuyAnhList.prototype.empty = function () {
	this.truncateTo(0);
};

DuyAnhList.prototype.isEmpty = function () {
	return this._head === null;
};

DuyAnhList.prototype.find = function (value) {
	var node = this._head;

	while (node !== null) {
		if (node.value() === value) {
			return node;
		}

		node = node.next();
	}

	return null;
};

DuyAnhList.prototype.each = function (callback) {
	var node = this._head;
	var i = 0;
	while (node !== null) {
		callback(i, node);
		node = node.next();
		i++;
	}
}

module.exports = DuyAnhList;