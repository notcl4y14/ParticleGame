export default class Cell {

	ID;
	color;
	density;

	x = 0;
	y = 0;

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
		const cell = chunk.getCell(x, y);
		return !chunk.checkPosOut(x, y) && this.density > cell?.density;
	}

	replaceWith (chunk, x, y, cell) {
		cell.temperature = this.temperature;
		chunk.setCell(cell, x, y);
	}

	heat (chunk, delta) {
		this.temperature += delta;
		this.onTempChange(chunk, this.temperature);
	}

	cool (chunk, delta) {
		this.temperature -= delta;
		this.onTempChange(chunk, this.temperature);
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