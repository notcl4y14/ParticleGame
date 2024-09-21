import CellFluid from "../../common/cellular/cells/fluid.js";
import CellGas from "../../common/cellular/cells/gas.js";
import Water from "./water.js";

export default class Steam extends CellGas {

	ID = "gas";
	density = 1;

	temperature = 100;

	getColor () {
		return "rgba(199, 225, 242, 0.85)";
	}

	onTempChange (chunk, temperature) {
		if (temperature < 100) {
			this.replaceWith(chunk, this.x, this.y, new Water().init());
		}
	}

	isMovable () {
		return true;
	}

}