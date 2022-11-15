class Counter {

	graph = new Graph();

	#shortMeasurement;
	#longMeasurement;
	#infiniteMeasurement;

	#impulseTimes = [];

	#inactivityTimeout = 3000;


	constructor() {
		const shortMeasurementLine = this.graph.addLine('blue', 1);
		const longMeasurementLine = this.graph.addLine('lime', 2);
		const infiniteMeasurementLine = this.graph.addLine('red', 2);
		this.#shortMeasurement = new Measurement('short', shortMeasurementLine, 2);
		this.#longMeasurement = new Measurement('long', longMeasurementLine, 6);
		this.#infiniteMeasurement = new InfiniteMeasurement('infinite', infiniteMeasurementLine);
	}

	registerImpulse() {
		this.#impulseTimes.push(performance.now());
		if (this.#impulseTimes.length > 1) {
			this.graph.moveX();
			this.#shortMeasurement.update(this.#impulseTimes);
			this.#longMeasurement.update(this.#impulseTimes);
			this.#infiniteMeasurement.update(this.#impulseTimes);
			App.view.updateDeviation(this.#infiniteMeasurement.getDeviation(this.#impulseTimes));
		}
		App.view.blinkImpulse();
	}

	reset() {
		this.#impulseTimes = [];
		this.#shortMeasurement.setValue(0);
	}

	clearMeasurements() {
		this.#shortMeasurement.setValue(0);
		this.#longMeasurement.setValue(0);
		this.#infiniteMeasurement.setValue(0);
	}

	isInactive() {
		return performance.now() - this.#impulseTimes[this.#impulseTimes.length - 1] > this.#inactivityTimeout;
	}
}
