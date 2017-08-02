module.exports={
	name: "绿野仙踪牛肉",
	original_price: 4500,
	price: 3900,
	rice: false,
	season: "意式罗勒酱",
	delivery_time: "提前一天预订 18:30之前",
	slogon: "牛肉、水果、味蕾大和谐",
	ingredients: {
		烤牛肉:"14%",
		通心粉:"23%",
		红心火龙果:"9%",
		芦笋:"7%",
		芒果:"12%",
		蓝莓:"3%",
	},
	intro: ()=>{
		return (
			<p><strong>烤牛肉、水果、鲜蔬</strong>完成味蕾大和谐<br/>丰富可口，欢迎来到这座新鲜小森林！</p>
		)
	},
	ingredients_intro: ()=>{
		return (
			<p>烤牛肉、通心粉、芒果、火龙果<br/>芦笋、玉米粒、红腰豆，蓝莓、樱桃蕃茄<br/>红甜椒、芝麻菜、薄荷、罗马生菜</p>
		)
	},
	nutrition:{
		C:367,
		Cx:57,
		Fat:7,
		Pro:20
	}
}