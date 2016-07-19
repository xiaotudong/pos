'use strict';
let printReceipt = (inputs) => {
  let CartItems = buildCartItems(inputs);
  let ItemsSubtotal = buildItemsSubtotal(CartItems);
  let ItemsReceipt = buildItemsReceipt(ItemsSubtotal);
  let Receipt = outputReceipt(ItemsReceipt);

  console.log(Receipt);
}

let buildCartItems =(inputs) => {

  let CartItems = [];
  let AllItems = loadAllItems();

  for(let input of inputs){
    let char = input.split('-');
    let barboad = char[0];
    let count = parseFloat (char[1] || 1);

    let CartItem = CartItems.find(CartItem => CartItem.Item.barcode === barboad);

    if(CartItem){
      CartItem.count++;
    }
    else{
      let Item = AllItems.find(Item => Item.barcode === barboad);
      CartItems.push({Item:Item,count:count});
    }
  }
  return CartItems;
}

let buildItemsSubtotal = (CartItems) => {
  let ItemsSubtotal = [];
  let Promotions = loadPromotions();

  for (let Cart of CartItems) {
    let price = Cart.count * Cart.Item.price;
    let saveprice = 0;
    let name = Promotions[0].barcodes;
    for (let Promotion of name) {
      if (Cart.Item.barcode === Promotion){
        saveprice = parseInt(Cart.count / 3) * Cart.Item.price;
     }
    }

    let subtotal = price - saveprice;
    let CartItem = Cart;

    ItemsSubtotal.push({CartItem:CartItem,price:price,saveprice:saveprice,subtotal:subtotal});
  }

  return ItemsSubtotal;
}

let buildItemsReceipt = (ItemsSubtotal) => {
  let ItemsReceipt = {};
  let total = 0;
  let save = 0;

  for (let Item of ItemsSubtotal) {
    total += Item.subtotal;
    save += Item.saveprice;
  }

  ItemsReceipt.ItemsSubtotal = ItemsSubtotal;
  ItemsReceipt.total = total;
  ItemsReceipt.save = save;

  return ItemsReceipt;
}

let outputReceipt = (ItemsReceipt) => {
  let Receipt = `***<没钱赚商店>收据***\n`;
  let ItemSubtotal = ItemsReceipt.ItemsSubtotal;

  for (let Item of ItemSubtotal){
    Receipt += `名称：` +  Item.CartItem.Item.name
            + `，数量：` + Item.CartItem.count + Item.CartItem.Item.unit
            + `，单价：` + Item.CartItem.Item.price.toFixed(2)
            + `(元)，小计：` + Item.subtotal.toFixed(2) + `(元)\n`;
  }

  Receipt += `----------------------
总计：` + ItemsReceipt.total.toFixed(2) + `(元)
节省：` + ItemsReceipt.save .toFixed(2)+ `(元)
**********************`;

  return Receipt;
}
