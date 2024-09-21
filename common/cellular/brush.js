import Sand from "../../content/cells/sand.js";
import Cell from "../../core/cellular/cell.js";
import CellPowder from "./cells/powder.js";

export default class Brush {

	static cell = new Sand();

	static setCell (cell) {
		this.cell = cell;
	}

	static fillRect (chunk, xPos, yPos, width, height) {

		if (width < 0) {
			width = Math.abs(width);
			xPos -= width;
		}

		if (height < 0) {
			height = Math.abs(height);
			yPos -= height;
		}

		// width < 0 ? ( (xPos += width) || (width = Math.abs(width)) ) : null;
		// height < 0 ? ( (yPos += height) || (height = Math.abs(height)) ) : null;

		// console.log(width, height);

		for (let x = 0; x != width; x++) {
			for (let y = 0; y != height; y++) {

				if (chunk.checkPosOut(x + xPos, y + yPos)) {
					continue;
				}

				const cell = this.cell.clone();
				cell.assignColor();
				chunk.setCell(cell, x + xPos, y + yPos);

			}
		}
		
	}

	static heatRect (chunk, delta, xPos, yPos, width, height) {

		if (width < 0) {
			width = Math.abs(width);
			xPos -= width;
		}

		if (height < 0) {
			height = Math.abs(height);
			yPos -= height;
		}

		for (let x = 0; x != width; x++) {
			for (let y = 0; y != height; y++) {

				if (chunk.checkPosOut(x + xPos, y + yPos)) {
					continue;
				}

				chunk.getCell(x + xPos, y + yPos).heat(chunk, delta);

			}
		}
		
	}
}

Brush.cell.assignColor();