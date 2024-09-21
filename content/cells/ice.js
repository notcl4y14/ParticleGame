import CellPowder from "../../common/cellular/cells/powder.js";
import CellSolid from "../../common/cellular/cells/solid.js";
import Water from "./water.js";

export default class Ice extends CellSolid {

	ID = "ice";
	density = 1;

	temperature = 0;

	getColor() {
		return "rgba(174, 215, 242, 0.85)";
	}

	onTempChange (chunk, temperature) {
		if (temperature > 0) {
			this.replaceWith(chunk, this.x, this.y, new Water().init());
		}
	}

	isMovable () {
		return false;
	}

}