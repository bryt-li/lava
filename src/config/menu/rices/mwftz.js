module.exports = {
	name: "美味饭团子",
	original_price: 49,
	price: 45,
	rice: false,
	season: "和风汁",
	delivery_time: "07-05 周一12:30之前",
	slogon: "正宗日本风味",
	intro: ()=>{
		return (
			<p>想给你和风感觉的<strong>清爽鲜美</strong><br/>在你品味的时候，多一些小清新异国味道</p>
		)
	},
	majors: {
		"烤三文鱼":"9%",
		"山药":"9%",
		"紫薯":"5%",
		"菠菜面":"14%",
		"鸡蛋":"13%",
		"樱桃蕃茄":"6%"
	},
	ingredients: ()=>{
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