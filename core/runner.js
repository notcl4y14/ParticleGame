export default class Runner {

	ticks;
	running;
	
	delta;
	lastTime;

	loopFunc;

	constructor () {
		this.ticks = 0;
		this.delta = 0;
		this.lastTime = 0;
		this.running = false;
	}

	// ==== Properties ==== //

	get FPS () {
		return 1000 / this.delta;
	}

	// ==== Start/Stop ==== //

	async start () {
		this.running = true;
		this.loop();
	}

	stop () {
		this.running = false;
	}

	// ==== Loop ==== //

	loop () {
		if (!this.running) {
			return;
		}
		
		this.ticks += 1;

		this.loopFunc();

		const now = performance.now();
		this.delta = now - this.lastTime;
		this.lastTime = performance.now();

		window.requestAnimationFrame( () => this.loop.call(this) );
	}

}