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
		temperature >= 100 ? this.replaceWith(chunk, new Steam().init()) : null;
		temperature <= 0   ? this.replaceWith(chunk, new Ice().init())   : null;
	}

	isMovable () {
		return true;
	}

}