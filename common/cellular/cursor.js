import Cell from "../../core/cellular/cell.js";
import CellPowder from "./cells/powder.js";
import Display from "../../core/display.js";
import Brush from "./brush.js";

export default class Cursor {

	primaryCell = new CellPowder();
	altCell = new Cell();

	x = 0;
	y = 0;

	width = 1;
	height = 1;

	constructor () {
		this.primaryCell.ID = 1;
		this.altCell.ID = 0;
	}

	// ==== Drawing Methods ==== //

	fill (chunk) {
		Brush.setCell(this.primaryCell);
		Brush.fillRect(chunk, this.x, this.y, this.width, this.height);
	}

	fillAlt (chunk) {
		Brush.setCell(this.altCell);
		Brush.fillRect(chunk, this.x, this.y, this.width, this.height);
	}

	// ==== Draw ==== //

	draw () {
		Display.context.strokeStyle = "#ffffff";
		Display.context.strokeRect(this.x, this.y, this.width, this.height);
	}
	
}