
const mockedGoodsItem = [
    { title: 'Shirt', price: 150, index: 1 },
    { title: 'Socks', price: 50, index: 2 },
    { title: 'Jacket', price: 350, index: 3 },
    { title: 'Shoes', price: 250, index: 4 },
    { title: 'Shirt', price: 150, index: 5 },
    { title: 'Socks', price: 50, index: 6 },
    { title: 'Jacket', price: 350, index: 7 },
    { title: 'Shoes', price: 250, index: 8 },
];

const basketGoodsItem = [
    { title: 'Shirt', price: 150, index: 1, quantity: 1, size: 'L', color: 'Red' },
    { title: 'Socks', price: 50, index: 2, quantity: 3, size: 'M', color: 'Grey' },
    { title: 'Jacket', price: 350, index: 3, quantity: 2, size: 'L', color: 'Black' },
    { title: 'Socks', price: 50, index: 6, quantity: 5, size: 'XL', color: 'Black' },
]


class GoodsList {
    constructor(title, price, index) {
        this.title = title;
        this.price = price;
        this.index = index;
    }
    goods = [];

    __renderGoodsItem({ title, price, index }) {
        return ` <div class="items_card">
        <div>
            <div class="items_card_img">
                <div class="items_card_buy">
                    <button class="button_buy">
                        <img src="img/addToCart.png" alt="">
                        Add to Cart
                    </button>
                </div>
                <img src="img/featuredItem${index}.jpg" alt="photo">
            </div>
            <div class="items_card_text1">${title}</div>
            <div class="items_card_text2">$${price}</div>
        </div>
    </div>`;
    };

    getGoods(goods) {
        this.goods = goods;
    };

    render() {
        let goodsList = this.goods.map(item => this.__renderGoodsItem(item));
        document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', goodsList.join(''));
        console.log(goodsList);
    };

    goodsSum(goods) {
        let sum = 0;
        for (let i = 0; i < goods.length; i++) {
            sum += goods[i].price;
        }
        console.log(`суммарная стоимость всех товаров ${sum}`);
    };
};

const list = new GoodsList();
list.getGoods(mockedGoodsItem);
list.render();
list.goodsSum(mockedGoodsItem);

// класс для корзины товаров
class Basket extends GoodsList {

    constructor(title, price, index, quantity) {
        super(title, price, index);
        this.quantity = quantity;
    }

    // общая стоимость товаров в корзине
    basketGoodsSum(goods) {
        let basketSum = 0;
        for (let i = 0; i < goods.length; i++) {
            basketSum += (goods[i].quantity * goods[i].price);
        }
        console.log(`суммарная стоимость всех товаров в корзине ${basketSum}`);
    };

};

// класс для элемента корзины товаров
class BasketElement extends Basket {
    constructor(title, price, index, quantity, size, color) {
        super(title, price, index, quantity);
        this.size = size;
        this.color = color;
    }
    subtotal() {
        let subtotalBasketElement = this.price * this.quantity;
        console.log(subtotalBasketElement);
        return (`общая стоимость товара ${this.title} равна ${subtotalBasketElement}`);
    }
};
const basketList = new BasketElement();
basketList.getGoods(basketGoodsItem);
//basketList.render();
//basketList.goodsSum(basketGoodsItem);
basketList.basketGoodsSum(basketGoodsItem);




