export default class Cell {

	ID;

	static step (chunk) {}

	clone () {
		const cell = new this.constructor();
		cell.ID = this.ID;
		return cell;
	}
	
}