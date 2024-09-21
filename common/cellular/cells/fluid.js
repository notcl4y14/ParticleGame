import Cell from "../../../core/cellular/cell.js";

export default class CellFluid extends Cell {

	static step (chunk, cell, x, y) {
		if (y == chunk.height - 1) {
			return;
		}

		const bottomCell = chunk.getCell(x, y + 1);
		const leftCell = chunk.getCell(x - 1, y);
		const rightCell = chunk.getCell(x + 1, y);

		const bottomCellMovable = bottomCell != null ? bottomCell.isMovable() : false;
		const leftCellMovable = leftCell != null ? leftCell.isMovable() : false;
		const rightCellMovable = rightCell != null ? rightCell.isMovable() : false;

		const bottomEmpty = bottomCellMovable && cell.canPass(chunk, x, y + 1);
		const leftEmpty = leftCellMovable && cell.canPass(chunk, x - 1, y);
		const rightEmpty = rightCellMovable && cell.canPass(chunk, x + 1, y);

		const left = Math.random() < 0.5;
		
		if (!bottomEmpty) {

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