// idealPos: The most preferred position for each label
// width:    The width of each label


var nodes = [
    new labella.Node(1, 50), // idealPos, width
    new labella.Node(2, 50),
    new labella.Node(3, 50),
    new labella.Node(3, 50),
    new labella.Node(3, 50),
];

var force = new labella.Force()
    .nodes(nodes)
    .compute();

// The rendering is independent from this library.
// User can use canvas, svg or any library to draw the labels.
// There is also a built-in helper for this purpose. See labella.Renderer
draw(force.nodes());