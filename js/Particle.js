class Particle {
	constructor(x, y) {
		this.pos = { x, y };
		this.x = x;
		this.y = y;
		this.ipos = { x, y };
		this.vel = { x: 0, y: 0 };
		this.maxDil = 20;
		this.angle = 0;
		this.sangle = 0;
		this.dir = { x: 0, y: 0 };
		this.off = 0;
		this.mult = 0.5;
		this.noise = 0;
		this.noise_size = 0.003;
		this.offc = 0; //0.0001; //random(0.0, 0.002);
		this.data = {};
		this.snap;
		this.snaplen = 40;
		this.count = 0;
		this.shake = false;
	}
	update(n) {
		this.noise = n(
			this.pos.x * this.noise_size,
			this.pos.y * this.noise_size,
			this.off,
		);
		let dil = this.maxDil;
		if (!this.snap) {
			this.angle = this.noise * TAU * dil - this.sangle;
		}
		if (this.snap && this.count % this.snaplen == 0) {
			this.angle = this.noise * TAU * dil - this.sangle;
		}
		if (random() < 0.5 && this.shake) {
			this.angle *= -10;
		}
		this.dir.x = cos(this.angle);
		this.dir.y = sin(this.angle);
		if (this.snap) {
			let a = round(this.angle / this.snap) * this.snap;
			this.dir.x = cos(a);
			this.dir.y = sin(a);
		}
		this.vel.x += this.dir.x;
		this.vel.y += this.dir.y;
		this.vel.x *= this.mult;
		this.vel.y *= this.mult;
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.off += this.offc;
		this.x = this.pos.x;
		this.y = this.pos.y;
		this.count++;
	}
	reset() {
		this.pos.set(this.ipos);
	}
}
