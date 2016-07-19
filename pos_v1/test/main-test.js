'use strict';

describe('pos', () => {
  describe('buildCartItems', () => {
    let inputs;

    beforeEach(() => {
      inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
      ];
    });

    it('printf CartItems', () => {
      const CartItems = buildCartItems(inputs);

      const expectText = [
        {
          Item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        {
          Item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        {
          Item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        }
      ];
      expect(CartItems).toEqual(expectText);
    });
  });

  describe('buildItemsSubtotal', () => {
    let CartItems = [
      {
        Item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        Item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        Item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];

    it("printf ItemsSubotal", () => {
      const ItemsSubtotal = buildItemsSubtotal(CartItems);

      const expectText = [
        {
          CartItem: {
            Item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          price: 15.00,
          saveprice: 3.00,
          subtotal: 12.00
        },
        {
          CartItem: {
            Item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          price: 30.00,
          saveprice: 0.00,
          subtotal: 30.00
        },
        {
          CartItem: {
            Item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          price: 13.50,
          saveprice: 4.50,
          subtotal: 9.00
        }
      ]
      expect(ItemsSubtotal).toEqual(expectText);
    });
  });

  describe("buildItemsReceipt", () => {
    let ItemsSubtotal = [
      {
        CartItem: {
          Item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        price: 15.00,
        saveprice: 3.00,
        subtotal: 12.00
      },
      {
        CartItem: {
          Item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        price: 30.00,
        saveprice: 0.00,
        subtotal: 30.00
      },
      {
        CartItem: {
          Item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        },
        price: 13.50,
        saveprice: 4.50,
        subtotal: 9.00
      }
    ]

    it("printf ItemsReceipt", () => {
      const ItemsReceipt = buildItemsReceipt(ItemsSubtotal);

      const expectText = {
        ItemsSubtotal: [
          {
            CartItem: {
              Item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 5
            },
            price: 15.00,
            saveprice: 3.00,
            subtotal: 12.00
          },
          {
            CartItem: {
              Item: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2
            },
            price: 30.00,
            saveprice: 0.00,
            subtotal: 30.00
          },
          {
            CartItem: {
              Item: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3
            },
            price: 13.50,
            saveprice: 4.50,
            subtotal: 9.00
          }
        ],
        total: 51.00,
        save: 7.50
      }
      expect(ItemsReceipt).toEqual(expectText);
    });
  });

  describe("outputReceipt", () => {
    let ItemsReceipt = {
      ItemsSubtotal: [
        {
          CartItem: {
            Item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          price: 15.00,
          saveprice: 3.00,
          subtotal: 12.00
        },
        {
          CartItem: {
            Item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          price: 30.00,
          saveprice: 0.00,
          subtotal: 30.00
        },
        {
          CartItem: {
            Item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          price: 13.50,
          saveprice: 4.50,
          subtotal: 9.00
        }
      ],
      total: 51.00,
      save: 7.50
    }

    it("printf Receipt", () => {
      const Receipt = outputReceipt(ItemsReceipt);

      const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
      expect(Receipt).toEqual(expectText);
    });
  });

  let inputs;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

