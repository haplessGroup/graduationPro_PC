<template>
	
	<!-- 封装的组件，顶部导航栏 -->
	<el-header style="padding: 0;">
		<NaviBar></NaviBar>
	</el-header>
	<div style="background-color: #F0F8FF;width: 100%;height: 400px;margin-top: -20px;">
		<div id="introduce">
			<!-- 卡片介绍 -->
			<Card style="background-color: #F0F8FF;margin-left: 0px;"></Card>
		</div>
		<!-- 自定义轮播组件 -->
		<div style="margin: -180px auto 0 65%;z-index:2;position: relative;">
			<Swiper></Swiper>
		</div>
	</div>
		<el-main>
			
			<!-- 选项卡 -->
			<div id="selec">
				<div id="" style="margin: 100px auto 0 auto;width: 70%;">
					<SelectCard></SelectCard>
				</div>
			</div>
			
			<!-- 回到顶部按钮 -->
			<div style="right: 10%;">
				<el-backtop style="background-color: #F0FFF0;"/>
			</div>
		</el-main>
	<el-footer style="padding:0;">
		<!-- 页脚 -->
		<div id="foo">
			<Footer></Footer>
		</div>
	</el-footer>
	
</template>

<script>
	import NaviBar from '@/components/navibar.vue'
	import Swiper from '@/components/swiper.vue'
	import Card from '@/components/card.vue'
	import SelectCard from '@/components/selectcard.vue'
	import Footer from '@/components/footer.vue'
	export default{
		components:{
			NaviBar,
			Swiper,
			Card,
			SelectCard,
			Footer,
		},
		methods:{
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	.wel{
		color: #000080;
		font-size: 30px;
		text-align: center;
		font-family:"宋体"
	}
	
	.demo-tabs > .el-tabs__content {
	  padding: 32px;
	  color: #000;
	  font-size: 20px;
	  font-weight: 600;
	  
	}
	a{
		text-decoration: none;
		color: #00BFFF;
	}
	a:hover{
		color: #1E90FF;
	}
	.el-footer{
		--el-footer-padding:0;
	}
</style>
