class Sensor {

	#audioInput = new AudioInput();
	#impulseTimer = 0;
	#prevVolume = 0;
	#pause = true;
	
	drawWaveform = false;
	
	#volumeThreshold = 0.2;
	#impulseWidth = 6000;	// 100 ms


	start() {
		this.#pause = false;
		this.#audioInput.start();
	}

	pause() {
		this.#pause = true;
		this.#audioInput.pause();
	}

	isPause() {
		return this.#pause;
	}

	process(samples) {
		for (const volume of samples) {
			if (this.#impulseTimer > 0) {
				this.#impulseTimer++;
				if (this.#impulseTimer > this.#impulseWidth) {
					this.#impulseTimer = 0;
				}
			} else if (volume < this.#volumeThreshold && this.#prevVolume > this.#volumeThreshold) {
				this.#impulseTimer = 1;
				App.counter.registerImpulse();
			}
			this.#prevVolume = volume;

			if (this.drawWaveform) {
				App.waveformView.drawSample(volume);
			}
		}
	}
}
