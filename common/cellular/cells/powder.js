import Cell from "../../../core/cellular/cell.js";

export default class CellPowder extends Cell {

	static step (chunk, cell, x, y) {
		if (y == chunk.height - 1) {
			return;
		}

		// const bottomCell = chunk.getCell(x, y + 1);
		// const bottomLCell = chunk.getCell(x - 1, y + 1);
		// const bottomRCell = chunk.getCell(x + 1, y + 1);

		const bottomEmpty = cell.canPass(chunk, x, y + 1);
		const bottomLEmpty = cell.canPass(chunk, x - 1, y + 1);
		const bottomREmpty = cell.canPass(chunk, x + 1, y + 1);

		const left = Math.random() < 0.5;
		
		if (!bottomEmpty) {
			if (left && bottomLEmpty) {
				chunk.swapCells(x, y, x - 1, y + 1);
				return;
			}

			if (!left && bottomREmpty) {
				chunk.swapCells(x, y, x + 1, y + 1);
				return;
			}
			
			return;
		}

		// if (chunk.getCell(x, y + 1).ID != "water") {
		// 	chunk.swapCells(x, y, x, y + 1);
		// 	return;
		// }

		// chunk.moveAwayCell(x, y, x, y + 1);
		chunk.moveCell(x, y, x, y + 1);
	}

}