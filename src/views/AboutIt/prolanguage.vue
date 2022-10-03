<template>
	<el-container style="padding: 0;">
		<!-- 顶部导航栏 -->
		<el-header style="padding: 0;">
			<NaviBar></NaviBar>
		</el-header>
		<el-main style="padding: 0;">
			<h2 class="tit">编程语言使用情况</h2>
			<!-- 下拉框 -->
			<div id="tabs">
				<el-select v-model="value" class="m-2 se" placeholder="Select">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value"
					  @click="show(item.value)"
				    />
				 </el-select>
				 <!-- 标签页 -->
				<el-tabs tab-position="left" style="height: 500px;" class="demo-tabs" @tab-change="getname">
				    <el-tab-pane label="3月">
						<el-table
						:data="table1Data" 
						height="500" 
						style="width:880px;margin-top: -20px;" 
						stripe="true">
							<el-table-column prop="sort" label="2022-03" width="150" />
							<el-table-column prop="lastsort" label="2021-03" width="150" />
							<el-table-column prop="prolanguage" label="编程语言" width="150" />
							<el-table-column prop="rating" label="使用率" width="150" />
							<el-table-column prop="change" label="变化率" width="150"/>
						</el-table>
					</el-tab-pane>
				    <el-tab-pane label="4月">
						<el-table
						:data="table2Data" 
						height="500" 
						style="width:880px;margin-top: -20px;" 
						stripe="true">
							<el-table-column prop="sort" label="2022-03" width="150" />
							<el-table-column prop="lastsort" label="2021-03" width="150" />
							<el-table-column prop="prolanguage" label="编程语言" width="150" />
							<el-table-column prop="rating" label="使用率" width="150" />
							<el-table-column prop="change" label="变化率" width="150"/>
						</el-table>
					</el-tab-pane>
				    <el-tab-pane label="5月" style="text-align: center;color: #6495ED;">五月排名暂未出炉，敬请等待...</el-tab-pane>
				</el-tabs>
			</div>
			<!-- 数据表 -->
			<div>
				<div class="data">
					<h2 style="text-align: center;">语言使用情况Top10对比图</h2>
					 <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
					<div id="main" class="echarts"></div>
					<div id="main2" class="echarts echarts2"></div>
				</div>
			</div>
			<!-- 专业人士预测 -->
			<div class="answ">
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
			<div class="cont">
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
					<div id="message" v-if="commentslist.length>0" style="word-wrap:break-word">
						<div v-for="(item,index) in commentslist" :key="index">
							<!-- 用户留言内容 -->
							<div class="mess-cont">
								{{item.lacontent}}
							</div>
							<!-- 用户信息 -->
							<div class="mess-info">
								<!-- 楼数 -->
								<span style="flex: 1;">第{{index+1}}楼</span>
								<!-- 用户账号 -->
								<span style="flex: 1;">用户账号:{{item.laaccount}}</span>
								<!-- 用户昵称 -->
								<span style="flex: 1;">用户昵称:{{item.lanickname}}</span>
								<!-- 用户身份 -->
								<span style="flex: 1;">用户身份:{{item.laidentity}}</span>
								<!-- 留言时间 -->
								<span style="flex: 1;">留言时间:{{item.latime}}</span>
								<!-- 删除操作 -->
								<span v-if="item.laaccount===userInfo.account">
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
		</el-main>
		<!-- 回到顶部按钮 -->
		<div style="right: 10%;">
			<el-backtop style="background-color: #F0FFF0;"/>
		</div>
		<!-- 底部 -->
		<el-footer style="padding: 0;">
			<Footer></Footer>
		</el-footer>
	</el-container>
</template>

<script>
	import NaviBar from '@/components/navibar.vue'
	import Footer from '@/components/footer.vue'
	import http from '@/utils/http.js'
	import * as echarts from 'echarts';
	import {mapState} from 'vuex'
	import axios from 'axios'
	import {ElMessage,ElMessageBox} from "element-plus"
	export default {
		components: {
			NaviBar,
			Footer
		},
		data(){
			return{
				table1Data:[],
				table2Data:[],
				name:["Python","C","Java","C++","C#","Visual Basic","JavaScript","PHP","Assembly language","SQL"],
				data: [
				    {
				      "name": "Python",
				      "value": 14
				    },
				    {
				      "name": "C",
				      "value": 13
				    },
				    {
				      "name": "Java",
				      "value": 11
				    },
				    {
				      "name": "C++",
				      "value": 9
				    },
				    {
				      "name": "C#",
				      "value": 6
				    },
				    {
				      "name": "Visual Basic",
				      "value": 6
				    },
				    {
				      "name": "JavaScript",
				      "value": 2
				    },
				    {
				      "name": "PHP",
				      "value": 2
				    },
				    {
				      "name": "Assembly language",
				      "value": 2
				    },
				    {
				      "name": "SQL",
				      "value": 2
				    },
					{
						"name":"其他",
						"value":33
					}							  
				],
				data2:[],
				commentslist:[],
				textarea:'',
				question:[
					"1、排名变化情况?",
					"2、Python为何能高居榜首?"
				],
				options:[
					{
						value:"2022",
						label:"2022",
					}
				],
				value:'2022'
			}
		},
		mounted(){
			this.showProLanguage()
			this.showCharts(this.data)
			this.showProMessage()
			this.showProLanguage4()
			this.showEcharts2(this.data,this.data2)
		},
		computed: {
			...mapState(["userInfo"])
		},
		methods: {
			open(index){
				// 1、排名变化情况?
				if(index==0){
					ElMessageBox.alert(
					'1、前 20 比较惨的是 Go ，上个月刚从 13 名爬上 11 名，这个月又跌回去了;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、比较猛的是 Delphi/Object Pascal ，从上个月的 15 名冲上了 12 名；R 语言从上个月的 13 名冲上了 11 名;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、此外，Swift 的排名仍在往下掉，2 月从第 10 名掉到 12 名，这个月继续掉到了 14 名;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、MATLAB 从 14 → 15 ，下跌一名;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、Ruby、 VB 、 Objective-C、Perl 的排名都没变化;'
					, 
					'解答:', 
						{
							confirmButtonText: '我知道了',
							// 将 dangerouslyUseHTMLString 属性设置为 true，message 就会被当作 HTML 片段处理。
							dangerouslyUseHTMLString: true,
						},
					)
				}else if(index==1){
					// 2、Python为何能高居榜首?
					ElMessageBox.alert(
					'1、<strong>优点</strong>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1)、语法简单;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2)、相对于其他语言来说易学;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3)、可移植性高;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4)、不用担心内部机制的运作;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5)、既支持面向过程的函数编程也支持面向对象的抽象编程;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(6)、可扩展性和可嵌入性强;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(7)、具有丰富的库;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>缺点</strong>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
					'(1)、运行速度慢:运行速度慢是解释型语言的通病,Python 也不例外。'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2)、代码加密困难:不像编译型语言的源代码会被编译成可执行程序，Python 是直接运行源代码，因此对源代码加密比较困难。'
					, 
					'解答:', 
						{
							confirmButtonText: '我知道了',
							// 将 dangerouslyUseHTMLString 属性设置为 true，message 就会被当作 HTML 片段处理。
							dangerouslyUseHTMLString: true,
						},
					)
				}
			},
			showProLanguage(){
				http.httpForProLaguage().then(res=>{
					this.table1Data=res.data
				})
			},
			// 4月排名数据获取
			showProLanguage4(){
				http.httpForProLaguage4().then(res=>{
					this.table2Data=res.data
				})
			},
			showCharts(data){
				var chartDom = document.getElementById('main');
				var myChart = echarts.init(chartDom);
				var option;
				option = {
				  title: {
				    left: 'center'
				  },
				  tooltip: {
				    trigger: 'item',
				    formatter: '{a} <br/>{b} : {c} ({d}%)'
				  },
				  legend: {
				    type: 'scroll',
				    orient: 'vertical',
				    right: 10,
				    top: 20,
				    bottom: 20,
				    data: this.name,
				  },
				  series: [
				    {
				      name: '语言',
				      type: 'pie',
				      radius: '55%',
				      center: ['30%', '50%'],
				      data: data,
				      emphasis: {
				        itemStyle: {
				          shadowBlur: 10,
				          shadowOffsetX: 0,
				          shadowColor: 'rgba(0, 0, 0, 0.5)'
				        }
				      }
				    }
				  ]
				};
				option && myChart.setOption(option);
			},
			showEcharts2(data1,data2){
				console.log(data1)
				console.log(data2)
				var chartDom = document.getElementById('main2');
				var myChart = echarts.init(chartDom);
				var option;
				
				option = {
				  
				  tooltip: {
				    trigger: 'axis'
				  },
				  legend: {},
				  toolbox: {
				    show: true,
				    feature: {
				      dataZoom: {
				        yAxisIndex: 'none'
				      },
				      dataView: { readOnly: false },
				      magicType: { type: ['line', 'bar'] },
				      restore: {},
				      saveAsImage: {}
				    }
				  },
				  xAxis: {
				    type: 'category',
				    boundaryGap: false,
				    data: ["Python","C","Java","C++","C#","Visual Basic","JavaScript","PHP","Assembly language","SQL"]
				  },
				  yAxis: {
				    type: 'value',
				    axisLabel: {
				      formatter: '{value}%'
				    }
				  },
				  series: [
				    {
				      name: '三月',
				      type: 'line',
				      data: data1,
				      markPoint: {
				        data: [
				          { type: 'max', name: 'Max' },
				          { type: 'min', name: 'Min' }
				        ]
				      },
				      markLine: {
				        data: [{ type: 'average', name: 'Avg' }]
				      }
				    },
				    {
				      name: '四月',
				      type: 'line',
				      data: data2,
				      markPoint: {
				        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
				      },
				      markLine: {
				        data: [
				          { type: 'average', name: 'Avg' },
				          [
				            {
				              symbol: 'none',
				              x: '90%',
				              yAxis: 'max'
				            },
				            {
				              symbol: 'circle',
				              label: {
				                position: 'start',
				                formatter: 'Max'
				              },
				              type: 'max',
				              name: '最高点'
				            }
				          ]
				        ]
				      }
				    }
				  ]
				};
				
				option && myChart.setOption(option);
			},
			showProMessage(){
				http.httpForGetProMessage().then(res=>{
					// console.log(res)  数组类型
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
				const path="http://127.0.0.1:5000/languagemesstodel"
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
				const path="http://127.0.0.1:5000/languagemesstosend"
				var user=this.userInfo
				console.log(user.account)
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
							"laaccount":user.account,
							"lanickname":user.nickname,
							"laidentity":user.identity,
							"lacontent":this.textarea}
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
			// tab选中
			getname(TabPanelName){
				// console.log(typeof(TabPanelName),TabPanelName)
				if(TabPanelName=='0'){
					this.name=["Python","C","Java","C++","C#","Visual Basic","JavaScript","PHP","Assembly language","SQL"],
					this.data=[
					    {
					      "name": "Python",
					      "value": 14
					    },
					    {
					      "name": "C",
					      "value": 13
					    },
					    {
					      "name": "Java",
					      "value": 11
					    },
					    {
					      "name": "C++",
					      "value": 9
					    },
					    {
					      "name": "C#",
					      "value": 6
					    },
					    {
					      "name": "Visual Basic",
					      "value": 6
					    },
					    {
					      "name": "JavaScript",
					      "value": 2
					    },
					    {
					      "name": "PHP",
					      "value": 2
					    },
					    {
					      "name": "Assembly language",
					      "value": 2
					    },
					    {
					      "name": "SQL",
					      "value": 2
					    },
						{
							"name":"其他",
							"value":33
						}							  
					]
					this.showCharts(this.data)
					this.data2=[]
					this.showEcharts2(this.data,this.data2)
				}
				else if(TabPanelName=='1')
				{
					// this.name=["Python","C","Java","C++","C#","Visual Basic","JavaScript","PHP","Assembly language","SQL"],
					this.data2=[
					    {
					      "name": "Python",
					      "value": 14
					    },
					    {
					      "name": "C",
					      "value": 13
					    },
					    {
					      "name": "Java",
					      "value": 11
					    },
					    {
					      "name": "C++",
					      "value": 8
					    },
					    {
					      "name": "C#",
					      "value": 7
					    },
					    {
					      "name": "Visual Basic",
					      "value": 5
					    },
					    {
					      "name": "JavaScript",
					      "value": 2
					    },
						{
						  "name": "Assembly language",
						  "value": 2
						},
						{
						  "name": "SQL",
						  "value": 2
						},
					    {
					      "name": "PHP",
					      "value": 2
					    },
						{
							"name":"其他",
							"value":34
						}							  
					]
					this.showCharts(this.data2)
					this.showEcharts2(this.data,this.data2)
					// console.log(this.data2)
				}
				
				
			},
			show(data)
			{
				console.log(data)
			}
		},
	}
</script>

<style scoped>
	.tit{
	    text-align: center;
		margin-top: 100px;
	}
	.data{
	    margin:10px auto 0 auto;
	    width: 900px;
	    height: auto;
	}
	.oper{
		font-size: 0.875rem;
		cursor: pointer;
		color: #005CC5;
	}
	/* 鼠标放到删除上之后出现下划线 */
	/* 类名后面跟了  :xxx 就是伪类选择器 */
	.oper:hover{
		text-decoration: underline;
	}
	#tabs{
		width: 900px;
		margin: 100px auto;
	}
	.se{
		width: 100px;
		margin: 0 0 10px 30px;
	}
	.echarts{
		width: 70%;height:300px;margin:30px auto 30px auto;
	}
	.echarts2{
		width: 100%;
	}
	.el-carousel__item:nth-child(2n) {
	  background-color: #F0F8FF;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
	  background-color: #F0F9FF;
	}
	.answ{
		width:800px;
		margin: 100px auto 0 auto;
		margin-bottom: 20px;
		text-align: center;
	}
	.cont{
		width: 100%;
		background-color: #DCDCDC;
		height: 700px;
		overflow: auto;
	}
	.mess-cont{
		font-size: 16px;
		font-weight: bold;
		font-family: '仿宋';
		text-indent:2em;
	}
	.mess-info{
		margin-top: 20px;
		font-size: 0.8125rem;
		display: flex;
		flex-direction: row;
	}
</style>
