class Graph {
	
	#x = 0;
	#node = document.getElementById('graph');
	#context = this.#node.getContext('2d');
	#lines = [];

	#maxValue = 40;  // microroentgen
	#stepWidth = 3;	 // px

	
	constructor() {
		this.#node.width = document.body.scrollWidth;
		this.#node.height = window.innerHeight - this.#node.getBoundingClientRect().top - 15;
		this.clear();
	}
	
	addLine(color, size) {
		const line = new GraphLine(0, this.#node.width, color, size, this.#context);
		this.#lines.push(line);
		return line;
	}
	
	drawLine(line, value) {
		const y = this.microroentgenToPx(value);
		line.draw(this.#x, y);
	}
	
	drawGridLine(fromX, fromY, toX, toY, color, size = 1) {
		const line = new GraphLine(fromX, fromY, color, size, this.#context);
		line.draw(toX, toY);
	}
	
	moveX() {
		this.#x += this.#stepWidth;
		if (this.#x >= this.#node.width) {
			this.clear();
		}			
	}
	
	microroentgenToPx(value) {
		return this.#node.height - this.#node.height * value / this.#maxValue;
	}

	clear() {
		this.#context.clearRect(0, 0, this.#node.width, this.#node.height);
		for (var value = 0; value <= this.#maxValue; value += 5) {
			if (value % 10 == 0) {
				var color = '#fff';
			} else {
				var color = '#333';
			}
			const y = this.microroentgenToPx(value);
			this.drawGridLine(0, y, this.#node.width, y, color);
		}
		for (var x = 0; x <= this.#node.width; x += this.#stepWidth * 30) {
			this.drawGridLine(x, 0, x, this.#node.height, '#333');
		}
		this.#x = 0;
		for (const line of this.#lines) {
			line.resetX();
		}
	}
}



class GraphLine {

	#x;
	#y;
	#color;
	#size;
	#context;
	
	
	constructor(x, y, color, size, context) {
		this.#x = x;
		this.#y = y;
		this.#color = color;
		this.#size = size;
		this.#context = context;
	}
	
	draw(x, y) {
		this.#context.lineWidth = this.#size;
		this.#context.strokeStyle = this.#color;
		this.#context.beginPath();
		this.#context.moveTo(this.#x, this.#y);
		this.#context.lineTo(x, y);
		this.#context.stroke();
		this.#context.closePath();
		this.#x = x;
		this.#y = y;
	}
	
	resetX() {
		this.#x = 0;
	}
}
