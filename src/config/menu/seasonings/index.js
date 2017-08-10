module.exports={
	japanese_dressing:{
		name:"和风汁",
		intro:"鲜美微甜",
		ingredients: "鳗鱼汁,蜂蜜,绿芥末",
		nutrition:{
			C:319,
			Cx:58,
			Fat:14,
			Pro:42
		}
	},
	samba_crush:{
		name:"桑巴粉",
		intro:"咸香鲜味",
		ingredients:"鳗鱼汁,蜂蜜,绿芥末",
		nutrition:{
			C:319,
			Cx:58,
			Fat:14,
			Pro:42
		}
	},
	italian_pesto:{
		name:'意式罗勒酱',
		intro:'清香淡咸',
		ingredients:'橄榄油,罗勒叶,核桃仁',
		nutrition:{
			C:188,
			Cx:0,
			Fat:21,
			Pro:1
		},
		extra: ()=>{
			return (
				<p>有丁香气息，<br/>不影响质感与原味，同时滋润每种食材！</p>
			)
		}
	},
	roasted_sesame_dressing:{
		name:'香培酱',
		intro:'咸鲜芝香',
		ingredients:'芝麻,橄榄油,蛋黄',
		nutrition:{
			C:104,
			Cx:1,
			Fat:19,
			Pro:7
		},
		extra: ()=>{
			return (
				<p>烤芝麻香气扑鼻、蛋黄再提鲜<br/>
				最佳搭配肉类和乌冬面，蔬菜秒变美味！</p>
			)
		}
	},
}
