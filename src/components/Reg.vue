<template>
	<div id="register">
		<header>
			<div class="container">
				<a href="#/login">
					<img src="../assets/logo.png" class="logo" />
				</a>
				<div class="right">
					<a href="#/login">
						已有账号,立即登录
					</a>
				</div>
			</div>

		</header>
		<div class="bg">
			<div class="reg-content">
				<Card>
					<h2 slot="title">用户注册</h2>
					<Row type="flex" justify="center">
						<Col span="18">
						<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
							<FormItem label="用户名" prop="userName">
								<Input v-model="formValidate.userName" placeholder="用户名"></Input>
							</FormItem>
							<FormItem label="密码" prop="password">
								<Input v-model="formValidate.password" type="password" placeholder="密码"></Input>
							</FormItem>
							<FormItem label="确认密码" prop="confirmPwd">
								<Input v-model="formValidate.confirmPwd" type="password" placeholder="确认密码"></Input>
							</FormItem>
							<FormItem label="手机号" prop="mobile">
								<Input v-model="formValidate.mobile" placeholder="手机号"></Input>
							</FormItem>
							<FormItem label="短信验证码" prop="verifyCode">
								<Row type="flex" justify="space-between" :gutter="8">
									<Col span="14" :style="{'flex-shrink': 1}">
										<Input v-model="formValidate.verifyCode" placeholder="短信验证码"></Input>
									</Col>
									<Col >
										<Button @click="sendSmsCode" v-bind:disabled="!sendable" :loading="sending">
										 	<span v-if="!sending">获取验证码</span>
	        								<span v-else>{{smsCodeText}}</span>
										</Button>
									</Col>
								</Row>
							</FormItem>
							<FormItem id="submitline">
								<Button type="primary" @click="handleSubmit('formValidate')" style="width:150px">提交</Button>
								<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;width:150px">重置</Button>
							</FormItem>
						</Form>
						</Col>
					</Row>
				</Card>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Reg',
		data() {
			const validateUsername = (rule, value, callback) => {
				var errors = [];
				$.ajax({
					url: rootUrl + "/user/checkNameDup/" + value,
					method: 'post',
					success: function(data) {
						if(data.result == 'success') {
							callback();
						} else {
							errors.push(data.msg);
							callback(errors);
						}
					},
					error: function() {
						errors.push('网络错误');
						callback(errors);
					}
				});
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value !== this.formValidate.password) {
					var errors = [];
					errors.push('两次输入的密码不一致')
					callback(errors);
				} else {
					callback();
				}
			};
			const validateTelephone = (rule, value, callback, options) => {
				if(!/^1[3,4,5,7,8]\d{9}$/.test(value)) {
					this.sendable = false;
					var errors = [];
					errors.push('手机号为11位数字');
					callback(errors);
				} else {
					this.sendable = true;
					callback();
				}
			};
			return {
				leftTime: 0,
				sendable: false,
				sending: false,
				smsCodeText: '获取验证码',
				formValidate: {
					userName: '',
					password: '',
					confirmPwd: '',
					mobile: '',
					verifyCode: ''
				},
				ruleValidate: {
					userName: [{
						required: true,
						message: '用户名必填',
						trigger: 'blur'
					}, {
						validator: validateUsername,
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码必须包含数字、大小写英文字母，6-32个字符',
						pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,32}$/
					}],
					confirmPwd: [{
						required: true,
						message: '确认密码必须包含数字、大小写英文字母,6-32个字符',
						pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,32}$/
					}, {
						validator: validatePassCheck,
					}],
					mobile: [{
						required: true,
						message: '手机号必填',
					}, {
						validator: validateTelephone
					}],
					verifyCode: [{
						required: true,
						message: '短信验证码为6位数字',
						pattern: /^\d{6}$/
					}],
				}
			}
		},
		methods: {
			sendSmsCode() {
				this.sendable = false;
				this.sending = true;
				var leftTime = 60;
				var self = this;
				self.smsCodeText = leftTime + 's后获取验证码';
				var sendInterval = setInterval(function() {
					self.smsCodeText = (--leftTime) + 's后获取验证码';
					if(leftTime == 0) {
						self.sendable = true;
						self.sending = false;
						self.smsCodeText = '获取验证码';
						window.clearInterval(sendInterval);
					}
				}, 1000);
			},
			handleSubmit(name) {
				var self = this;
				this.$refs[name].validate(function(valid) {
					if(valid) {
						self.register();
					} else {}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
				this.sendable = false;
			},
			register() {
				var self = this;
				$.ajax({
					url: rootUrl + "/user/register",
					method: 'post',
					data: this.formValidate,
					success: function(data) {
						if(data.result == 'success') {
							self.leftTime = 3;
							self.$Message.info({
								duration: 3,
								render: h => {
									return h('span', [
										'注册成功，', self.leftTime, 's后自动',
										h('a', {
											attrs: {
												href: '#/login'
											}
										}, ['跳转']),
										'至登录页'
									])
								}
							});
							var toLoginInterval = setInterval(function() {
								self.leftTime--;
								if(self.leftTime == 0) {
									window.clearInterval(toLoginInterval);
									self.$router.push({
										path: '/login'
									});
								}
							}, 1000);
						} else {
							self.$Message.success(data.msg);
						}
					},
					error: function() {
						self.$Message.error('网络错误');
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#register {
		width: 100%;
		height: 100%;
	}
	
	header {
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: rgba(23, 23, 23, .35);
		z-index: 1000;
		color: white;
	}
	
	.container {
		width: 980px;
		height: 100%;
		margin: 0 auto;
	}
	
	.container .logo {
		float: left;
		width: 50px;
		margin-top: 5px;
		border: none;
	}
	
	.container .right a {
		float: right;
		color: white;
		border: none;
		line-height: 60px;
	}
	
	.bg {
		width: 100%;
		height: 100%;
		background-image: url(../../static/images/reg_bg.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-background-size: cover;
		-o-background-size: cover;
		background-position: center 0;
		padding: 100px;
	}
	
	.reg-content {
		width: 700px;
		margin: 50px auto;
	}
</style>

<style lang="less">
	#register .reg-content {
		input,
		label,
		button {
			height: 40px;
			font-size: 13px;
		}
	}
	
	#register .reg-content label {
		line-height: inherit;
	}
</style>