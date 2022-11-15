class AudioInput {

	#outputChannels = 1;
	#inputChannels = 1;
	#bufferSize = 4096;

	#microphoneStream;
	#processor;


	start() {
		const audioContext = new AudioContext();
		audioContext.createBuffer(this.#inputChannels, this.#bufferSize, audioContext.sampleRate);
		this.#processor = audioContext.createScriptProcessor(this.#bufferSize, this.#inputChannels, this.#outputChannels);
		const output = audioContext.createGain();
		output.gain.value = 0;
		output.connect(audioContext.destination);
		this.#processor.addEventListener('audioprocess', this.process);
		navigator.mediaDevices.getUserMedia({ audio: true, video: false })
			.then(stream => {
				const microphone = audioContext.createMediaStreamSource(stream);
				microphone.connect(this.#processor);
				this.#processor.connect(output);
				this.#microphoneStream = stream;
			})
			.catch(error => {
				alert(error)
			});
	}

	pause() {
		this.#microphoneStream.getTracks().forEach(track => track.stop());
		this.#processor.removeEventListener('audioprocess', this.process);
	}

	process(audioProcessingEvent) {
		const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
		App.sensor.process(inputData);
	}
}
