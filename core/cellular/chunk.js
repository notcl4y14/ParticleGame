import Display from "../display.js";
import Cell from "./cell.js";

export default class Chunk {

	#world;
	#width;
	#height;

	area;

	constructor(width, height) {
		this.#world = [];
		this.#width = width;
		this.#height = height;
		this.area = this.#width * this.#height;
		this.#createWorld();
	}

	// ==== Initializers ==== //

	#createWorld () {
		// const area = this.#width * this.#height;
		
		for (let i = 0; i != this.area; i++) {
			const cell = new Cell();
			cell.ID = 0;
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
		const newInstance = structuredClone(this);
		return newInstance;
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

	setCell (cell, x, y) {
		this.#world[this.#convertPosIndex(x, y)] = cell;
	}

	// ==== Cells ==== //

	isCellEmpty (x, y) {
		return !this.checkPosOut(x, y) && this.getCell(x, y).ID == 0;
	}

	swapCells (srcX, srcY, destX, destY) {
		const srcCell = this.getCell(srcX, srcY);
		const destCell = this.getCell(destX, destY);

		this.setCell(srcCell, destX, destY);
		this.setCell(destCell, srcX, srcY);
	}

	// ==== Update ==== //

	update () {
		for (let x = 0; x != this.#width; x++) {
			for (let y = this.#height - 1; y != -1; y--) {
				const cell = this.getCell(x, y);
				// this.#updateCell(cell, x, y);
				cell.constructor.step(this, x, y);
			}
		}
	}

	#updateCell (cell, x, y) {
	}

	// ==== Draw ==== //

	draw () {
		for (let i = 0; i != this.area; i++) {
			const [x, y] = this.#convertIndexPos(i);
			this.#drawTile(this.getCell(x, y), x, y);
		}
	}

	#drawTile (tile, x, y) {
		// switch (tile.ID) {
		// 	case 0:
		// 		return;
			
		// 	case 1:
		// 		Display.context.fillStyle = "#ffff00";
		// 		break;
		// }

		if (tile.ID == 0) {
			return;
		}

		Display.context.fillStyle = tile.color;

		Display.context.fillRect(x, y, 1, 1);
	}

	drawPngLike() {
		for (let x = 0; x != this.#width; x++) {
			for (let y = 0; y != this.#height; y++) {
				const color = (x + y) % 2 == 0 ? "#555555" : "#222222";
				Display.context.fillStyle = color;
				Display.context.fillRect(x, y, 1, 1);
			}
		}
	}

	drawBorders () {
		Display.context.lineWidth = 0.1;
		Display.context.strokeStyle = "#000000";
		Display.context.strokeRect(0, 0, this.#width, this.#height);
	}
}