<template>
	<el-header style="padding: 0;">
		<NaviBar></NaviBar>
	</el-header>
	<el-main style="padding: 0;">
		<div id="" style="width: 1000px;margin: 0 auto;">
			<h2 style="text-align: center;margin-top: 30px;">2021年中国热门旅游城市</h2>
			<el-table
			:data="hottravelcity" 
			height="400" 
			style="width: 900px;margin: 30px auto 0  auto;" 
			stripe="true">
				<el-table-column prop="id" label="ID" width="200" />
				<el-table-column prop="cityname" label="城市名" width="200" />
				<el-table-column prop="popularityindex" label="旅游热度" width="200" />
				<el-table-column prop="tourmoney" label="旅游产值总额" width="200" />
				<el-table-column prop="tournumber" label="游客人数" width="100" />
			</el-table>
			<div style="margin-top: 20px;float: right;">
				数据来源----Maigoo
			</div>
		</div>
		
		<!-- tab页 -->
		<div style="width: 1000px;margin: 100px auto;">
			<h2 style="text-align: center;">四季旅游城市推荐</h2>
			<el-tabs tab-position="left" style="height: 300px;overflow: auto;" class="demo-tabs">
			    <el-tab-pane label="春" style="overflow-y: auto;">
					<!-- 折叠面板 -->
					<el-collapse accordion>
					    <el-collapse-item title="扬州" name="1">
					        <div>
					          “烟花三月下扬州”，李白的这句诗让无数人记住了扬州这个地方，也是春季最推荐观光的地方。三月的扬州，花红柳绿，春风送暖，景色秀丽，煞是好看，而春季来扬州，必游瘦西湖。
					          瘦西湖可以说是扬州最著名的湖上园林了，自然景观旖旎多姿，尤其在春季，绽放出最美的姿态。绿柳成荫，再加上山茶、石榴、杜鹃、碧桃等花树相伴，每年吸引着各地游客来踏青赏花。
							  而且，这里还是乾隆皇帝下江南时的必游之地以及千百年来无数文人墨客的流连之地，如今看到的大虹桥、钓鱼台、白塔、熙春台等建筑景观，都与乾隆皇帝有着不可分割的关系。景区内众多墨宝和故事，也非常值得品味。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="杭州" name="2">
					        <div>
					          这座自古就被人称作“人间天堂”的杭城，山、泉、湖、桥、塔、寺样样俱全，风景中的色彩也随着时间逐渐多样化起来。而三月的杭州，春风恣意荡漾，桃花明艳，新柳如烟，处处呈现春意盎然的生机，春天是最佳游玩时间。
							  说到杭州，或许大多数人都会想到西湖，它无疑是西湖美的代表，以其秀丽的湖光山色和众多的名胜古迹闻名中外，成为中国著名的旅游胜地。西湖的美在于晴天水潋滟，雨天山空蒙。
							  无论雨雪晴阴，无论早霞晚辉，都能变幻成景；在春花，秋月，夏荷，冬雪中各具美态。而游览西湖，可步行，可骑行，可乘坐游船，无论哪一种方式，都能让你领略到西湖之美。若你什么都不想做，也可以寻找一个安静的角落，静静地发呆，也是非常享受的。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="丽江" name="3">
					        <div>
					          丽江位于云南省西北部， 历史悠久，以其独特的人文景观和自然风光，成为我国知名的旅游城市。神秘的“东方女儿国”泸沽湖，安静闲适的束河古镇，巍峨雄伟的玉龙雪山，山清水秀的拉市海和波澜壮阔的虎跳峡都是丽江非常知名的景点。
					          
					          而且因为丽江独特的地理和气候环境，形成了温暖宜人的气候，一年四季都非常适合游玩，但以3、4月份最美，此时的丽江古城和玉龙雪山光芒四射，散发出最美的一面。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="三亚" name="4">
					        <div>
					          三亚，是中国最南部的热带滨海旅游城市，我国著名的海滨城市，得天独厚的气候形成了最美的海岛风光和最佳的空气质量，从而有了“东方夏威夷”的美誉。而水清沙白的海滩，枝繁叶茂的雨林及物美价廉的海鲜是三亚的招牌。
					        </div>
					    </el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			    <el-tab-pane label="夏">
					<el-collapse accordion>
					    <el-collapse-item title="哈尔滨" name="1">
					        <div>
					          哈尔滨是首先要推荐的城市，因为这里也是被很多人所忽略的避暑胜地。以哈尔滨为首的黑龙江绝对是国内最佳的避暑胜地，这里夏天环境优雅，温度也不算太高，交通各方面也比较方便。自从去年去了一次哈尔滨，我就对这里的夏天产生了很大的改观。当然，如果你觉得哈尔滨还不够凉爽，可以继续向北走，那么一定会有个让你觉得十分凉爽的城市。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="贵阳" name="2">
					        <div>
					          贵阳虽然秋冬天常年见不到太阳，但是绝对是个十分适合避暑的城市。这里夏天的平均气温在20多度，环境比较原生态，各方面环境也还不错，对部分人来说除了食物太辣受不了，其他都是十分理想的度假胜地。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="丽江" name="3">
					        <div>
					          云南也是不少人喜欢的避暑胜地，以往每年我都会在最热的时间去丽江带上一个月。虽然大理给人的感觉更好，但是我还是更喜欢丽江。玉龙雪山脚下，只要找个没有太阳的地方，你就会觉得十分凉爽。而且丽江束河古镇那一带这两年游客也不算多，最适合悠闲地避暑了。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="六盘水" name="4">
					        <div>
					          六盘水也是个十分适合避暑的地方，这里被誉为中国唯一的“凉都”，从这个称号就可以看出来六盘水绝对是个最适合避暑的地方。这里的平均气温20多度，环境优美，适合游玩的地方也特别多。不仅有草原，度假村，还有各种有意思的游玩项目。
					        </div>
					    </el-collapse-item>
						<el-collapse-item title="承德" name="5">
						    <div>
						      承德也是个宝藏旅行地，可能很多人听到承德的第一印象就是承德避暑山庄，作为清朝皇帝的避暑胜地，可见承德的凉爽之处。当然，承德除了避暑山庄，还有很多值得玩的地方，当然，如果你想在承德找个不吹空调都容易感冒的地方，非木兰围场那一带莫属了。
						    </div>
						</el-collapse-item>
						<el-collapse-item title="阿尔山市" name="6">
						    <div>
								阿尔山市大草原绝对是每年夏天很多人避暑的一个选择，虽然这里对大多数地方的人来说都是比较偏远，但是这里的环境十分漂亮，空气也很好，整个城市虽然很小，但是却很精致。在阿尔山避暑，绝对不要太凉快。
						    </div>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			    <el-tab-pane label="秋">
					<el-collapse accordion>
					    <el-collapse-item title="北京" name="1">
					        <div>
								北京实际上是一座一年四季都可以去旅游的城市，但是为什么推荐秋天呢？首先，秋天的北京，气候凉爽，不必担心会像夏日那样让人热喘不上气。同时，北京的秋季非常美，尤其是香山的红叶，鼎鼎大名，如果有兴趣的，可以去看看。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="西安" name="2">
					        <div>
								和北京很相似，西安的景点基本上也是以古建筑居多，但是秋天的西安，绝对是其他季节无法比拟的，实在太美。西安的秋天，层林尽染，丹桂飘香，金黄的银杏树下，这座千年古城重新焕发出生机与活力，让人不得不爱。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="敦煌" name="3">
					        <div>
								推荐甘肃敦煌的理由只有一个：景美人少。敦煌是河西走廊十分重要的一座城市，因为大名鼎鼎的莫高窟而享誉世界，这里除了世界闻名的莫高窟，还有月牙泉鸣沙山，千佛洞、玉门关、阳关、雅丹魔鬼城等等。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="杭州" name="4">
					        <div>
								说起杭州，很多人的脑海中不禁会想起成片的荷花开满西湖的美景，殊不知，秋天的杭州同样值得游览。进入秋季，杭州也开始凉快了下来，城市不仅充满了湿润，更是有满城的桂花香，而这个时节，也正是品尝杭州桂花糕的最好季节。
								西湖依旧是杭州最好的景区，秋天的西湖，没有了夏天的那份躁动，让人能感到一种心旷神怡，乘舟于西湖之上，欣赏落日余晖，不得不说，连人的心都会多一份宁静。
					        </div>
					    </el-collapse-item>
						<el-collapse-item title="海西" name="5">
						    <div>
								海西很大，所以来海西旅游最佳的旅游方式是自驾游。海西值得一看的，基本上都是自然风光，像大家比较熟悉的天空之镜茶卡盐湖、翡翠湖、东台吉乃尔湖、水上雅丹等等，都令人印象深刻。一般来说，来青海旅游最好的季节是夏天，但是秋天有它无法比拟的优势，那就是省钱，而且海西秋天的景色根本不会输给夏天。
						    </div>
						</el-collapse-item>
						<el-collapse-item title="林芝" name="6">
						    <div>
								很多人选择去林芝旅游，都是选择春天，因为春天的桃花实在太美。其实林芝的秋天同样会让人难忘，要知道这里曾被评为是“中国秋天最美的地方之一”，秋天的林芝，犹如一幅巨大的油画，色彩鲜明，别总惦记林芝的春天，它的秋季同样让人着迷。
								秋天的林芝，风景不会输给黄龙九寨，这个季节的南迦巴瓦都显得格外精神，至于这里的秋季，那只能用天高云淡、层林尽染、秋意盎然来形容了，美的让人陶醉，让人心动。
						    </div>
						</el-collapse-item>
						<el-collapse-item title="大理" name="6">
						    <div>
								大理的风景，在秋季显得格外迷人，尤其是夏末秋初的时候，色彩十分鲜明。大理的风景以面朝洱海，背靠苍山是一种什么样的感受呢？除了苍山洱海，大理还有很多古镇和古城，不仅特色鲜明，而且较为小众，保持着较好的原貌，非常值得去打卡。
						    </div>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			    <el-tab-pane label="冬">
					<el-collapse accordion>
					    <el-collapse-item title="哈尔滨" name="1">
					        <div>
					          冬季旅行首选哈尔滨，哈尔滨的冬季是一个浪漫的童话城市，有着梦幻的索菲亚大教堂，漫天的雪花飘落，映衬着街角的霓虹灯，堪比浪漫偶像剧场景。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="昆明" name="2">
					        <div>
					          昆明一年四季都是四季如春，即使到了冬季，昆明也同样吸引着无数游客前来参观，成群结队的红嘴鸥来昆明过冬，已成为一道亮丽的风景线。
							</div>  
					    </el-collapse-item>
					    <el-collapse-item title="西双版纳" name="3">
					        <div>
					          西双版纳自然资源丰富，热带雨林自然景观令人十分赞叹，全年平均气温在22度左右，冬季去，景区门票淡季价格更便宜，在这里还可以感受西双版纳少数民族的特色风情和历史文化习俗，推荐大家一定要去傣族园和西双版纳热带雨林动物园。
					        </div>
					    </el-collapse-item>
					    <el-collapse-item title="杭州" name="4">
					        <div>
					          俗话说得好“上有天堂，下有苏杭”，提起杭州，首先想到杭州西湖，大部分游客喜欢春夏秋季游玩西湖，但是你见过冬季的西湖吗？下了雪的西湖，宛如披上了一层白色的外衣，十分的灵动；
					        </div>
					    </el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			  </el-tabs>
		</div>
		<!-- 专业人士预测 -->
		<div style="width:800px;margin: 100px auto 0 auto;margin-bottom: 20px;text-align: center;">
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
				<div id="message" v-if="commentslist.length>0" style="word-wrap:break-word">
					<div v-for="(item,index) in commentslist" :key="index">
						<!-- 用户留言内容 -->
						<div style="font-size: 16px;font-weight: bold;font-family: '仿宋';text-indent:2em;">
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
	</el-main>
	<!-- 回到顶部按钮 -->
	<div style="right: 10%;">
		<el-backtop style="background-color: #F0FFF0;"/>
	</div>
	<el-footer style="padding: 0;">
		<Footer></Footer>
	</el-footer>
</template>
<script>
	import http from '@/utils/http.js'
	import NaviBar from '@/components/navibar.vue'
	import Footer from '@/components/footer.vue'
	import {mapState} from 'vuex'
	import axios from 'axios'
	import {ElMessage,ElMessageBox} from "element-plus"
	export default{
		components:{
			NaviBar,
			Footer,
		},
		data(){
			return{
				hottravelcity:[],
				activeNames:"1",
				textarea:'',
				commentslist:[],
				question:[
					"1、旅游行业目前的前景如何?",
					"2、目前哪些地方更受游客欢迎?",
					"3、如何避免“照片与实物”严重不符的现象发生?"
				]
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		mounted(){
			this.showTravelCity()
			this.showTravelCityMessage()
		},
		methods:{
			open(index){
				// 1、旅游行业目前的前景如何?
				if(index==0)
				{
					ElMessageBox.alert(
					'1、<strong>发展历程</strong>:纵观中国旅游业的发展历程,自1978年以来,国家开始重视并大力发展旅游业。随着社会经济发展、人民生活水平提高及消费观念升级,旅游门槛开始下移,由官方接待逐步向普通大众开放,旅游越来越成为居民日常生活的组成部分,出境旅游、入境旅游、国内旅游逐渐成为旅游业的三大发展形式;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>中国旅游行业发展现状</strong>:2012至2019年国内旅游人次稳步增长,2020年受到新冠肺炎疫情限制,旅游总人次下降至28.79亿人次,同比减少52.1%，2021年回升至32.46亿人次,同比增长12.8%,用户出游意愿正在逐步恢复。2021年国内旅游总人次为32.46亿,其中城镇居民23.42亿人次,同比增长13.4%;农村居民9.04亿人次,同比增长11.1%;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、<strong>旅游行业总收入</strong>:据文旅部数据,2021年国内旅游收入(旅游总消费)约为2.92万亿元,较2020年增加0.69万亿元,同比增长31%,恢复到2019年的51%;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、<strong>发展前景</strong>:2021年旅游行业经历了“中高后低”的复苏受阻之路,国内散发疫情不断扰动行业的复苏进程,防疫管控力度从此前的渐进放松趋势转为敏捷收紧态势,相信随着各项防疫措施手段的有效实施,旅游行业终将迈入更高水平的新常态,复苏之路虽然曲折但依然持续,国内部分具备扩张成长潜力、经营管理能力较强、资源禀赋较为优质的景区龙头和旅游出行产业链资源强、用户粘性高的OTA龙头依然有望迎来景气拐点,成为后疫情时代在出行和服务业板块复苏的生力军;'
					, 
					'解答:', 
						{
							confirmButtonText: '我知道了',
							// 将 dangerouslyUseHTMLString 属性设置为 true，message 就会被当作 HTML 片段处理。
							dangerouslyUseHTMLString: true,
						},
					)
				}else if(index==1){
					// 2、目前哪些地方更受游客欢迎?
					ElMessageBox.alert(
					'就上表的数据来看,目前重庆等地是比较受游客喜欢的旅游景点。但由于受到目前席卷国内外的疫情的影响,数据也是在不断的发生变化,对于目前而言,上海疫情严重,严重影响了游客去上海游玩的兴趣,'+
					'所以这个问题目前没有准确的答案。'
					, 
					'解答:', 
						{
							confirmButtonText: '我知道了',
							// 将 dangerouslyUseHTMLString 属性设置为 true，message 就会被当作 HTML 片段处理。
							dangerouslyUseHTMLString: true,
						},
					)
				}else if(index==2){
					ElMessageBox.alert(
					'1、<strong>询问当地人</strong>:如果你想知道那些网红景点是不是真的和照片上一摸一样时,个人认为最好的办法就是找个当地人问问。当然,你有去过的朋友或者亲戚在附近的话,那就非常的lucky了;'+
					'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、<strong>网络查找</strong>:大概意思就是从你看到这个景点信息的来源之处或者其他平台(例如:某音、某红书等等)找到相关景点的信息,翻看下方去过游客的评论,'+
					'这样你就大概知道网红景点是不是真的存在啦~<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(如果有不恰当的地方请原谅。如有更好的办法,请提交给后台人员嗷~)'
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
			showTravelCity(){
				http.httpForHotTravelCity().then(res=>{
					this.hottravelcity=res.data
					console.log(this.hottravelcity)
				})
			},
			showTravelCityMessage(){
				http.httpForTravelCityMessage().then(res=>{
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
			sureToSend(){
				const path="http://127.0.0.1:5000/travelmessosend"
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
							"travelaccount":user.account,
							"travelnickname":user.nickname,
							"travelidentity":user.identity,
							"travelcontent":this.textarea}
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
			deleteMessage(id){
				const path="http://127.0.0.1:5000/delethottravelcitymess"
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
			}
		}
	}
</script>

<style scoped>
	.tit{
	    text-align: center;
	    padding-top: 100px;
	    font-family: "楷体";
	}
	.demo-collapse{
		width: 80%;
		margin: 100px auto 0 auto;
	}
	p{
		text-indent: 2em;
	}
	.el-carousel__item:nth-child(2n) {
	  background-color: #F0F8FF;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
	  background-color: #F0F9FF;
	}
	.el-collapse-item>div{
		text-indent: 2em;
		font-size: 16px;
	}
</style>
