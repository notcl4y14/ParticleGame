import CellPowder from "../../common/cellular/cells/powder.js";
import CellSolid from "../../common/cellular/cells/solid.js";
import Water from "./water.js";

export default class Snow extends CellPowder {

	ID = "snow";
	density = 11;

	temperature = 0;

	static #colors = [ [255, 255, 255], [230, 230, 230], [214, 214, 214] ];

	getColor() {
		var index = Math.floor(Math.random() * Snow.#colors.length);
		return Snow.#colors[index];
	}

	onTempChange (chunk, temperature) {
		temperature > 0 ? this.replaceWith(chunk, new Water().init()) : null;
	}

	isMovable () {
		return false;
	}

}