import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
	  token:'',
	  cartarry:JSON.parse(localStorage.getItem('cartarry')) || [],//存储购物车商品数组 如果有localstorage则取里面的数据否则为空
  },
  mutations: {
	  //设置vuex的token
	  settoken(state,token){
		  state.token=token
	  },
	  //添加商品到购物车
	  tocart(state,tag){
		  let goods=state.cartarry.find(v=>v.title==tag.label) //判断购物车商品名字跟tag里的label是否相等
		  if(goods){
			  goods.cartcount+=1
		  }else{
			  state.cartarry.push({title:tag.label,cartcount:1})
		  }
	  },
	  //购物车数量加1
	  cartadd(state,index){
		  state.cartarry[index].cartcount++
	  },
	  //购物车数量减1
	  cartremove(state,index){
		  if(state.cartarry[index].cartcount>1){
			  state.cartarry[index].cartcount--
		  }else{
			  state.cartarry.splice(index,1)
		  }
	  },
	  //清空
	  clearcart(state){
		  state.cartarry=[]
	  }
  },
  actions: {
  },
  //相当于我们vue的计算属性 实现购物车小红点
  getters:{
	  countsum:state=>{
		  let num=0
		  state.cartarry.forEach(v=>{
			  num+=v.cartcount
		  })
		  return num
	  }
  },
  modules: {
  }
})

//数据持久化
//1修改程序让let store = new ....,再在最后暴漏出store
//内置方法监听，监听的时我们每次调用mutations的时候，都会先进入这个方法，然后我们可以做一些自己的操作
store.subscribe((mutations,state)=>{
	localStorage.setItem('cartarry',JSON.stringify(state.cartarry)) //设置items的存储并且用JSON序列化
})

export default store
