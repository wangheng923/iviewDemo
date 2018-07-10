import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Reg from '@/components/Reg'
import Home from '@/components/Home'
import VoiceOcr from '@/components/VoiceOcr'
import SelfCenter from '@/components/SelfCenter'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '',
		component: Login
	}, {
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '/reg',
		name: 'reg',
		component: Reg
	}, {
		path: '/main',
		name: 'main',
		component: Main,
		redirect: '/main/home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: Home,
				meta: {
					displayName: '首页'
				}
			}, {
				path: 'voiceOcr',
				name: 'voiceOcr',
				component: VoiceOcr
			}, {
				path: 'selfCenter',
				name: 'selfCenter',
				component: SelfCenter
			}
		]
	}]
})