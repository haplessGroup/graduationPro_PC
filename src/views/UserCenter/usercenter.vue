<template>
	<el-header style="padding:0;">
		<NaviBar></NaviBar>
	</el-header>
	<el-main style="padding:0;">
		
		<el-form style="width: 300px;margin: 30px auto 0 auto;">
			<el-form-item label="用户账号:" style="width: 300px;">
				<el-input v-model="userInfo.account" disabled />
			</el-form-item>
			<!-- 昵称和电话的数据不是直接从vuex中获取，而是赋值给data数据里面 -->
			<el-form-item label="用户昵称:" style="width: 300px;">
				<el-input v-model="userinfo.nickname" />
			</el-form-item>
			<el-form-item label="用户电话:" style="width: 300px;">
				<el-input v-model="userinfo.userphone" />
			</el-form-item>
			<el-form-item label="用户状态:" style="width: 300px;">
				<el-input v-model="userInfo.accstatus" disabled />
			</el-form-item>
			<el-form-item label="用户身份:" style="width: 300px;">
				<el-input v-model="userInfo.identity" disabled />
			</el-form-item>
			<el-form-item label="注册时间:" style="width: 300px;">
				<el-input v-model="userInfo.regitime" disabled />
			</el-form-item>
			<el-form-item>
				<!-- type="primary" 按钮类型为primary，是elementplus封装的按钮样式 -->
				<el-button 
					type="primary" 
					style="width: 200px; margin: 0 auto;" 
					@click="updateUserInfo">确认修改</el-button>
			</el-form-item>
		</el-form>
		<!-- 回到顶部按钮 -->
		<div style="right: 10%;">
			<el-backtop style="background-color: #F0FFF0;"/>
		</div>
	</el-main>
	
	<el-footer style="padding:0;margin-top: 70px;">
		<Footer></Footer>
	</el-footer>
</template>

<script>
	import NaviBar from '@/components/navibar.vue'
	import Footer from '@/components/footer.vue'
	import {mapState,mapMutations} from 'vuex'
	import axios from 'axios'
	import {ElMessage} from 'element-plus'
	export default{
		components:{
			NaviBar,
			Footer
		},
		data(){
			return{
				userinfo:{
					account:'',
					nickname:'',
					userphone:''
				}
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		mounted(){
			this.userinfo.account=this.userInfo.account
			this.userinfo.nickname=this.userInfo.nickname
			this.userinfo.userphone=this.userInfo.userphone
		},
		methods:{
			...mapMutations(["setuserNickname"]),
			updateUserInfo(){
				const path="http://127.0.0.1:5000/updateuserinfo"
				axios({
					url:path,
					method:"post",
					data:this.userinfo
				}).then(res=>{
					if(res.data==='update failed')
					{
						ElMessage({
							showClose: true,
							message: "修改失败~",
							type: 'error',
						})
					}else if(res.data==='ok')
					{
						ElMessage({
							showClose: true,
							message: "恭喜！修改成功啦！请重新登录更新信息嗷~",
							type: 'success',
						})
						// 倒计时
						setTimeout(()=>{
							this.$router.push("/login")
						},3000)
						localStorage.removeItem("usertoken")
					}else{
						ElMessage({
							showClose: true,
							message: "抱歉我的宝,系统出错啦~",
							type: 'error',
						})
					}
				})
			}
		}
	}
</script>

<style>
	.el-header{
		--el-header-padding:0 0;
	}
</style>
