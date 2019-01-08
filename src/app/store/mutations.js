
/**
 * Vuex mutations should be used to update items in the store,
 * rather than directly manipulating the store state.
 */

export const setupWebAudio = (state) => {
    let context = new (window.AudioContext || window.webkitAudioContext)(),
        gainNode = context.createGain(),
        filterNode = context.createBiquadFilter();

    gainNode.gain.value = 0.2;
    filterNode.type = "lowpass";
    
    gainNode.connect(filterNode);
    filterNode.connect(context.destination);

    state.webAudio.context = context;
    state.webAudio.gainNode = gainNode;
    state.webAudio.filterNode = filterNode;
};

export const setSounds = (state, payload) => state.sounds[payload.frequency] = payload.sounds;
export const stopSounds = (state, frequency) => state.sounds[frequency].forEach(sound => sound.stop(0.1));

export const setKeyboard = (state, keyboard) => state.keyboard = keyboard;
