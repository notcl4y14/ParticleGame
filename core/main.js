import Brush from "../common/cellular/brush.js";
import CellPowder from "../common/cellular/cells/powder.js";
import Cursor from "../common/cellular/cursor.js";
import Water from "../content/cells/water.js";
import Cell from "./cellular/cell.js";
import Chunk from "./cellular/chunk.js";
import Display from "./display.js";
import Mouse from "./mouse.js";
import Runner from "./runner.js";

const runner = new Runner();
const chunk = new Chunk(64, 64);
const cursor = new Cursor();

const scale = 5;

// ==== Window ==== //

window.onload = () => {
	init();
}

window.onresize = () => {
	Display.updateCanvasSize();
}

window.onmousemove = (event) => {
	Mouse.x = event.x;
	Mouse.y = event.y;
}

window.onwheel = (event) => {
	cursor.width -= event.deltaY / 100;
	cursor.height -= event.deltaY / 100;

	if (cursor.width < 1) {
		cursor.width = 1;
	}

	if (cursor.height < 1) {
		cursor.height = 1;
	}
}

window.onmousedown = (event) => {
	Mouse.setButton(event.button, true);
}

window.onmouseup = (event) => {
	Mouse.setButton(event.button, false);
}

window.onkeydown = (event) => {
	const key = event.code;

	if (key.substring(0, 5) == "Digit") {
		const digit = key[5];
		cursor.setCellByID(parseInt(digit));
	}
}

// ==== Init ==== //

const init = function () {
	initDisplay();
	initRunner();

	const cell = new CellPowder();
	cell.ID = 1;

	cursor.primaryCell = new Water().init();

	// chunk.setCell(cell, 10, 0);
	// chunk.setCell(cell, 10, 1);
	// chunk.setCell(cell, 10, 2);
	// chunk.setCell(cell, 10, 3);
	// chunk.setCell(cell, 10, 4);
	// chunk.setCell(cell, 10, 5);
	// chunk.setCell(cell, 10, 6);
	// chunk.setCell(cell, 10, 7);
	// chunk.setCell(cell, 10, 8);

	// Brush.fillRect(chunk, 10, 10, 10, 10);

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
	if (runner.ticks % 2 == 0)
		chunk.update();

	cursor.x = Math.round(Mouse.x / scale - cursor.width / 2);
	cursor.y = Math.round(Mouse.y / scale - cursor.height / 2);

	if (Mouse.isButtonDown(0))
		cursor.fill(chunk);

	if (Mouse.isButtonDown(2))
		cursor.fillAlt(chunk);
}

const draw = function () {
	Display.clearScreen();

	// Display.context.fillStyle = "#0000ff";
	// Display.context.fillRect(10, 10, 10, 10);

	Display.context.save();
	Display.context.scale(scale, scale);

	chunk.drawPngLike();
	chunk.draw();
	chunk.drawBorders();

	cursor.draw();

	Display.context.restore();

	Display.context.fillStyle = "#000000";
	Display.context.fillText("FPS: " + Math.floor(runner.FPS), 0, 10);
}