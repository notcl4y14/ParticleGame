import Cell from "../../../core/cellular/cell.js";

export default class CellPowder extends Cell {

	static step (chunk, cell, x, y) {
		if (y == chunk.height - 1) {
			cell.sleep();
			return;
		}

		const bottomCell = chunk.getCell(x, y + 1);
		const bottomLCell = chunk.getCell(x - 1, y + 1);
		const bottomRCell = chunk.getCell(x + 1, y + 1);

		const bottomCellFluid = bottomCell != null ? bottomCell.ID == "air" || bottomCell.isFluid() : false;
		const bottomLCellFluid = bottomLCell != null ? bottomLCell.ID == "air" || bottomLCell.isFluid() : false;
		const bottomRCellFluid = bottomRCell != null ? bottomRCell.ID == "air" || bottomRCell.isFluid() : false;

		const bottomEmpty = bottomCellFluid && cell.canPass(chunk, 0, 1);
		const bottomLEmpty = bottomLCellFluid && cell.canPass(chunk, -1, 1);
		const bottomREmpty = bottomRCellFluid && cell.canPass(chunk, 1, 1);

		const left = Math.random() < 0.5;
		
		if (!bottomEmpty) {
			if (left && bottomLEmpty) {
				cell.wakeUpNeighbors(chunk);
				chunk.swapCells(x, y, x - 1, y + 1);
				return;
			}

			if (!left && bottomREmpty) {
				cell.wakeUpNeighbors(chunk);
				chunk.swapCells(x, y, x + 1, y + 1);
				return;
			}

			cell.sleep();
			
			return;
		}

		// if (chunk.getCell(x, y + 1).ID != "water") {
		// 	chunk.swapCells(x, y, x, y + 1);
		// 	return;
		// }

		// chunk.moveAwayCell(x, y, x, y + 1);
		cell.wakeUpNeighbors(chunk);
		chunk.moveCell(x, y, x, y + 1);
	}

}