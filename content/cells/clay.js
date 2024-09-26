import CellPowder from "../../common/cellular/cells/powder.js";
import Ceramic from "./ceramic.js";
import Glass from "./glass.js";

export default class Clay extends CellPowder {

	ID = "clay";
	density = 16;

	static #colors = [[168, 84, 50], [115, 68, 49], [89, 42, 23]];

	getColor() {
		var index = Math.floor(Math.random() * Clay.#colors.length);
		return Clay.#colors[index];
	}

	onTempChange(chunk, temperature) {
		temperature > 500 ? this.replaceWith(chunk, new Ceramic().init()) : null;
	}

	isMovable() {
		return true;
	}

}