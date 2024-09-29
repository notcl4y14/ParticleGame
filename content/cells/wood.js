import CellPowder from "../../common/cellular/cells/powder.js";
import CellSolid from "../../common/cellular/cells/solid.js";

export default class Wood extends CellSolid {

	ID = "wood";
	density = 20;

	static #colors = [ [74, 54, 35], [89, 67, 46] ];

	getColor () {
		var index = Math.floor(Math.random() * Wood.#colors.length);
		return Wood.#colors[index];
	}

}