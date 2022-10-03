<template>
	<!-- 顶部导航栏 -->
	<div style="position: relative;">
		<!-- 菜单 -->
		<el-menu
		    class="el-menu-demo"
		    mode="horizontal"
			background-color="#F0F8FF"
			style="justify-content: center;font-weight: bold;"
		  >
		    <el-menu-item index="1" @click="gotoHome">首页</el-menu-item>
			 <el-sub-menu index="2">
				<template #title>分类数据分析</template>
				<el-menu-item index="2-1" @click="gotoMovieSort">豆瓣top250电影排行</el-menu-item>
				<el-menu-item index="2-1" @click="gotoTravelCity">旅游城市推荐榜单</el-menu-item>
				<el-sub-menu index="2-3">
					<template #title>关于IT</template>
					<el-menu-item index="2-3-1" @click="gotoProlanguage">开发语言使用情况</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="2-4">
					<template #title>经济</template>
					<el-menu-item index="2-4-1" title="开发中..." @click="" disabled>股票</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="2-5">
					<template #title>教育</template>
					<el-menu-item index="2-5-1" title="开发中..." @click="" disabled>国内高校排行</el-menu-item>
					<el-menu-item index="2-5-2" title="开发中..." @click="" disabled>国内近年考研形势分析</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
			
		  </el-menu>
	</div>
	<div class="nav">
		<img src="../assets/account.png" class="img1">
		<el-dropdown style="margin-top: 5px;margin-left: 10px;">
		    <span>
				<!-- 通过状态管理器获取用户昵称 -->
		      {{userInfo.nickname}}
		      <el-icon class="el-icon--right">
		        <arrow-down />
		      </el-icon>
		    </span>
		    <template #dropdown>
		      <el-dropdown-menu>
		        <el-dropdown-item 
					@click="gotoLogin" 
					v-if="usertoken==''|| usertoken=='undefined' ||usertoken==null ">登录</el-dropdown-item>
		        <el-dropdown-item 
					v-if="usertoken==''|| usertoken=='undefined' ||usertoken==null "
					@click="gotoRegistration">注册</el-dropdown-item>
		        <el-dropdown-item 
					v-if="usertoken!=''&& usertoken!='undefined' && usertoken!=null "
					@click="gotoUserCenter">个人账户中心</el-dropdown-item>
				<el-dropdown-item
					v-if="usertoken!=''&& usertoken!='undefined' && usertoken!=null "
					@click="gotoUpdatePassword">修改密码</el-dropdown-item>
				<el-dropdown-item
					v-if="usertoken!=''&& usertoken!='undefined' && usertoken!=null "
					@click="gotoSubmitAdvce">提交建议</el-dropdown-item>
				<el-dropdown-item
					v-if="usertoken!=''&& usertoken!='undefined' && usertoken!=null "
					@click="removeToken">注销登录</el-dropdown-item>
					<!-- @ 是 v-on 的缩写 -->
		      </el-dropdown-menu>
		    </template>
		</el-dropdown>
	</div>
	
</template>

<script>
	// 导入vuex（状态管理器）的内置方法
	// mapState：作用就是将在vuex中自定义的对象引入这个界面的方法
	// mapMutations：作用就是将在vuex中自定义的方法引入的方法
	import { mapState,mapMutations } from 'vuex'
	export default{
		name:"NaviBar",
		data(){
			return{
				usertoken:''
			}
		},
		// mounted：vue的生命周期函数，意思是加载这个页面完成之后
		mounted(){
			// console.log(localStorage.getItem('token')+"sadkasd")
			// localStorage.getItem：原生js方法，做用是获取存储在浏览器中的变量信息
			this.usertoken=localStorage.getItem('usertoken')
			// console.log(this.usertoken)
			// console.log(this.usertoken)
		},
		// computed 计算属性
		computed:{
			// mapState必须写在computed属性中
			...mapState(["userInfo"])
		},
		methods:{
			// mapMutations必须写在methods中
			...mapMutations(["setuserNickname"]),
			gotoLogin(){
				this.$router.push("/login")
			},
			gotoMovieSort(){
				this.$router.push("/moviesort")
			},
			gotoHome(){
				this.$router.push('/home')
			},
			gotoTravelCity(){
				this.$router.push('/travelcity')
			},
			gotoRegistration(){
				this.$router.push('/registration')
			},
			gotoUserCenter(){
				this.$router.push("/usercenter")
			},
			// 注销登录时，移除存在本地的token，设置Vuex里面的nickname为未登录
			removeToken(){
				// 移除token
				localStorage.removeItem("usertoken")
				// 刷新页面
				location.reload()
				setTimeout(()=>{
					this.$router.push("/home")
					
				},2000)
				this.setuserNickname("未登录")
				
			},
			gotoUpdatePassword(){
				this.$router.push("/updatepassword")
			},
			gotoSubmitAdvce(){
				this.$router.push('/submitadvice')
			},
			gotoProlanguage(){
				this.$router.push('/prolanguage')
			},
			goroPokeMon(){
				this.$router.push("/pokemon")
			}
		}
	}
</script>

<style>
	/* .example-showcase .el-dropdown-link {
	  cursor: pointer;
	  color: var(--el-color-primary);
	  display: flex;
	  align-items: center;
	} */
	.nav{
		font-weight: bold;
		color: #303133;
		margin-top: -45px;
		float: right;
		cursor: pointer;
	}
	.img1{
		width: 30px;
		height: 30px;
		z-index:1;
		position: absolute;
		margin-left: -30px;
		margin-top: -3px;
	}
</style>
