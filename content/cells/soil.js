import CellPowder from "../../common/cellular/cells/powder.js";
import Glass from "./glass.js";

export default class Soil extends CellPowder {

	ID = "soil";
	density = 2;

	static #colors = [ [92, 50, 33], [125, 71, 49], [84, 58, 48] ];

	getColor() {
		var index = Math.floor(Math.random() * (Soil.#colors.length - 1));
		if (Math.random() < 0.4) {
			index += 1;
		}
		return Soil.#colors[index];
	}

	isMovable() {
		return true;
	}

}