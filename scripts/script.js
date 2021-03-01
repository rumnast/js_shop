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
                    <button id="${id_product}" class="button_buy">
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

    getGoods(goods) {
        this.goods = goods;
    };

    render() {
        let goodsList = this.goods.map(item => this.__renderGoodsItem(item)).join('');
        let wrapper = document.querySelector('.goods-list');
        wrapper.insertAdjacentHTML('afterbegin', goodsList);
        wrapper.querySelectorAll('[id]').forEach(i => {
            i.addEventListener('click', () => {
                //console.log(i);
                const id = i.getAttribute('id');
                //console.log(id);
                //console.log(this.goods);
                const item = this.goods.find(goodsItem => goodsItem.id_product == id);
                //console.log(item);
                list2.addItem(item);
                //console.log(list2);
            });
        });
    }

    SumGoodsList() {
        let sum = 0;
        let array = this.goods;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].price;
        }
        console.log(`суммарная стоимость всех товаров ${sum}`);
    };
};

// класс для корзины товаров
class CartList {
    __items = [];

    getItems() {
        return this.__items;
    }

    addItem = item => {
        this.__items.push(item);
        this.render();
    };

    removeItem(id) {
        this.__items = this.__items.filter(i => i.id_product != id);
        console.log(this.__items);
        this.render();
    }

    __renderCartGoodsItem({ id_product, product_name, price }) {
        return ` <div class="items_card">
        <div>
            <div class="items_card_img">
                <div class="items_card_buy">
                    <button id_cart="${id_product}"class="button_deleteFromCart">
                        <img src="img/addToCart.png" alt="">
                        Delete from Cart
                    </button>
                </div>
                <img src="img/${id_product}.jpg" alt="photo">
            </div>
            <div class="items_card_text1">${product_name}</div>
            <div class="items_card_text2">$${price}</div>
            <div class="items_card_text1">Количество  </div>

        </div>
    </div>`;
    };

    render() {
        //console.log(this.__items);
        const goodsTemplates = this.__items.map(item => this.__renderCartGoodsItem(item)).join('');
        const wrapper = document.querySelector('.cart_items');
        wrapper.innerHTML = goodsTemplates;
        wrapper.querySelectorAll('[id_cart]').forEach(i => {
            i.addEventListener('click', () => {
                const id = i.getAttribute('id_cart');
                //console.log(id);
                const item = this.__items.find(goodsItem => goodsItem.id_product == id);
                //console.log(item);
                list2.removeItem(id);
                //console.log(list2)
            });
        })
    }



    SumCart() {
        let sum = 0;
        let array = this.goods;
        for (let i = 0; i < array.length; i++) {
            sum += (array[i].quantity * array[i].price);
        }
        console.log(`суммарная стоимость всех товаров в корзине ${sum}`);
    };


};


let list1 = new GoodsList();
let list2 = new CartList();


fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
    .then(response => response.json())
    .then(json => list1.getGoods(json))
    .then(json => list1.render())
    .then(json => list1.SumGoodsList())


