<template>
	<Layout id="login_main" class="layout">
		<div class="login-content">
			<Card style="">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<a href="#" slot="extra">
					<Icon type="qr-scanner"></Icon>
					二维码登录
				</a>
				<Form ref="formInline" :model="formInline" :rules="ruleInline" style="margin-top: 10px" @submit.native.prevent>
					<FormItem prop="user">
						<Input type="text" v-model="formInline.user" placeholder="用户名" clearable>
						<Icon type="person" slot="prepend" style="width:20px;font-size:16px"></Icon>
						</Input>
					</FormItem>
					<FormItem prop="password">
						<Input v-bind:type="pwdType" v-bind:icon="pwdIcon" v-model="formInline.password" placeholder="密码" @on-click="triggerPwd">
						<Icon type="locked" slot="prepend" style="width:20px;font-size:16px"></Icon>
						</Input>
					</FormItem>
					<FormItem>
						<Button type="primary" :loading="loading" @click="beforeSubmit('formInline')" long>
                            <span v-if="!loading">登录</span>
                            <span v-else>Loading...</span>
                        </Button>
					</FormItem>
				</Form>
				<p class="login-tip">还没有账号?
					<a href="#/reg">立即注册</a>
				</p>
			</card>
		</div>
	</layout>
</template>

<script>
	var Cookies=require("js-cookie");
	export default {
		name: 'Login',
		data() {
			return {
				loading: false,
				showPwd: false,
				pwdType: 'password',
				pwdIcon: 'eye',
				formInline: {
					user: '',
					password: ''
				},
				ruleInline: {
					user: [{
						required: true,
						message: '用户名必填',
					}],
					password: [{
						required: true,
						message: '确认密码必填'
					}]
				}
			}
		},
		methods: {
			reset(name) {
				this.$refs[name].resetFields();
				this.loading = false;
			},
			beforeSubmit(name) {
				var self = this;
				this.$refs[name].validate(function(valid) {
					if(valid) {
						self.loading = true;
						//						this.$Message.success('Success!');
						self.login();
					} else {
						this.$Message.error('Fail!');
						self.loading = false;
					}
				})
			},
			login() {
				var self = this;
				//self.$Message.success('登录成功');
				//self.loading = false;
				//var data = {
				//	name: '超级管理员',
				//	avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
				//	isAdmin:true
				//}
				//Cookies.set('currentUser', data);
				//self.$router.push({
				//	path: "/main"
				//});
				$.postDigest(rootUrl + "/auth/login", this.formInline.user, this.formInline.password).done(function(data, textStatus, jqXHR) {
					self.$Message.success('登录成功');
					self.loading = false;
					Cookies.set('currentUser',data);
					self.$router.push({path:"/main"});
				}).fail(function(jqXHR, textStatus, errorThrown) {
					self.$Message.error('用户名或密码错误');
					self.loading = false;
				});
			},  
			triggerPwd: function() {
				if(this.showPwd) {
					this.pwdType = 'password';
					this.pwdIcon = 'eye';
				} else {
					this.pwdType = 'text';
					this.pwdIcon = 'eye-disabled';
				}
				this.showPwd = !this.showPwd;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.layout {
		width: 100%;
		height: 100%;
		background-image: url(../assets/login_bg.jpg);
		background-size: cover;
		background-position: center;
		position: relative;
	}
	
	.login-content {
		position: absolute;
		right: 160px;
		top: 50%;
		-webkit-transform: translateY(-60%);
		transform: translateY(-60%);
		width: 300px;
	}
	
	.login-tip {
		font-size: 10px;
		text-align: right;
		color: #c3c3c3;
	}
</style>