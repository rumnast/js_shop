
const goods = [
    { title: 'Shirt', price: 150, index: 1 },
    { title: 'Socks', price: 50, index: 2 },
    { title: 'Jacket', price: 350, index: 3 },
    { title: 'Shoes', price: 250, index: 4 },
    { title: 'Shirt', price: 150, index: 5 },
    { title: 'Socks', price: 50, index: 6 },
    { title: 'Jacket', price: 350, index: 7 },
    { title: 'Shoes', price: 250, index: 8 },
];

const renderGoodsItem = (title, price, index) => {
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
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.index));
    document.querySelector('.goods-list').insertAdjacentHTML('afterbegin', goodsList.join(''));
    console.log(goodsList);
}
renderGoodsList(goods);




