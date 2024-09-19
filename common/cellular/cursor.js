import Cell from "../../core/cellular/cell.js";
import CellPowder from "./cells/powder.js";
import Display from "../../core/display.js";
import Brush from "./brush.js";
import Sand from "../../content/cells/sand.js";
import Air from "../../content/cells/air.js";

export default class Cursor {

	primaryCell = new Sand();
	altCell = new Air();

	x;
	y;

	width;
	height;

	constructor () {
		this.primaryCell.init();
		this.altCell.init();
		this.x = 0;
		this.y = 0;
		this.width = 1;
		this.height = 1;
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