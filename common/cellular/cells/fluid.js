import Cell from "../../../core/cellular/cell.js";

export default class CellFluid extends Cell {

	static step (chunk, x, y) {
		if (y == chunk.height - 1) {
			return;
		}

		// const bottomCell = chunk.getCell(x, y + 1);
		// const bottomLCell = chunk.getCell(x - 1, y + 1);
		// const bottomRCell = chunk.getCell(x + 1, y + 1);

		const bottomEmpty = chunk.isCellEmpty(x, y + 1);
		const bottomLEmpty = chunk.isCellEmpty(x - 1, y + 1);
		const bottomREmpty = chunk.isCellEmpty(x + 1, y + 1);
		const leftEmpty = chunk.isCellEmpty(x - 1, y);
		const rightEmpty = chunk.isCellEmpty(x + 1, y);

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

		chunk.swapCells(x, y, x, y + 1);
	}

}