import CellFluid from "../../common/cellular/cells/fluid.js";

export default class Water extends CellFluid {

	ID = "water";
	density = 10;

	getColor () {
		return "rgb(102, 163, 204)";
	}

}