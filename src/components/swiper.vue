<template>
	<div class="block">
	    <el-carousel height="300px" :key="imgs.length">
	      <el-carousel-item v-for="data in imgs" :key="data.id">
	        <img :src="data.img" style="width: 500px;height: 300px;">
	      </el-carousel-item>
	    </el-carousel>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		mounted(){
			axios.get('/imgs.json').then(res=>{
				// console.log(res.data)
				this.imgs=res.data
			})
		},
		data(){
			return{
				imgs:[]
			}
		},
	}
</script>

<style>
</style>
