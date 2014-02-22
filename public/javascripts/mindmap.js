var Mindmap = (function () {
	var mindmap = function(options) {
		var margin = {
				top : options.top || 20,
				right : options.right || 120,
				bottom : options.bottom || 20,
				left : options.left || 20
			},
			height = options.height || (800 - margin.right - margin.left),
			width = options.width || (960 - margin.top - margin.bottom),
			tree = d3.layout.tree().size([height, width]),
			root = options.data || {"name" : "root", "children" : []},
			duration = 750,
			id = 0;


		var diagonal = d3.svg.diagonal()
			.projection(function(d) { return [d.y, d.x]; });

		var svg = d3.select("body").append("svg")
		    .attr("width", width + margin.right + margin.left)
		    .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Root positioning center left
		root.x0 = height / 2;
		root.y0 = 180;

		function collapse(d) {
			if (d.children) {
				d._children = d.children;
				d._children.forEach(collapse);
				d.children = null;
			}
		}

		root.children.forEach(collapse);

		// Compute the new layout
		var	nodes = tree.nodes(root).reverse(),
			links = tree.links(nodes);

		// Add the nodes
		var node = svg.selectAll("g.nodes")
			.data(nodes, function(d) {
				return d.id || (d.id = id++); 
			});
	};

	mindmap.prototype = {
		addNode : function(parent, name) {
		},
		removeNode : function(node) {
		},
		getNode : function(idNode) {
			return d3.select('#'+idNode);
		},
		click : function(d) {

		}
	};

	return mindmap;
})();

//
//
// Main
//
//
var mindmap = new Mindmap({});

function getData() {
	return root;
}

d3.select('#submitNode').on('click', function() {
	var name = document.getElementById('name').value,
		parent = document.getElementById('parent').value;

	mindmap.addNode(parent, name);
	update(root);
});

d3.select('#update').on('click', function() {
	update(root);
});

d3.select('#genocide').on('click', function() {
	root.children = [];
	update(root);
});