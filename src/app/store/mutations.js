
import { forOwn } from 'lodash';

/**
 * Vuex mutations should be used to update items in the store,
 * rather than directly manipulating the store state.
 */

export const setupWebAudio = (state) => {
    let context = new (window.AudioContext || window.webkitAudioContext)(),
        filterNode = context.createBiquadFilter(),
        masterGainNode = context.createGain();

    filterNode.type = "lowpass";
    masterGainNode.gain.value = 0.3;

    filterNode.connect(masterGainNode);
    masterGainNode.connect(context.destination);

    state.webAudio.context = context;
    state.webAudio.masterGainNode = masterGainNode;
    state.webAudio.filterNode = filterNode;
}

export const setupKeyboard = (state, keyboard) => {
    state.keyboard = new QwertyHancock({
        id: 'Keyboard',
        width: 600,
        height: 150,
        octaves: 2,
        startNote: 'C3',
        blackKeyColour: '#3d4852',
        activeColour: '#a0f0ed'
    });
}

export const stopAllSounds = (state) => {
    forOwn(state.sounds, (soundArray, frequency) => {
        soundArray.forEach(sound => sound.stop());
    });
}
