import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import axios from 'axios'
// 公共状态
const store= createStore({
	// vuex的持久化管理
	plugins:[
	    createPersistedState()
	],
	state(){
		return{
			userInfo:{
				account:'',
				accstatus:'',
				identity:'',
				nickname:'未登录',
				regitime:'',
				userphone:'',
				isloginallowed:''
			}
		}
	},
	// mutations中不支持异步（例如axios）
	mutations:{
		setuserInfo(state,userinfo){
			// console.log(userinfo+"aaaaaa")
			state.userInfo.account=userinfo[0]
			state.userInfo.accstatus=userinfo[1]
			state.userInfo.identity=userinfo[2]
			state.userInfo.nickname=userinfo[3]
			state.userInfo.regitime=userinfo[4]
			state.userInfo.userphone=userinfo[5]
			state.userInfo.isloginallowed=userinfo[6]
		},
		setuserNickname(state,data){
			state.userInfo.nickname=data
		},
		// updateUsers(state,data){
		// 	state.userInfo.nickname=data[0]["nickname"]
		// 	state.userInfo.userphone=data[1]["userphone"]
		// 	// console.log(data[0]["nickname"])
		// }
	},
	// 支持异步和同步
	actions:{
	}
})
export default store