<template>
	<el-container>
		<el-main style="padding: 0;">
			<!-- 背景图 -->
			<div class="background">
				<img src="../../assets/bg.jpg" class="imgSrc">
			</div>
			<div style="margin-top: 30px;">
				<div 
					style="font-size: 30px;color:white ;text-align: center;" >
						“零数据”分析平台
				</div>
				<div id="card">
					<div id="tit">
						欢迎注册
					</div>
					<div id="" style="font-size: 15px;font-weight: bold;float: right;margin:-20px 300px 0 0;">
						已有帐号?<span style="color: #00BFFF;cursor: pointer;" @click="gotoLogin">直接登录</span>
					</div>
					<!-- 分割线 -->
					<el-divider></el-divider>
					<!-- 填写注册信息 -->
					<!-- display: inline-block 行内块 -->
					<div id="" style="display: inline-block;width: 700px;text-align: center;">
						<el-form style="padding: 20px 0 0 150px;width: 400px;" >
							<el-form-item label="登录账号:" style="width: 300px;font-weight: bold;">
								<el-input maxlength="20" v-model="registrationForm.account" />
							</el-form-item>
							<el-form-item label="设置密码:" style="width: 300px;font-weight: bold;">
								<el-input show-password maxlength="20" type="password" v-model="registrationForm.password" />
							</el-form-item>
							<el-form-item label="设置昵称:" style="width: 300px;font-weight: bold;">
								<el-input maxlength="20" v-model="registrationForm.nickname" />
							</el-form-item>
							<el-form-item label="用户电话:" style="width: 300px;font-weight: bold;">
								<el-input maxlength="11" v-model="registrationForm.userphone" />
							</el-form-item>
							<el-form-item label="用户身份证:" style="width: 300px;font-weight: bold;">
								<el-input maxlength="20" v-model="registrationForm.useridcard" />
							</el-form-item>
						</el-form>
					</div>
					<!-- 垂直分割线 -->
					<!-- direction---分割线的方向 -->
					<el-divider direction="vertical" style="height: 400px;margin-top: -20px;"/>
					<div style="display: inline-block;">
						<div style="margin-left: 30px;font-weight: bold;">
							数据分析平台注册帮助
						</div>
						<div id="que" style="line-height: 80px;color: #00BFFF;font-family: '宋体';cursor: pointer;">
							<div style="margin-left: 30px;">
								<!-- effect：小提示框的背景样式 -->
								<el-tooltip
									class="box-item"
									effect="dark"
									content="那你还不找回密码?"
									placement="bottom-end"
								  >
									<span>1、账号/手机提示已被注册怎么办?</span>
								</el-tooltip>
							</div>
							<div style="margin-left: 30px;">
								<el-tooltip
									class="box-item"
									effect="dark"
									content="当然是看看有没有信息填错了啊!"
									placement="bottom-end"
								  >
									<span>2、注册失败怎么办?</span>
								</el-tooltip>
								
							</div>
							<div style="margin-left: 30px;">
								<el-tooltip
									class="box-item"
									effect="dark"
									content="肯定是选择找回密码啊!"
									placement="bottom-end"
								>
									<span>3、已有账号忘记密码怎么办?</span>
								</el-tooltip>
							</div>
						</div>
					</div>
					<div style="margin:10px auto;width: 200px;">
						<el-button type="primary" style="width: 200px;" @click="Registration">确认注册</el-button>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import axios from 'axios'
	import { ElMessage,UploadProps } from 'element-plus'
	export default {
		data(){
			return{
				registrationForm:{
					account:'',
					password:'',
					nickname:'',
					userphone:'',
					useridcard:'',
					identity:'普通',
					accstatus:'正常',
					isloginallowed:'是',
					
				},
			}
		},
		methods:{
			Registration(){
				// 注册的后端接口
				const path="http://127.0.0.1:5000/registration"
				if(this.registrationForm.account==='' || this.registrationForm.password==='')
				{
					ElMessage({
						showClose: true,
						message: "登录账号或者密码为空了!",
						type: 'error',
					})
				}else if(this.registrationForm.nickname==='')
				{
					ElMessage({
						showClose: true,
						message: "请设置用户昵称!",
						type: 'error',
					})
				}else if(this.registrationForm.userphone==='' || this.registrationForm.useridcard==='')
				{
					ElMessage({
						showClose: true,
						message: "用户电话或者身份证为空了!",
						type: 'error',
					})
				}else{
					axios({
						url:path,
						method:'POST',
						data:this.registrationForm
					}).then(res=>{
						if(res.data==="Registration faild")
						{
							ElMessage({
								showClose: true,
								message: "注册失败!",
								type: 'error',
							})
						}else if(res.data==='Sorry，the database is wrong'){
							ElMessage({
								showClose: true,
								message: "抱歉，系统出错了呢，请稍后再试~QAQ~",
								type: 'error',
							})
						}else if(res.data==='info has been registrated'){
							ElMessage({
								showClose: true,
								message: "你的账号/昵称/电话/身份证已被注册，请重新填写后尝试哦~",
								type: 'error',
							})
							
						}else{
							ElMessage({
								showClose: true,
								message: "注册成功!",
								type: 'success',
							})
							this.$router.push('/login')
						}
					},err=>{
						ElMessage({
							showClose: true,
							message: err,
							type: 'error',
						})
					})
				}
			},
			gotoLogin(){
				this.$router.push('/login')
			},
		}
	}
</script>

<style scoped>
	/* @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"); */
	#card{
		width: 1400px;
		height: 600px;
		background-color: white;
		/* 居中实现 */
		margin: 0 auto;
	}
	#tit{
		text-align: left;
		font-size: 20px;
		font-weight: bold;
		padding-top: 20px;
		padding-left: 50px;
	}
	.background {
		width: 100%;
		height: 100%;
		/**宽高100%是为了图片铺满屏幕 */
		/* 某一部分的层级，默认是1或者0，-1就代表比其他的小，就是在其他的下面*/
		z-index: -1;
		/* 绝对定位 */
		position: absolute;
	}
	 
	.imgSrc{
		height: 100%;
		width: 100%;
	}
	.text-left{text-align: left;padding-left:30px;}
	  h3{padding-bottom:20px;}
	  .cust_btn30{padding-bottom:60px;padding-top:30px;}
	  .text_fise{font-size:16px;}
	  .text_fise>div{padding-bottom:20px;}
</style>