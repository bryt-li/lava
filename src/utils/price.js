const MENU = require('../config/menu/');

const calculatePrice = (items) => {
	let total = 0;
	let saving = 0;
	let order = [];
	for(var t in items){
		for(var i in items[t]){
			var quantity = items[t][i];
			if(quantity>0){
				var item = MENU[t][i];
				var price = item.price;

				for(var i=0;i<quantity;i++)	
					order.push({item:item,price:item.price*1.0});
			}
		}
	}

	order.sort((a,b) =>{
		return b.price - a.price;
	});

	//how many discount，the second item have 70% discount
	let num = parseInt(order.length / 2) - 1;
	for(var i=0;i<=num;i++){
		order[i].price = order[i]['item'].price*0.7;
		saving += order[i]['item'].price - order[i].price;
	}
	for(var i=0;i<order.length;i++){
		total += order[i].price;
	}
	return {total:total, saving: saving};
}


module.exports = {
  calculatePrice
}
