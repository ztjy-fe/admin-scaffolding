<template>
	<div class="login-container">
		<el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
			<h3 class="title">szy-admin</h3>
			<el-form-item prop="username" class="login-form-item">
				<i class="fa fa-user"></i>
				<el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" class="login-form-input" />
			</el-form-item>

			<el-form-item prop="password" class="login-form-item">
				<i class="fa fa-lock"></i>
				<el-input name="password" :type="pwdType" v-model="loginForm.password" autoComplete="on"
				placeholder="密码" class="login-form-input" @keyup.enter.native="submitForm('loginForm')"/>
				<i class="fa fa-eye" :class="{'fa-eye-slash': !pwdType}" @click='showPwd'></i>
			</el-form-item>

			<div class="buttom-btn">
				<el-button type="primary" @click="submitForm('loginForm')" :loading="loading">登录</el-button>
				<el-button @click="resetForm('loginForm')">重置</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'login',
	data () {
		return {
			loginForm: {
				username: 'admin',
				password: 'admin'
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
				password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
			},
			loading: false,
			pwdType: 'password'
		}
	},
	methods: {
		...mapActions({
			login: 'User/login'
		}),
		showPwd () {
			if (this.pwdType === 'password') {
				this.pwdType = ''
			} else {
				this.pwdType = 'password'
			}
		},
		resetForm (formName) {
			// this.$refs[formName].resetFields()
			this.loginForm.username = ''
			this.loginForm.password = ''
		},
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.loading = true
					this.login(this.loginForm).then(() => {
						this.loading = false
						this.$router.push({ path: '/' })
					}).catch(() => {
						this.loading = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.login-container {
		height: 100vh;
		background-color: #2d3a4b;

		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 410px;
			padding: 35px;
			margin: 200px auto;

			.title{
				font-size: 26px;
				font-weight: 400;
				color: #eee;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}

			.login-form-item {
				border: 1px solid rgba(255, 255, 255, 0.1);
				background: rgba(0, 0, 0, 0.1);
				border-radius: 5px;
				color: #454545;

				.el-form-item__content{
					display: flex;
					align-items: center;
				}
			}

			.login-form-input {
				display: inline-block;
				height: 47px;
				width: 80%;

				.el-input__inner{
					background: transparent !important;
					border: 0px;
					-webkit-appearance: none;
					border-radius: 0px;
					color: #eee;
					padding: 12px 5px 12px 15px;
					height: 47px;

					&:-webkit-autofill {
						-webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
						-webkit-text-fill-color: #fff !important;
					}
				}
			}

			.fa-user,
			.fa-lock,
			.fa-eye{
				padding-left: 15px;
				padding-right: 5px;
				color: #889aa4;
				width: 38px;
				font-size: 18px;
				display: inline-block;
				vertical-align: middle;
			}

			.fa-eye{
				padding-left: 5px;
				padding-right: 15px;
				cursor: pointer;
			}

			.buttom-btn{
				display: flex;
				justify-content: space-between;

				.el-button{
					width: 40%;
				}
			}
		}
	}
</style>
