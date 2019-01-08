
/**
 * Vuex getters should be used to retrieve items from the store,
 * rather than directly referencing the store state.
 */

export const getWebAudio = (state) => state.webAudio;
export const getContext = (state) => state.webAudio.context;
export const getFilterNode = (state) => state.webAudio.filterNode;
export const getMasterGainNode = (state) => state.webAudio.masterGainNode;
export const getOsc1Settings = (state) => state.webAudio.osc1;
export const getOsc2Settings = (state) => state.webAudio.osc2;
export const getEnvSettings = (state) => state.webAudio.env;
export const getSounds = (state) => state.sounds;
export const getKeyboard = (state) => state.keyboard;
