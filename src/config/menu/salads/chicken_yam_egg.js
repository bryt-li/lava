module.exports={
	name: "鸡胸紫薯鸡蛋沙拉",
	original_price: 4900,
	price: 545,
	rice: false,
	season: "和风汁",
	delivery_time: "07-05 周一12:30之前",
	slogon: "元气满满，补充全天能量",
	ingredients: {
		鸡胸肉丝:"9%",
		紫薯:"5%",
		鸡蛋:"13%",
		樱桃蕃茄:"6%",
		混合生菜:"20%"
	},
	intro: ()=>{
		return (
			<p>想给你和风感觉的<strong>清爽鲜美</strong><br/>在你品味的时候，多一些小清新异国味道</p>
		)
	},
	ingredients_intro: ()=>{
		return (
			<p>烤三文鱼，山药，菠菜面，鸡蛋，玉米粒，西兰花<br/>紫薯，红腰豆，口蘑，花菜，节瓜，彩椒，樱桃蕃茄<br/>樱桃萝卜，豇豆，黄瓜，罗马生菜</p>
		)
	},
	nutrition:{
		C:319,
		Cx:58,
		Fat:14,
		Pro:42
	}
}