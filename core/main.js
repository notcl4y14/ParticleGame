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

	const cell = new Cell();
	cell.ID = 1;

	chunk.setCell(cell, 10, 10);

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

const update = function () {}

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