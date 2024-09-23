import CellPowder from "../../common/cellular/cells/powder.js";
import CellSolid from "../../common/cellular/cells/solid.js";

export default class Glass extends CellSolid {

	ID = "glass";
	density = 20;

	static #colors = [ [255, 255, 255, 0.25], [255, 255, 255, 0.20] ];

	getColor () {
		var index = Math.floor(Math.random() * (Glass.#colors.length - 1));
		if (Math.random() < 0.4) {
			index += 1;
		}
		return Glass.#colors[index];
	}

}