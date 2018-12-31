
/**
 * Bootstraping.
 */
require('./bootstrap');

/**
 * Vue components.
 */
Vue.component('app', require('./vues/App.vue').default);
Vue.component('control-knob', require('./vues/components/ControlKnob.vue').default);

/**
 * Start the Vue app.
 */
const app = new Vue({
    el: '#app'
});
