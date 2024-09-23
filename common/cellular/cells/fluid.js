import Cell from "../../../core/cellular/cell.js";

export default class CellFluid extends Cell {

	static step (chunk, cell, x, y) {
		if (y == chunk.height - 1) {
			cell.sleep();
			return;
		}

		const bottomCell = chunk.getCell(x, y + 1);
		const leftCell = chunk.getCell(x - 1, y);
		const rightCell = chunk.getCell(x + 1, y);

		const bottomCellMovable = bottomCell != null ? bottomCell.isMovable() : false;
		const leftCellMovable = leftCell != null ? leftCell.isMovable() : false;
		const rightCellMovable = rightCell != null ? rightCell.isMovable() : false;

		const bottomEmpty = bottomCellMovable && cell.canPass(chunk, 0, 1);
		const leftEmpty = leftCellMovable && cell.canPass(chunk, -1, 0);
		const rightEmpty = rightCellMovable && cell.canPass(chunk, 1, 0);

		const left = Math.random() < 0.5;
		
		if (!bottomEmpty) {

			if (left && leftEmpty) {
				cell.wakeUpNeighbors(chunk);
				chunk.swapCells(x, y, x - 1, y);
				return;
			}

			if (!left && rightEmpty) {
				cell.wakeUpNeighbors(chunk);
				chunk.swapCells(x, y, x + 1, y);
				return;
			}

			cell.sleep();
			
			return;
		}

		cell.wakeUpNeighbors(chunk);
		chunk.swapCells(x, y, x, y + 1);
	}

}