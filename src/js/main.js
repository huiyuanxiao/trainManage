import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from './common/routerConfig';
Vue.use(VueRouter);
var App = Vue.extend({});
var router = new VueRouter();

routerConfig(router);


router.start(App, '#app');
