module.exports = {
	name: "墨米鲜炙呑拿",
	original_price: 3900,
	price: 3400,
	rice: false,
	season: null,
	delivery_term: "提前一天预订",
	slogon: "激活你所有的感官，黑米绝配烤吞拿",
	ingredients: {
		炙吞拿鱼:"12%",
		牛油果:"6%",
		飞鱼籽:"3%",
		裙带菜:"6%",
		黑米:"48%",
		腰果:"2%"
	},
	intro: ()=>{
		return (
			<p><strong>软糯、鲜美、清新</strong>这份沙拉将激活你所有的感官<br/>
			此款沙拉<strong>已预拌好</strong>，吸引了全部美味，无需额外搭配酱汁</p>
		)
	},
	ingredients_intro: ()=>{
		return (
			<p>黑米、吞拿鱼、牛油果、飞鱼籽<br/>裙带菜、樱桃萝卜、黄瓜<br/>腰果、海苔、洋葱、木鱼味噌醬</p>
		)
	},
	nutrition:{
		C:460,
		Cx:109,
		Fat:31,
		Pro:36
	}
}