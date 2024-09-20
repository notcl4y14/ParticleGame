import CellFluid from "../../common/cellular/cells/fluid.js";

export default class Water extends CellFluid {

	ID = "water";
	density = 10;

	getColor () {
		return "rgba(102, 163, 204, 0.75)";
	}

}