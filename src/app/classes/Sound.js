
/**
 * Sound class for creating oscillator nodes and to play and stop sounds. 
 * That way we'll be able to call the Sound multiple times.
 */
export default class Sound {
    constructor({ context, filterNode, env }) {
        this.context    = context;
        this.env        = env;
        this.oscillator = this.context.createOscillator();
        this.gainNode   = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(filterNode);
    }

    oscSettings({ detune, wave }) {
        this.oscillator.detune.value = detune;
        this.oscillator.type = wave;

        return this;
    }

    play(frequency) {
        this.oscillator.frequency.value = frequency;

        this.gainNode.gain.cancelScheduledValues(this.context.currentTime);
        this.gainNode.gain.setValueAtTime(0.001, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(this.env.vol, this.context.currentTime + this.env.attack);

        this.oscillator.start(this.context.currentTime);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + this.env.release);

        this.oscillator.stop(this.context.currentTime + this.env.release);
    }
}
