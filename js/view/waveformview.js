class WaveformView {

	#node = document.getElementById('waveform');
	#context = this.#node.getContext('2d');

	#width;
	#centerY;
	#sample = 0;
	#x = 0;

	#scale = 150;
	

	constructor() {
		this.#node.style.display = 'none';
		this.#node.width = document.body.scrollWidth;
		this.#node.height = window.innerHeight - this.#node.getBoundingClientRect().top - 15;
		this.#context.lineWidth = 1;
		this.#context.beginPath();
		this.#context.moveTo(0, this.#centerY);
		this.#context.strokeStyle = 'lime';
		this.#width = this.#node.width;
		this.#centerY = this.#node.height / 2;
	}

	drawSample(volume) {
		this.#sample++;
		if (this.#sample % this.#scale !== 0) {
			return;
		}
		this.#x++;
		if (this.#x > this.#width) {
			this.#x = 0;
			this.#context.clearRect(0, 0, this.#width, this.#centerY * 2);
			this.#context.stroke();
			this.#context.closePath();
			this.#context.beginPath();
			this.#context.moveTo(this.#x, this.#centerY);
		}
		const y = this.#centerY + volume * this.#centerY;
		this.#context.clearRect(this.#x + 1, 0, 1, this.#centerY * 2);
		this.#context.lineTo(this.#x, y);
		this.#context.stroke();
	}
}
