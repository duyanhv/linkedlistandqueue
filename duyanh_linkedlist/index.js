var ns = {
	List: require('./src/DuyAnhLinkedList'),
	Node: require('./src/DuyAnhNode'),
};

if (typeof module !== 'undefined') {
	module.exports = ns;
} else if (typeof define !== 'undefined') {
	define('LinkedListJS', function () {
		return ns;
	});
} else if (typeof window !== 'undefined') {
	window.LinkedListJS = ns;
}