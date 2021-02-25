const app = new Vue({
    el: '#root',
    data: {
        showCart: false,
        cartItems: [],
        goods: [],
        filteredGoods: [],
        searchGoods: '',
        errorMessage: '',
    },
    methods: {
        toggleCart() {
            this.showCart = !this.showCart;
        },
        addToCart(item) {
            let existant = false;
            //console.log(this.cartItems.length)
            for (const goodsItem of this.cartItems) {
                // console.log(goodsItem)
                // console.log(item)
                //console.log(goodsItem.id_product, "11111", item.id_product)
                if (goodsItem.id_product == item.id_product) {
                    existant = true;
                    goodsItem.quantity += 1;
                    let sum = goodsItem.quantity * goodsItem.price;
                    goodsItem.sum = sum;
                    //console.log(sum);
                }
            }
            if (!existant) {
                this.cartItems.push({ ...item, quantity: 1, sum: this.cartItems.price, img: "" });


                //console.log(existant);
                //console.log("laalalalal");
            }
            console.log(this.cartItems);
        },
        removeFromCart(id) { },
        filterGoods() {
            if (!this.goods.length) this.filteredGoods = [];
            if (!this.searchGoods) this.filteredGoods = this.goods;
            this.filteredGoods = this.goods.filter(i => i.productName.toLowerCase().includes(this.searchGoods.toLowerCase()));
        },
        getGoods() {
            fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
                .then(r => r.json())
                .then(r => {
                    this.goods = r;
                    console.log(r);
                    this.filteredGoods = this.goods;
                })
                .catch(e => {
                    this.errorMessage = e;
                });
        },
    },
    mounted() {
        this.getGoods();
    },
});


