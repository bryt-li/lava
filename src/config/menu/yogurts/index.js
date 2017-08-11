module.exports={
	fruits_yogurt: {
		name: "水果麦片优酪",
		original_price: 2500,
		price: 1900,
		delivery_term: "提前一天预订",
		slogon: "消食解腻、补充能量",
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
	},
}
