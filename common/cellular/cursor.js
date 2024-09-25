import Cell from "../../core/cellular/cell.js";
import CellPowder from "./cells/powder.js";
import Display from "../../core/display.js";
import Brush from "./brush.js";
import Sand from "../../content/cells/sand.js";
import Air from "../../content/cells/air.js";
import Water from "../../content/cells/water.js";
import Stone from "../../content/cells/stone.js";
import Steam from "../../content/cells/steam.js";
import Ice from "../../content/cells/ice.js";
import Glass from "../../content/cells/glass.js";
import Soil from "../../content/cells/soil.js";
import Lava from "../../content/cells/lava.js";
import Gravel from "../../content/cells/gravel.js";

export default class Cursor {

	// static IDs = [ "air", "sand", "water" ];

	primaryCell = new Sand();
	altCell = new Air();

	x;
	y;

	width;
	height;

	constructor () {
		this.primaryCell.init();
		this.altCell.init();
		this.x = 0;
		this.y = 0;
		this.width = 1;
		this.height = 1;
	}

	setCellByID (id) {
		switch (id) {
			case 0:
				this.primaryCell = new Air();
				break;

			case 1:
				this.primaryCell = new Sand();
				break;
				
			case 2:
				this.primaryCell = new Water();
				break;

			case 3:
				this.primaryCell = new Stone();
				break;

			case 4:
				this.primaryCell = new Steam();
				break;

			case 5:
				this.primaryCell = new Ice();
				break;

			case 6:
				this.primaryCell = new Glass();
				break;

			case 7:
				this.primaryCell = new Soil();
				break;

			case 8:
				this.primaryCell = new Lava();
				break;

			case 9:
				this.primaryCell = new Gravel();
				break;
		}
	}

	// ==== Drawing Methods ==== //

	fill (chunk) {
		Brush.setCell(this.primaryCell);
		Brush.fillRect(chunk, this.x, this.y, this.width, this.height);
	}

	fillAlt (chunk) {
		Brush.setCell(this.altCell);
		Brush.fillRect(chunk, this.x, this.y, this.width, this.height);
	}

	// ==== Draw ==== //

	draw () {
		Display.context.strokeStyle = "#ffffff";
		Display.context.strokeRect(this.x, this.y, this.width, this.height);
	}
	
}