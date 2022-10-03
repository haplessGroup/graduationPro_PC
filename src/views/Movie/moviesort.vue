<template>
	<!-- 导航 -->
	<NaviBar></NaviBar>
	<div>
		<h2 class="tit">豆瓣电影Top250展示</h2>
		<!-- stripe 属性可以创建带斑马纹的表格 -->
		<el-table 
		:data="tableData" 
		height="400" 
		style="width: 1000px;margin: 100px auto 0  auto;" 
		stripe="true"
		v-loading="loading">
			<el-table-column prop="id" label="ID" width="150" />
			<el-table-column prop="cname" label="中国名" width="150" />
			<el-table-column prop="oname" label="外国名" width="150" />
			<el-table-column prop="rate" label="电影评分" width="150" />
			<el-table-column prop="judge" label="评分人数" width="150" />
			<el-table-column prop="inq" label="评价" width="150"/>
			<el-table-column prop="about" label="电影信息" width="150" />
		</el-table>
		<div class="data">
			<h2 class="tit">豆瓣电影Top250评分分布图</h2>
			 <!-- 为 ECharts 准备一个定义了宽高的 区域 -->
			<div id="main" style="width: 70%;height:300px;margin:30px auto 30px auto;"></div>
		</div>
		<!-- 专业人士预测 -->
		<div style="width:800px;margin: 30px auto 0 auto;margin-bottom: 20px;text-align: center;">
			<h2 style="font-family: '微软雅黑';">快来看看专业人的分析</h2>
			<el-carousel height="200px" style="border-radius: 10px;margin-top: 10px;">
			    <el-carousel-item v-for="(item,index) in question" :key="index" >
			       <div style="line-height: 150px;">{{item}}</div>
				   <el-button 
					type="primary" 
					round 
					style="margin-top: -50px;" 
					@click="open(index)">想知道答案吗?点我!</el-button>
				   <!-- <div style="font-size: 10px;">(想知道答案吗?点我!)</div> -->
			    </el-carousel-item>
			</el-carousel>
		</div>
		<!-- 用户留言 -->
		<div style="width: 100%;background-color: #DCDCDC;height: 700px;overflow: auto;">
			<div style="width: 80%;margin:0 auto;">
				<div style="width: 100%;margin:0 auto;">
					<el-input
					    v-model="textarea"
					    :rows="5"
					    type="textarea"
					    placeholder="请发表您的评论......(不超过255个汉字)"
						style="margin-top: 30px;"
						maxlength="255"
						show-word-limit
					  />
				</div>
				<!-- 发表按钮 -->
				<div style="width: 100px;float: right;margin-top: 30px;">
					<el-button type="primary" style="width: 100px;" @click="sureToSend">确认发表</el-button>
				</div>
				<!-- 分割线 -->
				<div style="width: 100%;margin: 80px auto 0 auto;">
					<el-divider style="border-color: #000000;"></el-divider>
				</div>
				<div style="text-align: center;" v-if="commentslist.length==0">
					<span style="font-weight: bold;" >暂无评论，快来抢占沙发啦~</span>
				</div>
				<!-- 用户发表评论区 -->
				<div id="message" v-if="commentslist.length>0">
					<div v-for="(item,index) in commentslist" :key="index" style="word-wrap:break-word">
						<!-- 用户留言内容 -->
						<!-- em是字体大小的一种单位，它的值是根据定义的px的值来确定。
							比如说：整个页面的字体大小为16px，那么1em=16px，2em=2*16=32px
							整个页面的字体大小为20px，那么1em=20px，2em=2*16=40px
						 -->
						<div style="font-size: 16px;font-weight: bold;font-family: '仿宋';text-indent:2em; ">
							{{item.dbcontent}}
						</div>
						<!-- 用户信息 -->
						<div style="margin-top: 20px;font-size: 0.8125rem;display: flex;flex-direction: row;">
							<!-- 楼数 -->
							<span style="flex: 1;">第{{index+1}}楼</span>
							<!-- 用户账号 -->
							<span style="flex: 1;">用户账号:{{item.account}}</span>
							<!-- 用户昵称 -->
							<span style="flex: 1;">用户昵称:{{item.nickname}}</span>
							<!-- 用户身份 -->
							<span style="flex: 1;">用户身份:{{item.identity}}</span>
							<!-- 留言时间 -->
							<span style="flex: 1;">留言时间:{{item.dbtime}}</span>
							<!-- 删除操作 -->
							<span v-if="item.account===userInfo.account">
								操作:<span 
										class="oper"
										@click="deleteMessage(item.id)">
										删除
									</span></span>
						</div>
						<!-- 分割线 -->
						<div style="width: 100%;margin-top: 0;">
							<el-divider style="border-color: #000000;"></el-divider>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 回到顶部按钮 -->
	<div style="right: 10%;">
		<el-backtop style="background-color: #F0FFF0;"/>
	</div>
	<!-- 页脚 -->
	<div>
		<Footer></Footer>
	</div>
	
</template>

<script>
	// @ 相当于 ../src
	import NaviBar from '@/components/navibar.vue'
	import Footer from '@/components/footer.vue'
	import * as echarts from 'echarts'
	// 对封装的axios进行导入
	import http from '@/utils/http.js'
	import {mapState} from 'vuex'
	import {ElMessage,ElMessageBox} from "element-plus"
	import axios from 'axios'
	export default {
		
		components:{
			NaviBar,
			Footer,
		},
		computed:{
			...mapState(["userInfo"])
		},
		mounted(){
			// 请求电影数据
			this.showdata()
			// 请求评分数据信息
			http.httpForRate().then(res=>{  
				console.log(res.data)
				this.ratdata=res.data[0]
				this.ratnum=res.data[1]
				this.showChart(this.ratdata,this.ratnum) //将获取的数据传递给方法
			})
			// 请求用户评论
			this.showMovieMessage()
		},
		data(){
			return{
				tableData :[],
				ratdata:[],
				ratnum:[],
				textarea:'',
				commentslist:[],
				loading:false,
				question:[
					"1、目前大众的购票渠道有哪些?",
					"2、目前大众看电影的方式有哪些?",
					"3、目前大众喜欢观看的电影类别有哪些?",
					"4、为什么会出现这样的结果呢?"
				]
				
			}
		},
		methods:{
			open(index){
				// 1、目前大众的购票渠道有哪些?
				if(index==0)
				{
					/*
						ElMessageBox.alert("这里是显示的内容","标题","其他属性")
					*/
					ElMessageBox.alert(
					'1、<strong>实体店购买</strong>:这种方式对于目前的群众来说只是和朋友出去游玩的时候适用，但占比也相对较少;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>线上购买</strong>:目前线上购买的手段层出不穷,例如有猫眼电影等,现在的年轻群众对此十分喜欢;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、<strong>黄牛购买</strong>:在电影行业等领域逐渐发展起来之后.出现的一种职业叫做票贩子,也就是黄牛,利用购票时的差价赚取利润,但目前也只是占据小部分市场;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、<strong>线上转卖</strong>:这种方式的出现是因为人们买票之后因故不能去影院看电影,只能便宜出售电影票。就目前来看主要发生在大学生之间，其余人群也有;'
					, 
					'解答:', 
						{
							confirmButtonText: '我知道了',
							// 将 dangerouslyUseHTMLString 属性设置为 true，message 就会被当作 HTML 片段处理。
							dangerouslyUseHTMLString: true,
						},
					)
				}else if(index==1){
					// 2、目前大众看电影的方式有哪些?
					ElMessageBox.alert(
						'1、<strong>线下影院</strong>:目前线下影院观看电影依旧是较为的主流;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>私人影院</strong>:其实依旧是线下影院的一种,只是相对来说更加的私密;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、<strong>线上APP</strong>:目前人群中有部分人希望能够白嫖电影,所以就会等到影院电影在视频APP(例如爱奇艺，腾讯视频等)上能够观看后才会选择看电影;', 
						'解答', 
						{
							confirmButtonText: '我知道了',
							dangerouslyUseHTMLString: true,
						},
					)
				}else if(index==2){
					// 3、目前大众喜欢观看的电影类别有哪些?
					ElMessageBox.alert(
						'1、<strong>青春</strong>:在前几年,以青春为主的电影可以说占据了影视市场的大半壁江山。从《那些年我们追过的女孩》、《致青春》等电影开始似乎正慢慢拉开了青春电影的大门;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>家国</strong>:近几年的家国情怀逐渐变成电影的主流,宣传和平、正能量，让大家对这种类型的电影有了的期待。吴京的《战狼2》宣言了爱国，爱和平，看着振奋人心;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、<strong>喜剧</strong>:喜剧无疑也是最受观众喜爱的类型之一。例如宁浩的疯狂三部曲都获得了不错的票房成绩,以话剧扬名的开心麻花,在进入影视市场后一路上升。2015年一部《夏洛特烦恼》彻底让开心麻花进入到了大众的视线;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、<strong>科幻</strong>:现在我国电影市场越来越开放,科幻等电影也获得了不错的成绩。2019年的《流浪地球》在一路逆袭中票房达到了46.88亿元,更是弥补了我国科幻电影的空白;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然，还有悬疑、犯罪等也是当代人喜欢看的电影,在这就不多说啦~', 
						'解答', 
						{
							confirmButtonText: '我知道了',
							dangerouslyUseHTMLString: true,
						},
					)
				}else if(index==3){
					// 4、为什么会出现这样的结果呢?
					ElMessageBox.alert(
						'1、<strong>目前社会趋势</strong>:随着社会的逐渐发展,科技在不断的进步,很多方便人们生活的软件、小程序等随之也被开发出来,人们的生活习惯也随之改变;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>生活年轻化</strong>:目前喜欢看电影的人群中,年轻人占了大部分。换句话说,现在的年轻人更懂得如何享受生活,相对年长的'+
						'人群,他们的重心更偏向于家庭以及生活的负担;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、<strong>年轻人更“懒”</strong>:其实说“懒”或许不太准确,更应该说年轻人更加懂得如何利用身边的资源,以达到减少时间的浪费;'+
						'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、<strong>压力“山”大</strong>:现在的社会是快节奏的,各方面的压力也随之加大,速度更快的冲向人们的肩膀。所以如何减轻其他方面的压力就成了首要问题,这时候'+
						'“网上购票”等手段就帮大部分人减轻了线下买票排队等压力;'+"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(如有不准确的地方，还望各位多多担待~)", 
						'专家解释', 
						{
							confirmButtonText: '我知道了',
							dangerouslyUseHTMLString: true,
						},
					)
				}
				
			},
			// 向后端请求数据
			showdata(){
				http.httpForMovie().then(res=>{
					this.tableData=res.data
					var arr=this.tableData
					var res=this.tableData.filter(function(item,index,arr){
						console.log(item.rate)
						return item.rate>9
					})
					console.log("asda",res)
				})
			},
			// 通过echarts展示数据
			showChart(ratdata,ratnum){
				var chartDom = document.getElementById('main');
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
				  tooltip: {
				    trigger: 'axis',
				    axisPointer: {
				      type: 'shadow'
				    }
				  },
				  grid: {
				    left: '3%',
				    right: '4%',
				    bottom: '3%',
				    containLabel: true
				  },
				  xAxis: [
				    {
				      type: 'category',
				      data: ratdata,
				      axisTick: {
				        alignWithLabel: true
				      }
				    }
				  ],
				  yAxis: [
				    {
				      type: 'value'
				    }
				  ],
				  series: [
				    {
				      name: '总数',
				      type: 'bar',
				      barWidth: '60%',
				      data: ratnum,
				    }
				  ]
				};
				
				option && myChart.setOption(option);
			},
			showMovieMessage(){
				this.loading=true
				http.httpForDBMovieMessage().then(res=>{
					this.loading=false
					// console.log(res)  //数组类型
					console.log(res)
					if(res.data=="ERROR")
					{
						ElMessage({
						    showClose: true,
						    message: '留言请求失败，请等待程序员解决~',
						    type: 'error',
						})
					}else if(res.data=='no result'){
						console.log("no result")
					}else{
						this.commentslist=res.data
					}
				})
			},
			deleteMessage(id){
				const path="http://127.0.0.1:5000/deletemessage"
				axios({
					url:path,
					method:"POST",
					data:{"id":id,"account":this.userInfo.account}
				}).then(res=>{
					if(res.data=='ok')
					{
						ElMessage({
						    showClose: true,
						    message: '恭喜！删除成功！',
						    type: 'success',
						})
						setTimeout(()=>{
							location.reload()
						},2000)
					}else if(res.data=='failed')
					{
						ElMessage({
						    showClose: true,
						    message: '删除失败欸...',
						    type: 'error',
						})
					}else{
						ElMessage({
						    showClose: true,
						    message: '后台出现错误了哦~',
						    type: 'error',
						})
					}
				})
			},
			sureToSend(){
				const path="http://127.0.0.1:5000/suretosend"
				var user=this.userInfo
				// console.log(user.account)
				if(this.textarea==="")
				{
					ElMessage({
					    showClose: true,
					    message: '多少还是写点东西再发表呗。',
					    type: 'error',
					})
				}else{
					axios({
						url:path,
						method:"post",
						data:{
							"dbaccount":user.account,
							"dbnickname":user.nickname,
							"dbidentity":user.identity,
							"dbcontent":this.textarea}
					}).then(res=>{
						if(res.data=="ok")
						{
							ElMessage({
							    showClose: true,
							    message: '发表成功！',
							    type: 'success',
							})
							location.reload()
						}else if(res.data=="failed")
						{
							ElMessage({
							    showClose: true,
							    message: '发表失败！',
							    type: 'error',
							})
						}else{
							ElMessage({
							    showClose: true,
							    message: '后台出现错误了哦~',
							    type: 'error',
							})
						}
					})
				}
				
			},
		}
	}
</script>

<style scoped>
	.example-pagination-block + .example-pagination-block {
	  margin-top: 10px;
	}
	.tit{
	    text-align: center;
	    padding-top: 100px;
	    font-family: "Berlin Sans FB";
	}
	.data{
	    margin:30px auto 0 auto;
	    width: 1000px;
	    height: auto;
	}
	.oper{
		font-size: 0.875rem;
		cursor: pointer;
		color: #005CC5;
	}
	/* 鼠标放到删除上之后出现下划线 */
	.oper:hover{
		text-decoration: underline;
	}
	.el-carousel__item h3 {
	  color: #475669;
	  font-size: 14px;
	  opacity: 0.75;
	  line-height: 150px;
	  margin: 0;
	  text-align: center;
	}
	/* 单数和双数的背景颜色不一样 */
	.el-carousel__item:nth-child(2n) {
	  background-color: #F0F8FF;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
	  background-color: #F0F9FF;
	}
</style>
