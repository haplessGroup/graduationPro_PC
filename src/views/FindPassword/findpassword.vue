<template>
	<el-container>
		<el-main style="padding: 0;">
			<!-- 背景图片 -->
			<div class="background">
				<!-- ：代表动态绑定，全写是v-bind -->
				<img :src="loginBg" class="imgSrc">
			</div>
			<div style="margin-top: 5%;">
				<div style="font-size: 30px;color:white ;text-align: center;">
						“零数据”分析平台
				</div>
				<div id="step" style="margin-top: 10px;">
					<div id="" style="padding-top: 30px;">
						<!-- align-center步骤条文字居中 -->
						<el-steps :active="activenum" align-center>
							<el-step title="步骤1" description="验证身份证" />
							<el-step title="步骤2" description="重置密码" />
							<el-step title="步骤3" description="完成" />
						</el-steps>
					</div>
					<div style="width: 600px;margin: 0 auto;">
						<div v-if="activenum==1" style="text-align: center;margin-top: 100px;">
							 <div>
								 <!-- v-model双向绑定值 -->
							 	<span style="font-weight: bold;">请输入身份证号: </span>
								<el-input maxlength="18" v-model="idcard"  style="width: 250px;"/>
							 </div>
							<div id="findbtn1" style="margin-top: 30px;">
								<el-button type="primary" style="width: 200px;" @click="nextstep1">下一步</el-button>
							</div>
						</div>
						<div v-if="activenum==2" style="text-align: center;margin-top: 100px;">
							<div>
							 	<span style="font-weight: bold;">请设置新的密码: </span>
								<el-input maxlength="18" v-model="newpassword"  style="width: 250px;"/>
							 </div>
							<div id="findbtn2" style="margin-top: 30px;">
								<el-button type="primary" style="width: 200px;" @click="nextstep2">下一步</el-button>
							</div>
						</div>
						<div v-if="activenum==3" style="margin-top: 100px;width: 400px;">
							<div style="margin: -20px 0 0 200px;font-family: '宋体';text-align: center;">
								<!-- 成功的小图标 -->
								<div>
									<img src="../../assets/success.png" style="width: 50px;height: 50px;margin-top: -20px;" >
								</div>
								<div>
									重新设置完成!将在{{timeout}}秒之后自动返回登录界面...
								</div>
							</div>
						</div>
					</div>
					<!-- 点击返回登录界面 -->
					<div style="color: #00BFFF;cursor: pointer;margin:100px auto 0 auto;width: 300px;" @click="gotoLogin">
						<div style="text-align: center;">
							返回登录>>
						</div>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
	
</template>

<script>
	import { ElMessage } from 'element-plus'
	import axios from 'axios'
	export default{
		data(){
			return{
				// 表示在第几步
				activenum:1,
				idcard:'',
				newpassword:'',
				timeout:5,
				timer:null,
				loginBg:require('@/assets/bg.jpg'),
			}
		},
		methods:{
			nextstep1(){
				if(this.idcard==='' && this.activenum==1)
				{
					ElMessage({
						showClose: true,
						message: "请输入身份证!",
						type: 'error',
					})
				}else{
					// 身份证校验接口
					const path="http://127.0.0.1:5000/findidcard"
					// 验证身份证的接口请求
					axios({
						url:path,
						method:"post",
						data:{"idcard":this.idcard}
					}).then(res=>{
						console.log(res)
						if(res.data==="IdCard is no exist")
						{
							ElMessage({
								showClose: true,
								message: "身份证号不存在哦，仔细看看有没有错!",
								type: 'error',
							})
						}else if(res.data==='ok'){
							this.activenum+=1
						}else{
							ElMessage({
								showClose: true,
								message: "抱歉QAQ,系统出错了呢~请耐心等待程序猿解决嗷!",
								type: 'error',
							})
						}
					})
				}
			},
			nextstep2(){
				if(this.newpassword==='' && this.activenum==2)
				{
					ElMessage({
						showClose: true,
						message: "请输入新密码!",
						type: 'error',
					})
				 }else if(this.newpassword !=='')
				 {
					 // 重置密码的接口
					 const path="http://127.0.0.1:5000/findpassword"
					 axios({
						 url:path,
						 method:"post",
						 data:{"newpassword":this.newpassword,"idcard":this.idcard}
					 }).then(res=>{
						 if(res.data==='ok')
						 {
							 this.activenum+=1
							 // 当activenum为3时，开启定时器
							 if(this.activenum==3){
							 	this.timer=setInterval(()=>{
							 		if(this.timeout==0)
							 		{
							 			// 设置时间为0之后执行的操作
							 			this.$router.push('/Login')
										// 调用清除计时器方法
							 			this.clearTimer()
							 		}else{
										// 倒计时方法
							 			this.timeron()
							 		}
							 	},1000)
							 	
							 }
						 }else if(res.data==='update failed')
						 {
							 ElMessage({
							 	showClose: true,
							 	message: "密码重置失败!",
							 	type: 'error',
							 })
						 }else{
							 ElMessage({
							 	showClose: true,
							 	message: "系统出错了呢~!",
							 	type: 'error',
							 })
						 }
					 })
				 }
				
			},
			timeron(){
				this.timeout-=1
			},
			// 清除定时器
			clearTimer(){
				clearInterval(this.timer)
				this.timer=null
			},
			gotoLogin(){
				this.$router.push('/login')
			}
		}
	}
</script>

<style>
	#step{
		background-color: white;
		width: 80%;
		height: 500px;
		margin: 0 auto;
	}
	.background {
	    width: 100%;
	    height: 100%;
	    /**宽高100%是为了图片铺满屏幕 */
	    z-index: -1;
	    position: absolute;
	}
	 
	.imgSrc{
		height: 100%;
		width: 100%;
	}
</style>
