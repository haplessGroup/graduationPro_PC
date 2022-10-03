<template>
	<el-container>
		<!-- elementplus -->
		<el-main style="padding: 0;">
			<!-- 背景图 -->
			<div class="background">
				<img :src="loginBg" class="imgSrc">
			</div>
			<!-- 固定客服 -->
			<div class="kefu" @click="showKeFu">
				<img src="../../assets/kefu.png" style="width: 30px;height: 30px;">
				<div>客服</div>
			</div>
			<div style="margin-top: 10%;">
				<!-- class="animate__animated animate__bounceInLeft" -->
				<div style="font-size: 30px;color:white ;text-align: center;" >
						"零数据"分析平台
				</div>
				<div id="card">
					<div id="tit">
						欢迎登录
					</div>
					<!-- 分割线 -->
					<el-divider></el-divider>
					<el-form style="margin-top: 30px;">
						<el-form-item label="账号" style="width: 300px;margin: 0 auto;">
							<el-input v-model="loginForm.usernumber" />
						</el-form-item>
						<el-form-item label="密码" style="width: 300px;margin: 20px auto 0 auto;">
							<!-- @keyup.enter 按下回车触发登录事件 -->
							<el-input @keyup.enter="login" show-password type="password" v-model="loginForm.password" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" style="width: 200px;margin:30px auto 0 auto;" @click="login">登录</el-button>
						</el-form-item>
					</el-form>
					<div style="font-size: 10px;color: #00BFFF;text-align: center;margin-top: 10px;">
						<span @click="gotoRegit" style="cursor: pointer;">注册账号</span>
						<span @click="gotoFindPassword" style="cursor: pointer;"> | 忘记密码</span>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import { ElMessage,ElMessageBox} from 'element-plus'
	// 请求后端的第三方库
	import axios from 'axios'
	// mapMutations是vuex（状态管理）的一个方法，作用是调用vuex中自定义的方法
	import { mapMutations } from 'vuex'
	export default {
		data(){
			return{
				loginForm:{
					usernumber:'',
					password:'',
				},
				userInfo:[],
				// 登录凭证
				usertoken:'',
				// 背景图片
				loginBg:require('@/assets/bg.jpg'),
			}
		},
		methods:{
			// setuserInfo就是在vuex中自定义的方法
			...mapMutations(['setuserInfo']),
			showKeFu(){
				ElMessageBox.alert('暂不支持线上客服,请添加客服QQ:2498459886', '客服', {
				    confirmButtonText: '我知道了',
				})
			},
			// 跳转到注册界面
			gotoRegit(){
				this.$router.push("/Registration")
			},
			login(){
				// 后端接口路径
				const path="http://127.0.0.1:5000/login"
				if(this.loginForm.usernumber==='' || this.loginForm.password===''){
					 ElMessage.error('账号或者密码不能为空！')
				}else{
					// console.log(this.loginForm)
					// axios发送post请求
					axios({
						url:path,
						method:"post",
						data:{'usernumber':this.loginForm.usernumber,"password":this.loginForm.password}
					}).then(res=>{
						console.log(res)
						if(res.data==="account faild"){
							ElMessage({
								showClose: true,
								message: '账号不存在或错误！',
								type: 'error',
							  })
						}
						else if(res.data==="password faild")
						{
							ElMessage({
								showClose: true,
								message: '密码错误！',
								type: 'error',
							})
						}else if(res.data==="Sorry，the database is wrong"){
							ElMessage({
								showClose: true,
								message: '抱歉~系统出了点问题呢,如有问题请联系客服人员QAQ！',
								type: 'error',
							})
						}else if(res.data.isloginallowed=='否' || res.data.accstatus=="禁用"){
							ElMessage({
								showClose: true,
								message: '抱歉,您的账号已被禁止登录,如有问题请联系客服~',
								type: 'error',
							})
						}else{
							this.usertoken=res.data.token
							// console.log(res)
							// 在浏览器本地存储token
							localStorage.setItem("usertoken",this.usertoken)
							ElMessage({
								showClose: true,
								message: '登录成功！',
								type: 'success',
							})
								  this.userInfo=[res.data.account,
								  res.data.accstatus,
								  res.data.identity,
								  res.data.nickname,
								  res.data.regitime,
								  res.data.userphone,
								  res.data.isloginallowed]
								  this.setuserInfo(this.userInfo)
								  // 三秒后跳转到首页
								  setTimeout(()=>{
									  this.$router.push('/home')
								  },3000)
						}
					},err=>{
						console.log(err)
					})
				}
			},
			gotoFindPassword(){
				// 路由的跳转方法
				this.$router.push('/findpassword')
			}
		},
		
	}
</script>

<style scoped>
	/* @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"); */
	*{
		margin: 0;
		padding: 0;
	}
	.kefu{
		/* 固定定位 */
		position: fixed;
		background-color: #ffffff;
		right: 30px;
		top:600px;
		width: 60px;
		height: 60px;
		text-align: center;
		border-radius: 20px;
		cursor: pointer;
	}
	.background {
	    width: 100%;
	    height: 100%;
	    /**宽高100%是为了图片铺满屏幕 */
	    z-index: -1;
	   
	}
	 
	.imgSrc{
		height: 100%;
		width: 100%;
	}
	#card{
		width: 400px;
		height: 300px;
		background-color: white;
		/* 上，右 下 左 */
		margin: 20px auto 0 auto;
	}
	#tit{
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		padding-top: 10px;
	}
	/* 群组选择器 */
	html,body{
		height: 100%;
	}
</style>
