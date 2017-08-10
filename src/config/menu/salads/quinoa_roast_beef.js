module.exports = {
	name: "超能藜麦烤肉",
	original_price: 4900,
	price: 4500,
	rice: true,
	season: '香培酱',
	delivery_term: "提前一天预订",
	slogon: "藜麦搭配牛肉、高蛋白超能量、健身增肌必备",
	ingredients: {
		西兰花:"14%",
		烤牛肉:"12%",
		香草烤鸡胸:"12%",
		鸡蛋:"20%",
		樱桃蕃茄:"14%",
		藜麦:"16%"
	},
	intro: ()=>{
		return (
			<p>听说你要采纳<strong>史前人类的高蛋白食谱</strong>?<br/>
			这一份搭配小饭团的优质蛋白餐最适合增肌健身的你</p>
		)
	},
	ingredients_intro: ()=>{
		return (
			<p>西兰花、烤牛肉、香草烤鸡胸<br/>
			樱桃蕃茄、藜麦、黄瓜</p>
		)
	},
	nutrition:{
		C:490,
		Cx:37,
		Fat:17,
		Pro:47
	}
}