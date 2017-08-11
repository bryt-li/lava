module.exports = {
	love_rice_roll:	{
		name: "爱心便当饭团子",
		original_price: 1500,
		price: 900,
		rice: false,
		season: null,
		delivery_term: "提前一天预订",
		slogon: "特A级海苔，精选东北大米，日式和风汁调味，好评连连推荐",
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
	}
};
