import Cell from "../../../core/cellular/cell.js";

export default class CellGas extends Cell {

	static step (chunk, cell, x, y) {
		if (y == 0) {
			return;
		}

		// const bottomCell = chunk.getCell(x, y + 1);
		// const bottomLCell = chunk.getCell(x - 1, y + 1);
		// const bottomRCell = chunk.getCell(x + 1, y + 1);

		const topEmpty = cell.canPass(chunk, 0, -1);
		const leftEmpty = cell.canPass(chunk, -1, 0);
		const rightEmpty = cell.canPass(chunk, 1, 0);

		const left = Math.random() < 0.5;
		
		if (!topEmpty) {

			if (left && leftEmpty) {
				chunk.swapCells(x, y, x - 1, y);
				return;
			}

			if (!left && rightEmpty) {
				chunk.swapCells(x, y, x + 1, y);
				return;
			}
			
			return;
		}

		chunk.swapCells(x, y, x, y - 1);
	}

}