import Air from "../../content/cells/air.js";
import Display from "../display.js";
import Cell from "./cell.js";
import RGBColor from "../../util/rgbcolor.js";

export default class Chunk {

	#world;
	#width;
	#height;

	area;

	constructor(width, height, createWorld = true) {
		this.#world = [];
		this.#width = width;
		this.#height = height;
		this.area = this.#width * this.#height;
		if (createWorld) this.#createWorld();
	}

	// ==== Initializers ==== //

	#createWorld () {
		// const area = this.#width * this.#height;
		
		for (let i = 0; i != this.area; i++) {
			const cell = new Air();
			cell.init();
			this.#world.push(cell);
		}
	}

	// ==== Converters ==== //

	#convertPosIndex (x, y) {
		return y * this.#width + x;
	}

	#convertIndexPos (index) {
		const x = index % this.#width;
		const y = Math.floor(index / this.#width);

		return [x, y];
	}

	// ==== Checkers ==== //

	checkPosOut (x, y) {
		return (x < 0 || x > this.#width - 1)
			|| (y < 0 || y > this.#height - 1)
	}

	// ==== Misc. ==== //

	clone () {
		// const obj = structuredClone(this);
		// const newInstance = Object.assign( {}, this, obj );
		// const newInstance = JSON.parse(JSON.stringify(this));
		const newInstance = new Chunk(this.#width, this.#height, false);

		var i = 0;

		while (i !== this.area) {
			const cell = this.#world[i];
			newInstance.setCellAtIndex(cell, i);
			i++;
		}

		return newInstance;
	}

	copyWorldFrom (chunk) {
		var newWorld = [];

		var i = 0;

		while (i !== chunk.area) {
			newWorld[i] = chunk.getCellAtIndex(i);
			i++;
		}

		this.#world = newWorld;
	}

	// ==== Properties ==== //

	get width () {
		return this.#width;
	}

	get height () {
		return this.#height;
	}

	// ==== Getters/Setters ==== //

	getCell (x, y) {
		return this.#world[this.#convertPosIndex(x, y)];
	}

	getCellAtIndex (index) {
		return this.#world[index];
	}

	setCell (cell, x, y) {
		cell.x = x;
		cell.y = y;

		this.#world[this.#convertPosIndex(x, y)] = cell;
	}

	setCellAtIndex (cell, index) {
		const [x, y] = this.#convertIndexPos(index);
		cell.x = x;
		cell.y = y;
		this.#world[index] = cell;
	}

	// ==== Cells ==== //

	isCellEmpty (x, y) {
		return !this.checkPosOut(x, y) && this.getCell(x, y).ID == "air";
	}

	swapCells (srcX, srcY, destX, destY) {
		const srcCell = this.getCell(srcX, srcY);
		const destCell = this.getCell(destX, destY);

		srcCell.x = destX;
		srcCell.y = destY;
		destCell.x = srcX;
		destCell.y = srcY;

		this.setCell(srcCell, destX, destY);
		this.setCell(destCell, srcX, srcY);
	}

	moveCell (srcX, srcY, destX, destY) {
		const srcCell = this.getCell(srcX, srcY);

		srcCell.x = destX;
		srcCell.y = destY;

		this.setCell(new Air().init(), srcX, srcY);
		this.setCell(srcCell, destX, destY);
	}

	moveAwayCell (srcX, srcY, destX, destY) {
		// const srcCell = this.getCell(srcX, srcY);
		// const destCell = this.getCell(destX, destY);

		const direction = Math.random() > 0.5 ? 1 : -1;

		this.swapCells(destX, destY, destX + direction, destY);
		this.swapCells(srcX, srcY, destX, destY);
	}

	// ==== Update ==== //

	update () {
		const newChunk = this.clone();

		var x = 0;
		var y = this.#height - 1;

		while (x !== this.#width) {
			while (y !== -1) {

				const cell = this.getCell(x, y);
				cell.constructor.step(newChunk, cell, x, y);

				y--;

			}

			x++;
			y = this.#height - 1;
		}

		this.copyWorldFrom(newChunk);
	}

	#updateCell (cell, x, y) {
	}

	// ==== Draw ==== //

	draw () {
		const imageData = Display.context.createImageData(this.#width, this.#height);

		for (let i = 0; i != this.area; i++) {
			const [x, y] = this.#convertIndexPos(i);
			this.#drawTile(this.getCell(x, y), x, y, imageData);
		}

		// window.onkeydown = () => {
		// 	console.log(imageData.data);
		// 	debugger;

		// }

		const newContext = document.createElement("canvas").getContext("2d");
		newContext.imageSmoothingEnabled = false;
		// newContext.width = this.#width;
		// newContext.height = this.#height;
		newContext.putImageData(imageData, 0, 0, 0, 0, this.#width, this.#height);

		Display.context.drawImage(newContext.canvas, 0, 0);
		// Display.context.putImageData(imageData, 0, 0);

		this.drawHeat();
	}

	#drawTile (cell, x, y, imageData) {
		// switch (tile.ID) {
		// 	case 0:
		// 		return;
			
		// 	case 1:
		// 		Display.context.fillStyle = "#ffff00";
		// 		break;
		// }

		if (cell.ID == "air") {
			return;
		}

		const rgbColor = new RGBColor(cell.color);
		const colorR = rgbColor.r;
		const colorG = rgbColor.g;
		const colorB = rgbColor.b;
		const colorA = rgbColor.a;

		const pixelIndex = y * imageData.width + x;
		const dataIndex = pixelIndex * 4;

		// console.log(cell.color, rgbColor);
		// debugger;

		// console.log(colorR, colorG, colorB, colorA);
		
		imageData.data[dataIndex] = colorR;
		imageData.data[dataIndex + 1] = colorG;
		imageData.data[dataIndex + 2] = colorB;
		imageData.data[dataIndex + 3] = colorA * 255;

		// Display.context.fillStyle = cell.color;
		// Display.context.fillRect(x, y, 1, 1);
	}

	drawHeat () {
		for (let i = 0; i != this.area; i++) {
			const [x, y] = this.#convertIndexPos(i);
			const cell = this.getCell(x, y);

			if (cell.ID == "air") {
				continue;
			}
			
			const heat = cell.temperature > 50 ? cell.temperature * 0.001 : 0;
			Display.context.fillStyle = "rgba(255, 128, 0, " + heat + ")";
			Display.context.fillRect(x, y, 1, 1);
		}
	}

	drawPngLike() {
		const imageData = Display.context.createImageData(this.#width, this.#height);
		var even = true;

		for (let i = 0; i !== this.area; i++) {
			const color = even ? [85, 85, 85, 255] : [34, 34, 34, 255];
			const index = i * 4;
			imageData.data[index] = color[0];
			imageData.data[index + 1] = color[1];
			imageData.data[index + 2] = color[2];
			imageData.data[index + 3] = color[3];

			even = !even;

			if ((i + 1) % this.#width == 0) {
				even = !even;
			}
		}

		const newContext = document.createElement("canvas").getContext("2d");
		newContext.imageSmoothingEnabled = false;
		newContext.putImageData(imageData, 0, 0, 0, 0, this.#width, this.#height);

		Display.context.drawImage(newContext.canvas, 0, 0);

		// for (let x = 0; x != this.#width; x++) {
		// 	for (let y = 0; y != this.#height; y++) {
		// 		// const color = (x + y) % 2 == 0 ? [85, 85, 85, 255] : [34, 34, 34, 255];
		// 		// const color = (x + y) % 2 == 0 ? "#555555" : "#222222";
		// 		// Display.context.fillStyle = color;
		// 		// Display.context.fillRect(x, y, 1, 1);
		// 	}
		// }
	}

	drawBorders () {
		Display.context.lineWidth = 0.1;
		Display.context.strokeStyle = "#000000";
		Display.context.strokeRect(0, 0, this.#width, this.#height);
	}
}