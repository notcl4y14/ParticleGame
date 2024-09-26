import CellPowder from "../../common/cellular/cells/powder.js";
import CellSolid from "../../common/cellular/cells/solid.js";
import Glass from "./glass.js";

export default class Ceramic extends CellSolid {

	ID = "ceramic";
	density = 16;

	static #colors = [[168, 84, 50], [117, 62, 40], [150, 109, 92]];

	getColor() {
		var index = Math.floor(Math.random() * Ceramic.#colors.length);
		return Ceramic.#colors[index];
	}

}