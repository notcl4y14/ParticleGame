import CellPowder from "../common/cellular/cells/powder.js";
import Cell from "./cellular/cell.js";
import Chunk from "./cellular/chunk.js";
import Display from "./display.js";
import Runner from "./runner.js";

const runner = new Runner();
const chunk = new Chunk(12, 12);

// ==== Window ==== //

window.onload = () => {
	init();
}

window.onresize = () => {
	Display.updateCanvasSize();
}

// ==== Init ==== //

const init = function () {
	initDisplay();
	initRunner();

	const cell = new CellPowder();
	cell.ID = 1;

	chunk.setCell(cell, 10, 0);
	chunk.setCell(cell, 10, 1);
	chunk.setCell(cell, 10, 2);
	chunk.setCell(cell, 10, 3);
	chunk.setCell(cell, 10, 4);
	chunk.setCell(cell, 10, 5);
	chunk.setCell(cell, 10, 6);
	chunk.setCell(cell, 10, 7);
	// chunk.setCell(cell, 10, 8);

	runner.start();
}

const initDisplay = function () {
	Display.linkCanvas( document.querySelector("canvas") );
	Display.updateCanvasSize();
}

const initRunner = function () {
	runner.loopFunc = loop;
}

// ==== Loop ==== //

const loop = function () {
	update();
	draw();
}

const update = function () {
	if (runner.ticks % 4 == 0)
		chunk.update();
}

const draw = function () {
	Display.clearScreen();

	// Display.context.fillStyle = "#0000ff";
	// Display.context.fillRect(10, 10, 10, 10);

	Display.context.save();
	Display.context.scale(10, 10);

	chunk.drawPngLike();
	chunk.draw();
	chunk.drawBorders();

	Display.context.restore();

	Display.context.fillStyle = "#000000";
	Display.context.fillText("FPS: " + Math.floor(runner.FPS), 0, 10);
}