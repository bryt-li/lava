module.exports = {
	name: "三文鱼菠色面",
	original_price: 3900,
	price: 3300,
	rice: false,
	season: '和风汁',
	delivery_term: "提前一天预订",
	slogon: "三文鱼约会菠菜面，很多蔬菜在围观",
	ingredients: {
		烤三文鱼:"9%",
		山药:"9%",
		紫薯:"5%",
		菠菜面:"14%",
		鸡蛋:"13%",
		樱桃蕃茄:"6%"
	},
	intro: ()=>{
		return (
			<p>想给你和风感觉的<strong>清爽！鲜美！</strong><br/>
			在你品味的时候，多一些<strong>小清新</strong>的异国味道</p>
		)
	},
	ingredients_intro: ()=>{
		return (
			<p>烤三文鱼、山药、菠菜面、鸡蛋、玉米粒、西兰花<br/>
			紫薯、红腰豆、口蘑、花菜、节瓜、彩椒、樱桃蕃茄<br/>
			樱桃萝卜、豇豆、黄瓜、罗马生菜</p>
		)
	},
	nutrition:{
		C:319,
		Cx:58,
		Fat:14,
		Pro:42
	}
}