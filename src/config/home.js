//在首页显示的所有商品

const home={};
const menu = require('./menu/');
for(var t in menu){
	home[t] = [];
	for(var i in menu[t]){
		home[t].push(i);
	}
};

module.exports=home;
