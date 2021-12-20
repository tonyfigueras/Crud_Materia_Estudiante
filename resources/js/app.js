require('./bootstrap');
require('admin-lte');
window.Vue = require('vue').default;

import VueRouter from 'vue-router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
//import {createApp} from 'vue';
//import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
//import 'vue-toast-notification/dist/theme-sugar.css';
import swal from "sweetalert2";
window.swal = swal;
//const app = createApp({});
//app.use(VueToast);

//import VueToast from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
//import "vue-toast-notification/dist/theme-sugar.css";
//const app = createApp({});
//app.use(VueToast);

Vue.use(Vuetify);
Vue.use(VueRouter);
//Vue.use(VueToast);

let routes = [
	{ path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/lesson', component: require('./components/Lesson/template.vue').default },
	{ path: '/student', component: require('./components/Student/template.vue').default },
    { path: '/student_lesson', component: require('./components/Student_Lesson/template.vue').default }
]

const router = new VueRouter({
	mode: 'history',
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: "exact-active",
})

const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify()
});
/*
window.Vue = require('vue').default;


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
});*/
