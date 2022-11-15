if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/serviceworker.js');
}


class App {

	static view = new View()
	static waveformView = new WaveformView()
	static sensor = new Sensor()
	static counter = new Counter()
	static controller = new Controller()

}

