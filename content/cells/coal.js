import CellPowder from "../../common/cellular/cells/powder.js";
import Ceramic from "./ceramic.js";
import Glass from "./glass.js";

export default class Coal extends CellPowder {

	ID = "coal";
	density = 16;

	static #colors = [[41, 41, 41], [18, 18, 18], [36, 36, 36]];

	getColor() {
		var index = Math.floor(Math.random() * Coal.#colors.length);
		return Coal.#colors[index];
	}

	isMovable() {
		return true;
	}

}