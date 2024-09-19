import CellPowder from "../../common/cellular/cells/powder.js";

export default class Sand extends CellPowder {

	static #colors = [ "rgb(245, 234, 164)", "rgb(240, 224, 127)", "rgb(255, 255, 255)" ];

	getColor () {
		var index = Math.floor(Math.random() * Sand.#colors.length - 1);
		if (Math.random() < 0.4) {
			index += 1;
		}
		return Sand.#colors[index];
	}

}