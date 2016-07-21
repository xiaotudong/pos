'use strict';

function printReceipt(tags) {

  const allItems = loadAllItems();
  const cartItems = buildCartItems(tags,allItems);

  const allPromotions = loadPromotions();
  const receiptItems = buildReceiptItems(cartItems,allPromotions);

  const receipt = buildReceipt(receiptItems);
  const receiptText = buildReceiptText(receipt);

  console.log(receiptText);

}

function  buildCartItems(tags,allItems) {
  const cartItems = [];

  for (const tag of tags){
    const tagArray= tag.split('-');
    const barcode = tagArray[0];
    const count = parseFloat(tagArray[1] ||1);

    const cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode)

    if(cartItem){
      cartItem.count += count;
    }else {
      const item = allItems.find(item => item.barcode === barcode);
      cartItems.push({item,count});
    }
  }
  return cartItems;
}

function findPromotionType(barcode,promotions) {
  const promotion = promotions.find(promotion => promotion.barcodes.some(b => b === barcode));
  return promotion ? promotion.type :undefined;
}

function discount(count,price,promotionType) {
  let subtotal = count * price;
  let saved = 0;

  if(promotionType === 'BUY_TWO_GET_ONE_FREE'){
    saved = parseInt(count / 3) * price;
  }
  subtotal -= saved;

  return{saved,subtotal}
}

function buildReceiptItems(cartItems,allPromotiond) {

  return cartItems.map(cartItem => {
    const promotionType = findPromotionType(cartItem.item.barcode,allPromotiond);
    const {saved,subtotal} = discount(cartItem.count,cartItem.item.price,promotionType);
    return {cartItem,saved,subtotal}
  })
}


function buildReceipt(receiptItems) {
    let total = 0;
    let saveTotal = 0;

    for(const receiptItem of receiptItems){
      total += receiptItem.subtotal;
      saveTotal += receiptItem.saved;
    }
    return{receiptItems,total,saveTotal}
  }
 
function buildReceiptText(receipt) {
    const  receiptItems = receipt.receiptItems
      .map(receiptItem => {
        const cartItem = receiptItem.cartItem;

        return `名称：${cartItem.item.name}，\
数量：${cartItem.count}${cartItem.item.unit}，\
单价：${fomatMoney(cartItem.item.price)}(元)，\
小计：${fomatMoney(receiptItem.subtotal)}(元)`
      }).join('\n');

    return `***<没钱赚商店>收据***
${receiptItems}
----------------------
总计：${fomatMoney(receipt.total)}(元)
节省：${fomatMoney(receipt.saveTotal)}(元)
**********************`;
  }

function fomatMoney(money) {
  return money.toFixed(2);
}
