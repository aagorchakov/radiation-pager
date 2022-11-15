class Controller {

	constructor() {
		document.getElementById('graph').onclick = this.#startMeasurement;
		document.getElementById('waveform').onclick = this.#startMeasurement;
		document.getElementById('infinite-deviation').onclick = this.#reset;
		document.getElementById('short').onclick = this.#toggleWaveform;
		setInterval(this.#resetIfInactive, 1000);
	}

	#startMeasurement() {
		if (App.sensor.isPause()) {
			App.counter.reset();
			App.sensor.start();
			App.view.startMeasurement();
		} else {
			App.sensor.pause();
			App.view.pauseMeasurement();
		}
	}

	#reset() {
		App.counter.reset();
		App.counter.clearMeasurements();
		App.counter.graph.clear();
	}

	#toggleWaveform() {
		const isGraphVisible = App.view.toggleGraph();
		App.sensor.drawWaveform = !isGraphVisible;
	}

	#resetIfInactive() {
		if (!App.sensor.isPause() && App.counter.isInactive()) {
			App.counter.reset();
		}
	}
}
