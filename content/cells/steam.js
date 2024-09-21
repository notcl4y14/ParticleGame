import CellFluid from "../../common/cellular/cells/fluid.js";
import CellGas from "../../common/cellular/cells/gas.js";

export default class Steam extends CellGas {

	ID = "gas";
	density = 1;

	getColor () {
		return "rgba(199, 225, 242, 0.85)";
	}

}