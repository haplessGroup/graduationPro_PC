<template>
	<el-header style="padding: 0;">
		<NavBar></NavBar>
	</el-header>
	<el-main style="padding: 0;">
		<div style="width: 800px;margin: 50px auto;text-align: center;height: 500px;font-family: '微软雅黑';font-weight: bold;">
			<div>类别选择:
				<el-select style="margin-top: -2px;" v-model="form.category" placeholder="类别选择">
					<el-option label="提交Bug" value="提交Bug"></el-option>
					<el-option label="用户体验" value="用户体验"></el-option>
					<el-option label="用户需求" value="用户需求"></el-option>
				</el-select>
			</div>
			<div style="margin-top: 20px;margin-left: 20px;">QQ:
				<el-input v-model="form.qnumber" placeholder="请输入QQ" style="width: 200px;"/>
			</div>
			<div style="margin-top: 20px;margin-left: 5px;">Email:
				<el-input v-model="form.email" placeholder="请输入Email" style="width: 200px;" />
			</div>
			<div style="margin-top: 20px;">
				  <div style="float: left;margin-left: 222px;">你想对我们说:</div>
				<el-input
					v-model="form.advice"
					:rows="8"
					type="textarea"
					placeholder="请提交您的建议或者评价......(不超过255个汉字)"
					maxlength="255"
					show-word-limit
					style="width: 300px;margin-left: -160px;"
				  />
			</div>
			<div style="margin-top: 20px;">
				<div style="margin-left: -130px;">请给我们打分:
					<!-- 星星评分 -->
					<!-- allow-half：是否允许半选，默认值为true -->
					<el-rate
						v-model="form.rate"
						allow-half
						style="margin-top: 10px;"
					>
					</el-rate>
				</div>
			</div>
			<!-- 提交按钮 -->
			<div style="margin-top: 50px;">
				<el-button
					style="width: 200px;font-size: 15px;" 
					type="primary" 
					@click="dialogVisible=true">提交</el-button>
					<!-- 点击提交后显示提示框 -->
				<el-dialog
					v-model="dialogVisible"
					title="提交"
					width="30%"
				  >
					<span>确定提交吗？</span>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogVisible = false">取消</el-button>
							<el-button type="primary" @click="submitAdvice"
							  >确定</el-button
							>
						</span>
					</template>
				</el-dialog>
			</div>
		</div>
	</el-main>
	<el-footer style="padding: 0;">
		<Footer></Footer>
	</el-footer>
</template>

<script>
	import NavBar from '@/components/navibar.vue'
	import Footer from '@/components/footer.vue'
	import axios from 'axios'
	import {ElMessage} from 'element-plus'
	import {mapState} from 'vuex'
	export default{
		components:{
			NavBar,
			Footer,
		},
		data(){
			return{
				form:{
					category: '',
					qnumber:'',
					email:'',
					advice: '',
					rate:''
				},
				// 控制对话框的显示
				dialogVisible:false,
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods:{
			submitAdvice(){
				
				const form=this.form
				if(form.category==""||form.qnumber==""||form.email==""||form.advice==""||form.rate=="")
				{
					ElMessage({
						showClose: true,
						message: "请把信息填写完嘛......",
						type: 'error',
					})
					this.dialogVisible=false
				}else{
					const path="http://127.0.0.1:5000/submitadvice"
					axios({
						url:path,
						method:"post",
						data:{
							"account":this.userInfo.account,
							"nickname":this.userInfo.nickname,
							"category":form.category,
							"qnumber":form.qnumber,
							"email":form.email,
							"advice":form.advice,
							"rate":form.rate,
							"status":"待处理"
						}
					}).then(res=>{
						if(res.data=="ok")
						{
							ElMessage({
								showClose: true,
								message: "感谢你的建议~",
								type: 'success',
							})
							this.dialogVisible=false
							this.$router.push("/home")
						}else if(res.data=="failed")
						{
							ElMessage({
								showClose: true,
								message: "提交失败欸......",
								type: 'error',
							})
						}else{
							ElMessage({
								showClose: true,
								message: "啊哦，系统出错了......",
								type: 'error',
							})
						}
					})
				}
			}
		},
	}
</script>

<style>
</style>
