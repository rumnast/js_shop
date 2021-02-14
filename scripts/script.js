class GoodsList {
    constructor(id_product, product_name, price) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }
    goods = [];

    __renderGoodsItem({ id_product, product_name, price }) {
        return ` <div class="items_card">
        <div>
            <div class="items_card_img">
                <div class="items_card_buy">
                    <button class="button_buy">
                        <img src="img/addToCart.png" alt="">
                        Add to Cart
                    </button>
                </div>
                <img src="img/${id_product}.jpg" alt="photo">
            </div>
            <div class="items_card_text1">${product_name}</div>
            <div class="items_card_text2">$${price}</div>
        </div>
    </div>`;
    };

    __renderCartGoodsItem({ id_product, product_name, price, quantity }) {
        return ` <div class="items_card">
        <div>
            <div class="items_card_img">
                <div class="items_card_buy">
                    <button class="button_deleteFromCart">
                        Delete from Cart
                    </button>
                </div>
                <img src="img/${id_product}.jpg" alt="photo">
            </div>
            <div class="items_card_text1">${product_name}</div>
            <div class="items_card_text2">$${price}</div>
            <div class="items_card_text1">Количество ${quantity}</div>

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

    SumGoodsList() {
        let sum = 0;
        let array = this.goods;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].price;
        }
        console.log(`суммарная стоимость всех товаров ${sum}`);
    };

    AddToCart() {
        let buttons = document.querySelectorAll('.button_buy');
        console.log(buttons);

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                //console.log(event.target)
                let cartList = new CartList();
                console.log(cartList);
                let array = this.goods;
                console.log(array)
                function arrayEl(arr) {
                    if (event) {
                        console.log(arr)
                    }
                }
                console.log(array.findIndex(arrayEl));





                // cartList.product_name = this.goods.product_name;
                // cartList.price = this.goods.price;
                // cartList.quantity = 1;
                // console.log(cartList);




                let goodsList = this.goods.map(item => this.__renderCartGoodsItem(item));
                document.querySelector('.cart').insertAdjacentHTML('afterbegin', goodsList.join(''));

            });
        });



    }

};

list1 = new GoodsList();

fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
    .then(response => response.json())
    .then(function (result) {
        list1.getGoods(result)
        list1.render()
        list1.SumGoodsList()
        //list.AddToCart()
        list2 = new CartList()
        console.log(list2);



    });



// класс для корзины товаров
class CartList extends GoodsList {

    constructor(id_product, product_name, price, quantity) {
        super(id_product, product_name, price);
        this.quantity = quantity;
    }

    SumCart() {
        let sum = 0;
        let array = this.goods;
        for (let i = 0; i < array.length; i++) {
            sum += (array[i].quantity * array[i].price);
        }
        console.log(`суммарная стоимость всех товаров в корзине ${sum}`);
    };

    AddItem() {
        this.push({ id_product, product_name, price, quantity });

    }

    DeleteItem() {
        this.items.splice(this.items.indexOf(item));

    }

};

// класс для элемента корзины товаров
class CartElement extends Cart {
    constructor(id_product, product_name, price, quantity, size, color) {
        super(id_product, product_name, price, quantity);
        this.size = size;
        this.color = color;
    }
    subtotal() {
        let subtotalCartElement = this.price * this.quantity;
        console.log(subtotalCartElement);
        return (`общая стоимость товара ${this.title} равна ${subtotalCartElement}`);
    }
};




