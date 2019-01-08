
/**
 * Vuex getters should be used to retrieve items from the store,
 * rather than directly referencing the store state.
 */

export const getWebAudio = (state) => state.webAudio;
export const getContext = (state) => state.webAudio.context;
export const getGainNode = (state) => state.webAudio.gainNode;
export const getFilterNode = (state) => state.webAudio.filterNode;
export const getSounds = (state) => state.sounds;
export const getKeyboard = (state) => state.keyboard;
