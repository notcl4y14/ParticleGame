import Cell from "../../../core/cellular/cell.js";

export default class CellSolid extends Cell {

	static step (chunk, cell, x, y) {
		this.isSleeping = true;
	}

}