class Measurement {

	#node;
	#graphLine;
	#length;
	
	#countsPerImpulse = 16;
	#countsPerMicroroentgen = 2.1;

	
	constructor(elementId, graphLine, length = 0) {
		this.#node = document.getElementById(elementId);
		this.#graphLine = graphLine;
		this.#length = length;
	}
	
	setValue(value) {
		App.view.updateValue(this.#node, Math.round(value));
	}

	getDeviation(impulseTimes) {
		return Math.round(100 / Math.sqrt(this.getLength(impulseTimes) * this.#countsPerImpulse));
	}

	getLength(impulseTimes) {
		return this.#length;
	}

	update(impulseTimes) {
		const length = this.getLength(impulseTimes);
		const lastImpulse = impulseTimes.length - 1;
		const firstImpulse = lastImpulse - length;
		if (firstImpulse >= 0 && lastImpulse > firstImpulse) {
			const interval = impulseTimes[lastImpulse] - impulseTimes[firstImpulse];
			const counts = length * this.#countsPerImpulse / (interval / 1000);
			const microroentgen = counts / this.#countsPerMicroroentgen;
			this.setValue(microroentgen);
			App.counter.graph.drawLine(this.#graphLine, microroentgen);
		}
	}
}


class InfiniteMeasurement extends Measurement {
	
	constructor(textId, graphLine) {
		super(textId, graphLine);
	}

	getLength(impulseTimes) {
		return impulseTimes.length - 1;
	}
}
