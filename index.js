/*
Project 8 | s/t - untitled
fxhashturnsone
Preview: oo3pxFYgLf4bqTVrt8SR5WmYLquDmupuR4TRDQrPsF19Xk3t6gY
*/

let overlay,
	loaded = false,
	innerbar,
	seed,
	cv,
	snoise,
	turbulence,
	rot,
	vert,
	maxs,
	maxds,
	mins,
	pload = 0,
	renderFrames = 800,
	part = [],
	palC = [
		[94, 27, 30],
		[10, 42, 38],
		[324, 19, 46],
		[36, 59, 40],
	],
	pal;
function setup() {
	seed = int(fxrand() * 9999999999);
	randomSeed(seed);
	snoise = createNoise3D(random);
	overlay = document.querySelector(".overlay");
	innerbar = document.querySelector("#innerbar");
	cv = createCanvas(1200, 1800);
	cv.id("untitledp8");
	cv.class("_");
	rot = snap(random(TAU), PI / 4);
	vert = random() < 0.5;
	mins = random(5, 10);
	maxs = random(11, 45);
	maxds = random(50, 100);
	pal = palC[floor(random(0, palC.length))];
	turbulence = random() < 0.5;
	// Pixel density param
	const uparams = getURLParams();
	if (uparams.pd) {
		pixelDensity(float(uparams.pd));
	} else {
		pixelDensity(1);
	}
	colorMode(HSL, 360, 100, 100, 100);
	background(0);
	fill(0);
	noStroke();
	drawingContext.fillStyle = createLGradient(0, 0, 1200, 1800, {
		0: color(0, 0, random() * 100),
		1: color(0, 0, random() * 100),
	});
	rect(0, 0, width, height);
	fill(0);
	if (random() < 0.5) {
		for (let i = 0; i < 2; i++) {
			let r = random(20, 200);
			let x = random(r + r, width - r);
			let y = random(r + r, height - r);
			let g = createLGradient(
				x - r / 2,
				y - r / 2,
				x + r / 2,
				y + r / 2,
				{
					0: color(pal[0], pal[1], pal[2], 50),
					1: color(255, 0),
				},
			);
			fill(0);
			noStroke();
			drawingContext.fillStyle = g;
			circle(x, y, r * 2);
			let s = round(random(50, 100));
			let sz = random(2, 5);
			for (let m = 0; m < s; m++) {
				let a = (TAU / s) * m;

				let _x = x + cos(a) * r;
				let _y = y + sin(a) * r;
				stroke(255, 255, 255, 20);
				strokeWeight(0.8);
				line(x, y, _x, _y);
				fill(255, 255, 255, 20);
				noStroke();
				circle(_x, _y, sz);
			}
		}
	}
	noStroke();
	// Crear particulas
	for (let i = 0; i < 2; i++) {
		let p = new Particle(
			width / 2 + random(-200, 200),
			height / 2 + random(-200, 200),
		);
		p.sangle = random(TAU);
		p.shake = turbulence;
		p.data.s = 0.994;
		p.data.r = random(120, 200);
		p.data.l = random(10, 100);
		p.data.sl = round(random(20, 100));
		p.snaplen = p.data.sl;
		part.push(p);
	}

	document.title = `s/t - Proyecto #8 | Andr\u00e9s Senn | Noviembre - 2022`;
	console.log(
		`%cs/t - Proyecto #8 | Andr\u00e9s Senn 2022 | github: https://github.com/andrusenn/st_proyecto8`,
		"background:#333;border-radius:10px;background-size:15%;color:#eee;padding:10px;font-size:15px;text-align:center;",
	);
}
function flor(x, y, r, p) {
	for (let m = 0; m < p; m++) {
		let a = (TAU / p) * m;

		let _x = x + cos(a) * r;
		let _y = y + sin(a) * r;
		stroke(random(256), 127);
		strokeWeight(0.8);
		line(x, y, _x, _y);
		fill(random(256), 127);
		noStroke();
		circle(_x, _y, 4);
	}
}
function draw() {
	if (frameCount < renderFrames) {
		translate(width / 2, height / 2);
		scale(1.6);
		rotate(rot);
		translate(-width / 2, -height / 2);
		part.forEach((p, i) => {
			p.update(snoise);
			p.data.r *= p.data.s;
			if (p.data.r < 1) p.data.r = 1;

			// shadow
			fill(0, 1);
			circle(p.x + 5, p.y + 5, p.data.r + 10);

			fill(pal[0], pal[1], pal[2], 20);
			circle(p.x + 2, p.y + 2, p.data.r);
			if (frameCount % 40 > 20 && random() < 0.2) {
				fill(int(random(0, 360)), 100, 40);
				circle(p.x + random(-20, 20), p.y, p.data.r);
			} else {
				fill(255);
				circle(p.x, p.y, p.data.r);
			}
			if (frameCount % 50 > 48 && random() < 0.2) {
				fill(255);
				flor(p.x, p.y, random(4, 30), 3);
			}
			fill(pal[0], pal[1], pal[2], 20);
			circle(snap(p.x + 40, 5), snap(p.y + 40, 5), 2);

			fill(0, 10);
			circle(p.x + 50, p.y + 50, 1);
		});
		noSmooth();
		if (frameCount % 4 == 0) {
			if (vert) {
				let im = get(
					0,
					round(height / 2 - random(mins, maxds)),
					width,
					round(random(maxs, maxds)),
				);
				set(0, round(height / 2 - random(mins, maxds)), im);
			} else {
				let im = get(
					round(width / 2 - random(mins, maxds)),
					0,
					round(random(maxs, maxds)),
					height,
				);
				set(round(width / 2 - random(mins, maxds)), 0, im);
			}
		}
		if (part.length < 500) {
			if (frameCount % 80 == 0) {
				let tempP = [];
				part.forEach((p) => {
					for (let i = 0; i < 2; i++) {
						let p1 = new Particle(p.x, p.y + random(-100, 100));
						p1.off = random(0, 0.02);
						p1.shake = turbulence;
						p1.data.s = p.data.s;
						p1.data.r = p.data.r;
						p1.data.sl = round(random(20, 100));
						p1.snaplen = p1.data.sl;
						tempP.push(p1);
					}
				});
				part = [];
				part = tempP;
			}
		}
		pload = frameCount / renderFrames;
		innerbar.style = "transform: scale(" + pload + ",1)";
	} else {
		overlay.classList.add("rendered");
		overlay.addEventListener("transitionend", () => {
			overlay.style.display = "none";
		});
		noLoop();
		fxpreview();
	}
}
function keyReleased() {
	switch (key) {
		case "1":
			doPD("1");
			break;
		case "2":
			doPD("2");
			break;
		case "3":
			doPD("3");
			break;
	}
	if (key == "s" || key == "S") {
		grabImage();
	}
}

function doubleClicked() {
	grabImage();
}
function doPD(n) {
	if (window.location.href.includes("?")) {
		if (window.location.href.includes("pd")) {
			window.location.href = window.location.href.replace(
				/pd\=(.)+/gi,
				"pd=" + encodeURI(n),
			);
		} else {
			window.location.href = window.location.href + "&pd=" + encodeURI(n);
		}
	} else {
		window.location.href = window.location.href + "?pd=" + encodeURI(n);
	}
}
function grabImage() {
	let file =
		fxhash.slice(2, 5) +
		"_" +
		fxhash.slice(-3) +
		"_" +
		width * pixelDensity() +
		"x" +
		height * pixelDensity() +
		".png";
	console.log(
		`%c SAVING ${
			String.fromCodePoint(0x1f5a4) + String.fromCodePoint(0x1f90d)
		}`,
		"background: #000; color: #ccc;padding:5px;font-size:15px",
	);
	saveCanvas(file);
}
