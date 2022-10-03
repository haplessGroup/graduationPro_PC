<template>
	<div id="card" style="height: 200px;padding-top: 50px;">
		<div id="head">
			<span>网站简单介绍</span>
			<el-divider style="width: 300px;color: black;"></el-divider>
		</div>
		<div id="container" class="animate__animated animate__backInRight">
			本平台主要用于对某些特定领域的数据分析，其中主要包括：豆瓣电影排行、各开发语言使用......
			<br>
			平台主要使用的技术有：Vue框架、Element Plus框架以及ECharts数据可视化。
		</div>
	</div>
</template>

<script>
</script>

<style scoped="">
	/* css字体动画库 */
	@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
	*{
		margin: 0;
		padding: 0;
	}
	#container{
		font-family: "新宋体";
		text-indent: 2em;
		width: 550px;
		font-size: 20px;
		color: black;
		font-weight: bold;
		margin-left: 100px;
		line-height: 50px;
	}
	#head{
		margin-left: 100px;
		font-weight: bold;
		font-size: 20px;
		color: black;
		padding-top: 10px;
	}
</style>
