<template>
	<el-header style="padding: 0;">
		<!-- 自己封装的导航栏 -->
		<NaviBar></NaviBar>
	</el-header>
	<el-main>
		<!-- 步骤条 -->
		<div style="margin-top: 30px;">
			<el-steps :active="activenum" align-center>
				<el-step title="步骤1" description="验证身份" />
				<el-step title="步骤2" description="设置新密码" />
				<el-step title="步骤3" description="重置完成" />
			</el-steps>
		</div>
		<div>
			<div v-if="activenum===1" style="text-align: center;margin-top: 100px;">
				<div>
					<span style="font-weight: bold;">电话号码: </span>
					<el-input maxlength="11" v-model="userphone"  style="width: 250px;" placeholder="请输入注册时的电话号码"/>
				</div>
				<div style="margin-top: 20px;">
					<span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;原密码:&nbsp;</span>
					<el-input v-model="originpassword"  style="width: 250px;" placeholder="请输入原密码" show-password/>
				</div>
				<div id="findbtn1" style="margin-top: 30px;">
					<el-button type="primary" style="width: 200px;" @click="nextstep1">下一步</el-button>
				</div>
			</div>
			<div v-if="activenum===2" style="text-align: center;margin-top: 100px;">
				<div >
					<span style="font-weight: bold;">请输入新密码: </span>
					<el-input v-model="newpassword" style="width: 250px;" placeholder="请输入新密码" show-password=""></el-input>
				</div>
				<div id="findbtn2" style="margin-top: 30px;">
					<el-button type="primary" style="width: 200px;" @click="nextstep2">下一步</el-button>
				</div>
			</div>
			<div v-if="activenum===3" style="margin: 100px auto 0 auto;width: 400px;">
				<div style="font-family: '宋体';text-align: center;">
					<div>
						<img src="../../assets/success.png" style="width: 50px;height: 50px;margin-top: -20px;" >
					</div>
					<div>
						重新设置完成!将在{{timeout}}秒之后自动返回登录界面...
					</div>
				</div>
			</div>
		</div>
	</el-main>
	<el-footer style="padding: 0;margin-top: 200px;">
		<Footer></Footer>
	</el-footer>
</template>

<script>
	import NaviBar from '@/components/navibar.vue'
	import Footer from '@/components/footer.vue'
	import {ElMessage} from 'element-plus'
	import axios from 'axios'
	import {mapState} from 'vuex'
	export default{
		components:{
			NaviBar,
			Footer
		},
		computed:{
			// mapState是vuex（状态管理器）中的内置方法，作用是导入在状态管理器中自定义的对象，导入之后就可以在
			// 此页面中使用这个对象的值
			...mapState(["userInfo"])
		},
		data(){
			return{
				activenum:1,
				userphone:'',
				originpassword:'',
				newpassword:'',
				timeout:5
			}
		},
		methods:{
			nextstep1(){
				if(this.userphone==='' || this.originpassword==='' && this.activenum==1)
				{
					ElMessage({
						showClose: true,
						message: "请输入电话号码或者原密码!",
						type: 'error',
					})
				}else{
					const path="http://127.0.0.1:5000/verifypassword"
					// 验证身份证的接口请求
					axios({
						url:path,
						method:"post",
						data:{"userphone":this.userphone,"password":this.originpassword}
					}).then(res=>{
						console.log(res)
						if(res.data==="no result")
						{
							ElMessage({
								showClose: true,
								message: "电话号码不存在或者密码错误哦，仔细看看有没有错!",
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
					 const path="http://127.0.0.1:5000/updatepassword"
					 axios({
						 url:path,
						 method:"post",
						 data:{"newpassword":this.newpassword,"account":this.userInfo.account}
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
							 			this.$router.push('/login')
							 			this.clearTimer()
										localStorage.removeItem("usertoken")
							 		}else{
							 			this.timeron()
							 		}
							 	},1000)
							 	
							 }
						 }else if(res.data==='failed')
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
				// clearInterval是一个内置函数，作用是清除绑定在变量上的定时器
				clearInterval(this.timer)
				// 将timer设置为null的作用就是清除定时器
				this.timer=null
			},
		}
	}
</script>

<style>
</style>
