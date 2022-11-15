
function createLGradient(x1 = 0, y1 = 0, x2 = 999, y2 = 999, g = {}) {
	g = {
		0.0: "#000",
		1.0: "#fff",
		...g,
	};
	const grad = drawingContext.createLinearGradient(x1, y1, x2, y2);
	Object.entries(g).forEach((kv) => {
		grad.addColorStop(kv[0], kv[1]);
	});
	return grad;
}

function createRGradient(
	x1 = 0,
	y1 = 0,
	r1 = 0,
	x2 = 200,
	y2 = 200,
	r2 = 200,
	g = {},
) {
	g = {
		0.0: "#000",
		1.0: "#fff",
		...g,
	};
	const grad = drawingContext.createRadialGradient(x1, y1, r1, x2, y2, r2);
	Object.entries(g).forEach((kv) => {
		grad.addColorStop(kv[0], kv[1]);
	});
	return grad;
}
function shadow(x = 0, y = 0, b = 10, c = "#000") {
	drawingContext.shadowColor = c;
	drawingContext.shadowOffsetX = x;
	drawingContext.shadowOffsetY = y;
	drawingContext.shadowBlur = b;
}
function snap(v, s) {
	return Math.floor(v / s) * s;
}