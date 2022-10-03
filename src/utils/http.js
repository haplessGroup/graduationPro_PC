/* 方法一：自定义方法对axios进行封装 */
//对于数据请求的封装
import axios from 'axios'
// 请求电影数据
function httpForMovie(){
	const path="http://127.0.0.1:5000/moviesort"
	return axios.get(path)
}
// 请求电影评分数据
function httpForRate(){
	const path="http://127.0.0.1:5000/rate"
	return axios.get(path)
}
function httpForHotTravelCity(){
	const path="http://127.0.0.1:5000/travelcity"
	return axios.get(path)
}
function httpForDBMovieMessage(){
	const path="http://127.0.0.1:5000/dbmoviemessage"
	return axios.get(path)
}
function httpForTravelCityMessage(){
	const path="http://127.0.0.1:5000/hottravelcitymess"
	return axios.get(path)
}
function httpForProLaguage(){
	const path='http://127.0.0.1:5000/showprolanguage'
	return axios.get(path)
}
function httpForProLaguage4(){
	const path='http://127.0.0.1:5000/showprolanguage4'
	return axios.get(path)
}
function httpForGetProMessage(){
	const path="http://127.0.0.1:5000/getprolanguagemess"
	return axios.get(path)
}
function httpForGetCoronavirus(){
	const path="http://127.0.0.1:5000/selectcoronavirus"
	return axios.get(path)
}

/* 方法二：官方提供的封装 */
// const http=axios.create({
// 	baseURL:'http://127.0.0.1:5000',
// 	timeout:1000,
// 	headers:{}
// })
export default {
	httpForMovie,
	httpForRate,
	httpForHotTravelCity,
	httpForDBMovieMessage,
	httpForTravelCityMessage,
	httpForProLaguage,
	httpForProLaguage4,
	httpForGetProMessage,
	httpForGetCoronavirus
}