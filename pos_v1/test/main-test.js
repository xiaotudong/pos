'use strict';

describe('pos', () => {
  describe('buildCartItems', () => {
    let tags;
    const allItems = loadAllItems();

    beforeEach(() => {
      tags = [
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

    it('printf cartItems', () => {
      const cartItems = buildCartItems(tags,allItems);

      const expectText = [
        {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        }
      ];
      expect(cartItems).toEqual(expectText);
    });
  });

  describe('buildItemsSubtotal', () => {

    const allPromotions = loadPromotions();
    let cartItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];

    it("printf ItemsSubotal", () => {
      const itemsSubtotal = buildReceiptItems(cartItems,allPromotions);

      const expectText = [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          saved: 3.00,
          subtotal: 12.00
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          saved: 0.00,
          subtotal: 30.00
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          saved: 4.50,
          subtotal: 9.00
        }
      ]
      expect(itemsSubtotal).toEqual(expectText);
    });
  });

  describe("buildItemsReceipt", () => {
    let itemsSubtotal = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        saved: 3.00,
        subtotal: 12.00
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        saved: 0.00,
        subtotal: 30.00
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        },
        saved: 4.50,
        subtotal: 9.00
      }
    ]

    it("printf ItemsReceipt", () => {
      const itemsReceipt = buildReceipt(itemsSubtotal);

      const expectText = {
        receiptItems: [
          {
            cartItem: {
              item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 5
            },
            saved: 3.00,
            subtotal: 12.00
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2
            },
            saved: 0.00,
            subtotal: 30.00
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3
            },
            saved: 4.50,
            subtotal: 9.00
          }
        ],
        total: 51.00,
        saveTotal: 7.50
      }
      expect(itemsReceipt).toEqual(expectText);
    });
  });

  describe("outputReceipt", () => {
    let itemsReceipt = {
      receiptItems: [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          saved: 3.00,
          subtotal: 12.00
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          saved: 0.00,
          subtotal: 30.00
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          saved: 4.50,
          subtotal: 9.00
        }
      ],
      total: 51.00,
      saveTotal: 7.50
    }

    it("printf Receipt", () => {
      const receipt = buildReceiptText(itemsReceipt);

      const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
      expect(receipt).toEqual(expectText);
    });
  });

  let tags;

  beforeEach(() => {
    tags = [
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

    printReceipt(tags);

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

