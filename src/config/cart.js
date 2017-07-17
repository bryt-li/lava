//购物车中所有商品的数量

const cart={};
const menu = require('./menu/');
for(var t in menu){
	cart[t] = {};
	for(var i in menu[t]){
		cart[t][i] = 0;
	}
};

module.exports=cart;
