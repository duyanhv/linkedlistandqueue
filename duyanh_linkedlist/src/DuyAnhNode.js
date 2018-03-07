var DuyAnhNode = function (value, previous, next) {
	this._value = value === undefined ? null : value;
	
	this._previous = previous === undefined ? null : previous;
	this._next = next === undefined ? null : next;
};

DuyAnhNode.prototype.value = function () {
	return this._value;
};

DuyAnhNode.prototype.previous = function () {
	return this._previous;
};

DuyAnhNode.prototype.next = function () {
	return this._next;
};

DuyAnhNode.prototype.set = function (value) {
	this._value = value;
};

DuyAnhNode.prototype.setPrevious = function (node) {
	this._previous = node;
};

DuyAnhNode.prototype.setNext = function (node) {
	this._next = node;
};

DuyAnhNode.prototype.isHead = function () {
	return this._previous === null;
};

DuyAnhNode.prototype.isTail = function () {
	return this._next === null;
};

module.exports = DuyAnhNode;