export default class Cell {

	static sleepCountMax = 20;

	ID;
	color;
	density;

	x = 0;
	y = 0;

	sleepCount = 0;
	isSleeping = false;

	temperature = 15;

	// ==== Initializers ==== //

	init () {
		this.assignColor();
		return this;
	}

	assignColor () {
		this.color = this.getColor();
	}

	// ==== Events ==== //

	onTempChange (chunk, temperature) {}

	// ==== Chunk/Cell ==== //

	canPass (chunk, x, y) {
		x += this.x;
		y += this.y;
		const cell = chunk.getCell(x, y);
		return !chunk.checkPosOut(x, y) && this.density > cell?.density;
	}

	replaceWith (chunk, cell) {
		cell.temperature = this.temperature;
		chunk.setCell(cell, this.x, this.y);
	}

	sleep () {
		if (this.sleepCount++ >= Cell.sleepCountMax) {
			this.isSleeping = true;
		}
	}

	wakeUp () {
		this.sleepCount = 0;
		this.isSleeping = false;
	}

	wakeUpNeighbors (chunk) {
		chunk.getCell(this.x - 1, this.y)?.wakeUp();
		chunk.getCell(this.x + 1, this.y)?.wakeUp();
		chunk.getCell(this.x, this.y - 1)?.wakeUp();
		chunk.getCell(this.x, this.y + 1)?.wakeUp();
	}

	heat (chunk, delta) {
		this.temperature += delta;
		this.onTempChange(chunk, this.temperature);
	}

	cool (chunk, delta) {
		this.temperature -= delta;
		this.onTempChange(chunk, this.temperature);
	}

	conductHeat (chunk) {
		const left = chunk.getCell(this.x - 1, this.y);
		const right = chunk.getCell(this.x + 1, this.y);
		const top = chunk.getCell(this.x, this.y - 1);
		const bottom = chunk.getCell(this.x, this.y + 1);

		left.heat(chunk, this.temperature / 8 - 1);
		right.heat(chunk, this.temperature / 8 - 1);
		top.heat(chunk, this.temperature / 8 - 1);
		bottom.heat(chunk, this.temperature / 8 - 1);
	}

	// ==== Checkers ==== //

	isMovable () {
		return false;
	}

	// ==== Getters ==== //

	getColor () {
		return null;
	}

	static step (chunk) {}

	// ==== Misc. ==== //
	
	clone () {
		const cell = new this.constructor();
		cell.ID = this.ID;
		return cell;
	}
	
}