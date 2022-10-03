<template>
	<!-- 路由容器 -->
	<router-view></router-view>
</template>

<script>
import { io } from 'socket.io-client'
import {mapState} from 'vuex'
import { ElNotification } from 'element-plus'
export default {
  name: 'App',
  components: {
  },
  computed: {
  	...mapState(["userInfo"])
  },
  mounted(){
		this.socket = io('ws://127.0.0.1:5000')
		this.socket.on('connect', () => console.log('connect: websocket 连接成功！'))
		this.socket.on(this.userInfo.account, msg =>{
			// 判断接受的服务器信息是否是自己的
			console.log(msg)
			if(this.userInfo.account==msg.account)
			{
				if(msg.data=="你的注册信息未通过,请联系客服查看原因~")
				{
					ElNotification({
					    title: '消息通知',
					    message: msg.data,
						type:"error"
					})
				}else if(msg.data=="你的账号状态已被修改,请重新登录查看~")
				{
					ElNotification({
					    title: '消息通知',
					    message: msg.data,
						type:"warning"
					})
				}else{
					ElNotification({
					    title: '消息通知',
					    message: msg.data,
						type:"success"
					})
				}
			}
			
			
		}			
	)
  }
}
</script>

<style>
</style>
