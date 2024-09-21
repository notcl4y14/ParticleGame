import CellFluid from "../../common/cellular/cells/fluid.js";
import Ice from "./ice.js";
import Steam from "./steam.js";

export default class Water extends CellFluid {

	ID = "water";
	density = 10;

	getColor () {
		return "rgba(102, 163, 204, 0.75)";
	}

	onTempChange (chunk, temperature) {
		if (temperature >= 100) {
			this.replaceWith(chunk, this.x, this.y, new Steam().init());
		} else if (temperature <= 0) {
			this.replaceWith(chunk, this.x, this.y, new Ice().init());
		}
	}

	isMovable () {
		return true;
	}

}