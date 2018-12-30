
/**
 * Bootstraping.
 */
require('./bootstrap');

/**
 * Vue components.
 */
Vue.component('app', require('./vues/App.vue').default);

/**
 * Start the Vue app.
 */
const app = new Vue({
    el: '#app'
});
