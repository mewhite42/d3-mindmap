var Cell = function Cell(options) {
	this.parent = options.parent;
	this.name = options.name;
	this.children = options.children || [];
	this.size = options.size;
	
	this.addChild = function(node) {
		node.parent = this;
		this.children.push(node);
	};

	this.removeChild = function(node) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i].name === node.name) {
				this.children.splice(i, 1);
				break;
			}
		}
	};

	this.drop = function() {
		if (this.parent) {
			var indexOfChild = this.parent.children.indexOf(this);
			this.parent.slice(indexOfChild, 1);
		}
	};

	this.getPath = function() {
		var path = [],
			parent = this.parent;

		while (parent) {
			path.push(parent);
			parent = parent.parent;
		}

		return path;
	};
};

function getNodeByName(node, name) {
	if (node.name === name) {
		return node;
	}
	else {
		if (node.children) {
			for (var i = 0; i < node.children.length; i++) {
				var result = getNodeByName(node.children[i], name);

				if (result) {
					return result;
				}
			}
		}
	}
}

var CellControler = function CellControler() {
	this.addNode = function(parent, name) {
		var node = new Cell({name : name});

		if (typeof(parent) === 'string') {
			parent = this.getNode(root, node);
		}

		if (parent instanceof Cell) {
			parent.addChild(node);
		}

		d3.select('select#parent').append('option').text(node.name).attr('id', node.name);
	};

	this.removeNode = function(node) {
		node.drop();
	};

	this.getNode = function(node, name) {
		return getNodeByName(node, name);
	};
};

//
//
// Main
//
//
var root = new Cell({
	name : 'root',
	children : [
      new Cell({"parent" : root, "name": "Child 1", "size": 1983}),
      new Cell({"parent" : root, "name": "Child 2", "size": 2047}),
      new Cell({"parent" : root, "name": "Child 3", "size": 2}),
  ]
});

root.children.forEach(function(child) {
	d3.select('select#parent').append('option').text(child.name).attr('id', child.name);
});

var controler = new CellControler();

function getData() {
	return root;
}

d3.select('#submitNode').on('click', function() {
	var name = document.getElementById('name').value,
		parent = document.getElementById('parent').value;

	controler.addNode(parent, name);
	update(root);
});

d3.select('#update').on('click', function() {
	update(root);
});

d3.select('#genocide').on('click', function() {
	root.children = [];
	update(root);
});