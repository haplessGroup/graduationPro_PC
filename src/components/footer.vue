<template>
	<div id="" class="footer">
		<div style="position: absolute;top: 20px;left: 50%;margin-left: -511px;">
			<span style="font-size: 25px;margin-top: -10px;margin-right: 20px;">
				电话177****8254
			</span>
			<span style="font-size: 25px;margin-top: -10px;margin-right: 20px;">地址：重庆市*********</span>
			<span style="font-size: 25px;margin-top: -10px;margin-right: 20px;">邮箱：249****886@qq.com</span>
			<span style="font-size: 25px;margin-top: -10px;">QQ:249****886</span>
			<hr style="width: 100%;margin-top: 10px;">
		</div>
		<div style="width: 160px;position: absolute;left: 50%;top: 100px;margin-left: -80px;">
			<img src="../assets/scancode.jpg" style="width: 80px;height: 80px;margin-left: 40px;" />
			<div style="text-align: center;">
				扫码添加客服咨询群
			</div>
		</div>
		<!-- 数据来源 -->
		<div id="datadrigin" style="position: absolute;top: 66px;width: 1000px;left: 50%;margin-left: -500px;text-align: center;">
			数据提供网站:
			<span>豆瓣</span>
			<span>Maigoo</span>
			<span>马蜂窝</span>
			<span>携程旅行</span>
			<span>自驾游天下(个人博客)</span>
			<span>旅图君(个人博客)</span>
			<span>快票出行</span>
			<span>搜狐</span>
			<span>TIOBE</span>
		</div>
		<div style="position: absolute;bottom: 10px;width: 210px;left: 50%;margin-left: -85px;font-size:12px;">
			&COPY;"零数据"分析平台开发人员
		</div>
	</div>
</template>

<script>
</script>

<style>
	.footer{
		background-color: #303333;
		height: 250px;
		width: 100%;
		/* 子绝父相 */
		position: relative;
		color: white;
	}
	/* 子孙选择器 */
	#datadrigin>span{
		margin-right: 10px;
	}
</style>
