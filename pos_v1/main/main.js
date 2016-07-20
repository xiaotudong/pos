'use strict';
let printReceipt = (inputs) => {
  let cartItems = buildCartItems(inputs);
  let itemsSubtotal = buildItemsSubtotal(cartItems);
  let itemsReceipt = buildItemsReceipt(itemsSubtotal);
  let receipt = outputReceipt(itemsReceipt);

  console.log(receipt);
}

let buildCartItems =(inputs) => {

  let cartItems = [];
  let allItems = loadAllItems();

  for(let input of inputs){
    let char = input.split('-');
    let barboad = char[0];
    let count = parseFloat (char[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barboad);

    if(cartItem){
      cartItem.count++;
    }
    else{
      let item = allItems.find(item => item.barcode === barboad);
      cartItems.push({item:item,count:count});
    }
  }
  return cartItems;
}

 let buildItemsSubtotal = (cartItems) => {
   return cartItems.map(cartItem => {
     let promotionType = getPromotionType(cartItem.item.barcode);
     let {saveprice,subtotal} = discount(cartItem,promotionType);
     return {cartItem,saveprice,subtotal}
   })
 }

let getPromotionType = (barcode) => {
  let promotions = loadPromotions();
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : undefined;
}

let discount = (cartItem,promotionType) =>{
  let freeItemsCount = 0;

  if(promotionType === 'BUY_TWO_GET_ONE_FREE'){
    freeItemsCount = parseInt(cartItem.count /3);
  }

  let price = cartItem.count * cartItem.item.price;
  let saveprice = freeItemsCount * cartItem.item.price;
  let subtotal = price -saveprice;

  return {saveprice,subtotal}
}

let buildItemsReceipt = (itemsSubtotal) => {
  let total = 0;
  let save = 0;

  for (let item of itemsSubtotal) {
    total += item.subtotal;
    save += item.saveprice;
  }

  return {itemsSubtotal,total,save};
}

let outputReceipt = (itemsReceipt) => {

  let itemSubtotal = itemsReceipt.itemsSubtotal
  .map(items => {
    return `名称：${items.cartItem.item.name}，\
数量：${items.cartItem.count}${items.cartItem.item.unit}，\
单价：${formatMoney(items.cartItem.item.price)}(元)，\
小计：${formatMoney(items.subtotal)}(元)`;
  })
      .join('\n');

  return `***<没钱赚商店>收据***
${itemSubtotal}
----------------------
总计：${formatMoney(itemsReceipt.total)}(元)
节省：${formatMoney(itemsReceipt.save)}(元)
**********************`;
}

let formatMoney = (money) => {
  return money.toFixed(2);
}

