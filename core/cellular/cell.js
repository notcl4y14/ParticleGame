export default class Cell {

	ID;
	color;

	// ==== Initializers ==== //

	init () {
		this.assignColor();
		return this;
	}

	assignColor () {
		this.color = this.getColor();
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