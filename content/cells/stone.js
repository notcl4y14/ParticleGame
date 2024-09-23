import CellPowder from "../../common/cellular/cells/powder.js";
import CellSolid from "../../common/cellular/cells/solid.js";

export default class Stone extends CellSolid {

	ID = "stone";
	density = 20;

	static #colors = [ [128, 128, 128], [75, 75, 75] ];

	getColor () {
		var index = Math.floor(Math.random() * (Stone.#colors.length - 1));
		if (Math.random() < 0.4) {
			index += 1;
		}
		return Stone.#colors[index];
	}

}