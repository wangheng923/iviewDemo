<template>
	<Layout :style="{height:'100%'}">
		<Sider hide-trigger :style="{background: 'rgb(73, 80, 96)', width:'200px'}">
			<div class="logo-con"><img src="https://iview.github.io/iview-admin/dist/9f35d093728efc834cf6f8b15fd17eea.jpg"> <img src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABbCAYAAAAcNvmZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnhJREFUeNrs3U9LFGEcwPGf7ebaYWGhCBLCPQaRbNFd9w2YHrwF5dGTBtG1vIpit45l9AJ8BbmetQi6qCdB2EMprH/AXFzrN/qgo+2Ms+Mz0+P2/cLDoM4M8uHh2XkOy4gQEV2qjjgXPZiqDeqhT0dJR9GM/6GKjpqOBR1z318W1hLBVuCCHl7reK6jwDw9wZ9Q9Io1bIUeN9AgB6MPKXotNraZzTNmNlN4HnRZwb+1jG2g5826TBbAr4VcOAN0yx1NUJ2opcjYZo1m6YgP/j4Stu+pg+JXUsc3UWY2Tx12GjMTNxSb5cPecjIYiG12hsxqez0Lm9l9+FitPwybRz3L6WrRH4RdhCe5wP6H2AQ22AS2u2Wt3m3068XnbNwQmS8eH329KnfJk/udks91OAXUO711hWf2rT2RgdUzv/KQnz7KOQfdHstIriHSvevDvs6aTWCDTWCDDTa1Mfbm6aZm+WfDSZyVHw2HsT/3RDtv6Y7Ifubkx09f6lLdPnQKemf/t0xWfjm8XV+5KVLNi+TrwefUM39t1T3o4Y+7cu92puklA7rp8XaZUWejDaRlvY8H7i720ZToPB4xZtLi+kHTvz2+m7VyHz4g+YAksMEmsMEGm8AGm8AGm8AGG2wCG2wCG2ywCWywCWywCWywwSawwSawwQabwAabwAabwE637FX4J5fWD+RdxHOrW4dgXybv21+ufgOMZQRsAhvstmoN7JSg/W9pAjvZ5lhG0msW7HSqnH85ENjJ9YKnkZSgm73yCmz7fVDotzxnpwM9wqYmnaVjhB1kwk8dOh4GLR3+sljF3oJ7G5bZsJdtXoRdxrG1LTgR/RFgAEIioEX14WSDAAAAAElFTkSuQmCC" style="display: none;"></div>
			<Menu active-name="1-2" theme="dark" width="200" :open-names="['1']">
				<div v-if="isAdmin">
					<MenuItem name="userManager">
					<Icon type="person"></Icon>
					人员管理
					</MenuItem>
					<MenuItem name="roleManager">
					<Icon type="happy"></Icon>
					角色管理
					</MenuItem>
					<MenuItem name="authorityManager">
					<Icon type="locked"></Icon>
					权限管理
					</MenuItem>
					<MenuItem name="noticeManager">
					<Icon type="android-notifications"></Icon>
					公告管理
					</MenuItem>
				</div>
				<div v-else>
					<Submenu name="1">
						<template slot="title">
							<Icon type="ios-navigate"></Icon>
							个人中心
						</template>
						<MenuItem name="1-1">Option 1</MenuItem>
						<MenuItem name="1-2">Option 2</MenuItem>
						<MenuItem name="1-3">Option 3</MenuItem>
					</Submenu>
					<Submenu name="2">
						<template slot="title">
							<Icon type="ios-keypad"></Icon>
							Item 2
						</template>
						<MenuItem name="2-1">Option 1</MenuItem>
						<MenuItem name="2-2">Option 2</MenuItem>
					</Submenu>

				</div>
			</Menu>
		</Sider>

		<Layout :style="{'min-width':'900px'}">
			<div class="main-header">
				<div class="menu-switch">
					<Button type="text"><Icon type="navicon" :size="30"></Icon></Button>
				</div>
				<div class="layout-nav">
					<div class="nav-tools">
						<Tooltip :content="unReadMsgTip" placement="bottom">
							<Badge dot>
								<Avatar icon="email" />
							</Badge>
						</Tooltip>
					</div>

					<div class="current-login-user">
						<Dropdown style="margin-left: 20px" @on-click="handleNavMenu">
							<a href="javascript:void(0)">
								{{currentUserName}}
								<Icon type="arrow-down-b"></Icon>
							</a>
							<DropdownMenu slot="list">
								<DropdownItem name="selfCenter">
									<Icon type="person"></Icon>个人中心</DropdownItem>
								<DropdownItem name="voice">
									<Icon type="mic-a"></Icon>语音识别</DropdownItem>
								<DropdownItem name="logout" :style="{color:'red'}" divided>
									<Icon type="log-out"></Icon>退出登录</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<Avatar icon="person" :src="currentUserAvatar" />
				</div>
			</div>
			<Layout :style="{padding: '0 24px 24px'}">
				<Breadcrumb :style="{margin: '24px 0'}">
					<!--<BreadcrumbItem v-for="item in breadcrumbItems">{{item}}</BreadcrumbItem>-->
				</Breadcrumb>
				<router-view/>
			</Layout>
		</Layout>
	</Layout>

</template>

<script>var Cookies = require("js-cookie");
export default {
	data() {
		return {
			currentUserName: '',
			currentUserAvatar: '',
			unReadMsgTip: '',
			isAdmin: false,
			breadcrumbItemNames: []
		}
	},
	computed: {},
	methods: {
		init() {
			this.currentUserName = Cookies.getJSON('currentUser').name;
			this.currentUserAvatar = Cookies.getJSON('currentUser').avatar;
			this.isAdmin = Cookies.getJSON('currentUser').account === 'admin';
			this.unReadMsgTip = '您有3条新消息';
			var path = this.$router.currentRoute.fullPath;
			var relativePath = path && path.substring(path.indexOf('home'));
			var breadcrumbItems = relativePath.split('/');
			var routers = this.$router.options.routes;
			for(var i = 0; i < breadcrumbItems.length; i++) {
				for(var j = 0; j < routers.length; j++) {
					if(routers[j].path.endsWith(breadcrumbItems[i])) {
//						this.breadcrumbItemNames.push(routers[j].meta.displayName);
					}
				};
			}

		},
		handleNavMenu(menuName) {
			switch(menuName) {
				case 'logout':
					Cookies.remove('currentUser');
					this.$router.push({
						name: 'login'
					});
					break;
				case 'selfCenter':
					this.$router.push({
						name: 'selfCenter'
					});
					break;
				case 'voice':
					this.$router.push({
						name: 'voiceOcr'
					});
					break;
				default:
					break;
			}
		}
	},
	mounted() {
		this.init();
	}

}</script>

<style>/*.ivu-dropdown-item>i {
		margin-right: 6px;
	}*/

.logo-con {
	padding: 8px;
	background: rgb(73, 80, 96);
	text-align: center;
}

.logo-con img {
	height: 44px;
	width: auto;
}

.main-header {
	height: 60px;
	box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
	background-color: #FFFFFF;
}

.menu-switch {
	width: 60px;
	height: 60px;
	padding: 8px;
	display: inline-block;
}

.layout-nav {
	height: 60px;
	padding: 14px;
	display: inline-block;
	float: right;
}

.nav-tools,
.current-login-user {
	display: inline-block;
	margin-right: 10px;
}</style>