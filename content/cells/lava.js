import CellFluid from "../../common/cellular/cells/fluid.js";
import Ice from "./ice.js";
import Steam from "./steam.js";
import Stone from "./stone.js";

export default class Lava extends CellFluid {

	ID = "lava";
	density = 10;
	temperature = 500;

	getColor () {
		return [255, 128, 0, 1];
	}

	onTempChange (chunk, temperature) {
		temperature <= 100 ? this.replaceWith(chunk, new Stone().init()) : null;
	}

	isMovable () {
		return true;
	}

}