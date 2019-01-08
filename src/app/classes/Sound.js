
/**
 * Sound class for creating oscillator nodes and to play and stop sounds. 
 * That way we'll be able to call the Sound multiple times.
 */
export default class Sound {
    constructor({ context, gainNode }) {
        this.context    = context;
        this.oscillator = this.context.createOscillator();

        this.oscillator.connect(gainNode);
    }

    play(frequency) {
        this.oscillator.frequency.value = frequency;
        this.oscSettings(frequency);

        this.oscillator.start(this.context.currentTime);
    }

    oscSettings(detune = 0, waveType = 'sine') {
        this.oscillator.detune.value = detune;
        this.oscillator.type = waveType;
    }

    stop(fade = 0.2) {
        this.oscillator.stop(this.context.currentTime + fade);
    }
}
