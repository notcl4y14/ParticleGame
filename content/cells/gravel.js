import CellPowder from "../../common/cellular/cells/powder.js";
import Glass from "./glass.js";

export default class Gravel extends CellPowder {

	ID = "gravel";
	density = 12;

	static #colors = [ [181, 176, 170], [156, 141, 124], [181, 154, 123], [128, 122, 115], [201, 196, 189] ];

	getColor() {
		var index = Math.floor(Math.random() * Gravel.#colors.length);
		return Gravel.#colors[index];
	}

	isMovable() {
		return true;
	}

}