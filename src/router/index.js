import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/Home/index.vue'
import moviesort from '@/views/Movie/moviesort.vue'
import login from '@/views/Login/login.vue'
import travelcity from '@/views/Travel/travelcity.vue'
import registration from '@/views/Registration/registration.vue'
import findpassword from '@/views/FindPassword/findpassword.vue'
import usercenter from '@/views/UserCenter/usercenter.vue'
import updatepassword from '@/views/UpdatePassword/updatePassword.vue'
import submitadvice from '@/views/SubmitAdvice/submitadvice.vue'
import prolanguage from '@/views/AboutIt/prolanguage.vue'
import { ElMessage } from 'element-plus'
const routers=[
	// 路由重定向，当访问的路径不存在或只输入域名时，重定向到/Home
	{
		path:'/:pathMatch(.*)',
		redirect:'/home',
	},
	{
		path:'/home',
		component:home
	},
	{
		path:'/moviesort',
		component:moviesort
	},
	{
		path:'/login',
		component:login
	},
	{
		path:'/travelcity',
		component:travelcity
	},
	{
		path:'/registration',
		component:registration
	},
	{
		path:'/findpassword',
		component:findpassword
	},
	{
		path:"/usercenter",
		component:usercenter
	},
	{
		path:"/updatepassword",
		component:updatepassword
	},
	{
		path:"/submitadvice",
		component:submitadvice
	},
	{
		path:"/prolanguage",
		component:prolanguage
	}
]

const router = createRouter({
  routes: routers,
  history: createWebHistory(),
});

//全局拦截->beforeEach:每次路由切换前执行
const auth=['/moviesort','/travelcity','/usercenter','/updatepassword',"/submitadvice","/prolanguage"]
router.beforeEach((to, from, next) => {
  if (auth.includes(to.fullPath)) {
	  let token=localStorage.getItem("usertoken")
   if(token===null || token==="")
   {
	   ElMessage({
	       showClose: true,
	       message: '请先登录！',
	       type: 'error',
	     })
	   // console.log("asasdasdadas")
	   next({
	   	path:'/Login'
	   })
   }else{
	   next()
   }
  } else {
    next();
  }
});

export default router