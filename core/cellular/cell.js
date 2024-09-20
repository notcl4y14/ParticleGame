export default class Cell {

	ID;
	color;
	density;

	// ==== Initializers ==== //

	init () {
		this.assignColor();
		return this;
	}

	assignColor () {
		this.color = this.getColor();
	}

	// ==== Chunk/Cell ==== //

	canPass (chunk, x, y) {
		const cell = chunk.getCell(x, y);
		return !chunk.checkPosOut(x, y) && this.density > cell?.density;
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