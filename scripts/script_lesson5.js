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
            //console.log(this.showCart);          
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
                //console.log(this.cartItems);
                this.cartItems.push({ ...item, quantity: 1, sum: item.price, img: `img/${item.id_product}.jpg` });
                //console.log(this.cartItems);
                //console.log(existant);
                //console.log("laalalalal");
            }
            //console.log(this.cartItems);

        },
        removeFromCart(item) {
            //console.log(this.cartItems)
            for (goodsItem of this.cartItems) {
                if (goodsItem.id_product == item.id_product) {
                    if (goodsItem.quantity > 1) {
                        //console.log(goodsItem.quantity)
                        goodsItem.quantity -= 1;
                        let sum = goodsItem.quantity * goodsItem.price;
                        goodsItem.sum = sum;
                    } else {
                        const index = this.cartItems.indexOf(goodsItem);
                        this.cartItems.splice(index, 1);

                        //this.cartItems.pop({ ...item, quantity: 1, sum: this.cartItems.price, img: "" });
                    }
                }
            }
        },
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
                    //console.log(r);
                    this.filteredGoods = this.goods;
                })
                .then(r => {
                    let image = document.querySelectorAll(".goodsImg");
                    //console.log(image);
                    for (let i = 0; i < image.length; i++) {
                        //let im = `<img src="img/${this.goods[i].id_product}.jpg" alt="photo">`
                        //console.log(this.goods[i].id_product);
                        image[i].innerHTML = `<img src="img/${this.goods[i].id_product}.jpg" alt="photo">`;
                        //console.log(image[i]);
                    }
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




