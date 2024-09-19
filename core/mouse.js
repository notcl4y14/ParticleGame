export default class Mouse {

	static x = 0;
	static y = 0;
	static #buttons = [];

	static isButtonDown (button) {
		return this.#buttons[button];
	}

	static isButtonUp (button) {
		return !this.#buttons[button];
	}

	static setButton (button, value) {
		this.#buttons[button] = value;
	}

}