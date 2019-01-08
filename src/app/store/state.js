
/**
 * Vuex state is where any app wide data should be defined.
 */
export default {
    webAudio: {
        context: {},
        filterNode: {},
        masterGainNode: {},
        osc1: {
            detune: 0,
            wave: 'sawtooth'
        },
        osc2: {
            detune: 0,
            wave: 'triangle'
        },
        env: {
            vol: 0.3,
            attack: 0.1,
            decay: 0.8,
            release: 0.1
        },
    },
    keyboard: {},
    sounds: {}
}
