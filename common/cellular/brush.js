import Cell from "../../core/cellular/cell.js";
import CellPowder from "./cells/powder.js";

export default class Brush {

	static primaryCell = new CellPowder();
	static altCell = new Cell();

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

				const cell = this.primaryCell.clone();
				chunk.setCell(cell, x + xPos, y + yPos);

			}
		}
		
	}
}

Brush.primaryCell.ID = 1;
Brush.altCell.ID = 0;