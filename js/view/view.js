class View {

	#graphNode = document.getElementById('graph');
	#waveformNode = document.getElementById('waveform');
	#measurementNode = document.getElementById('measurement');
	#deviationNode = document.getElementById('infinite-deviation');


	blinkImpulse() {
		this.#measurementNode.classList.add('blink');
		setTimeout(() => {
			this.#measurementNode.classList.remove('blink');
		}, 50);
	}

	startMeasurement() {
		this.#measurementNode.classList.add('enable');
	}

	pauseMeasurement() {
		this.#measurementNode.classList.remove('enable');
	}

	toggleGraph() {
		const hide = this.#graphNode.style.display !== 'none';
		if (hide) {
			this.#graphNode.style.display = 'none';
			this.#waveformNode.style.display = 'block';
		} else {
			this.#graphNode.style.display = 'block';
			this.#waveformNode.style.display = 'none';
		}
		return !hide;
	}

	updateDeviation(value) {
		this.#deviationNode.innerHTML = value + '%';
	}

	updateValue(node, value) {
		node.innerHTML = value;
	}
}
