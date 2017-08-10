module.exports = {
	name: "鲜橙鳄梨虾仁",
	original_price: 4500,
	price: 3900,
	rice: false,
	season: '意式罗勒酱',
	delivery_term: "提前一天预订",
	slogon: "虾仁鳄梨鲜意十足、搭配鲜橙无敌可口",
	ingredients: {
		虾仁:"11%",
		牛油果:"7%",
		鲜橙:"9%",
		口蘑:"7%",
		蝴蝶面:"9%",
		藜麦:"9%"
	},
	intro: ()=>{
		return (
			<p>为你创造出极鲜的存在<br/>
			把<strong>鲜意、酸甜、谷香</strong>完美融合、吮指回味</p>
		)
	},
	ingredients_intro: ()=>{
		return (
			<p>虾仁、藜麦、蝴蝶面、牛油果、鲜橙、西兰花<br/>
			口蘑、紫薯、节瓜、红腰豆、玉米粒<br/>
			樱桃蕃茄、樱桃萝卜、花菜、彩椒、混合生菜</p>
		)
	},
	nutrition:{
		C:310,
		Cx:60,
		Fat:9,
		Pro:20
	}
}