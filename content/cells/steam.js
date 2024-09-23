import CellFluid from "../../common/cellular/cells/fluid.js";
import CellGas from "../../common/cellular/cells/gas.js";
import Water from "./water.js";

export default class Steam extends CellGas {

	ID = "gas";
	density = 1;

	temperature = 100;

	getColor () {
		return [199, 225, 242, 0.85];
	}

	onTempChange (chunk, temperature) {
		temperature < 100 ? this.replaceWith(chunk, new Water().init()) : null;
	}

	isMovable () {
		return true;
	}

}