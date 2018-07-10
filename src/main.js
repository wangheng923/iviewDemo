// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import Cookies from 'js-cookie';

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(iView);

router.beforeEach((to, from, next) => {
	if(!Cookies.get('currentUser') && to.name !== 'login' && to.name !== 'reg') { // 判断是否已经登录且前往的页面不是登录页
		next({
			name: 'login'
		});
	} else if(Cookies.get('currentUser') && (to.name === 'login'|| to.path === '/' || to.path === '/login')) { // 判断是否已经登录且前往的是登录页
		next({
			name: 'home'
		});
	}
	else{
		next();
	}
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})