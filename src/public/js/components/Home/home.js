import BaseComponent from "../BaseComponent.js";
import ListFoodItems from "../Common/listFoodItems.js";
import { getFood } from "../../models/getData.js";
import { appendTo } from "../../utils.js";

export default class Home extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            food: [],
            drink: [],
            scream: [],
        }
    }

    async componentDidMount() {
        let tmpState = this.state;
        let listFood = await getFood('http://localhost:9000/api/posts', {
            rule: 'food',
            sortField: 'buyCount',
            skip: 0,
            limit: 8
        })

        tmpState.food = listFood;
        let listDrink = await getFood('http://localhost:9000/api/posts', {
            rule: 'drink',
            sortField: 'buyCount',
            skip: 0,
            limit: 8
        })
        tmpState.drink = listDrink;

        let listScream = await getFood('http://localhost:9000/api/posts', {
            rule: 'scream',
            sortField: 'buyCount',
            skip: 0,
            limit: 8
        })
        tmpState.scream = listScream;

        this.setState(tmpState);

    }

    render() {
        let $container = document.createElement("div");
        $container.className = 'content__mainContent ms-3 ';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        let $home = document.createElement("div");

        let $contentHome = document.createElement("div");
        $contentHome.className = 'd-inline-block w-50';
        let $titleHome = document.createElement("h2");
        $titleHome.innerHTML = 'CHẠM VÀO FOOD, CLICK LÀ NO!';
        let $subTitle = document.createElement("p");
        $subTitle.innerHTML = 'Website đặt đồ ăn online giao bởi ShopeeFood. Đa dạng nhà hàng, quán ăn tại Hà Nội với nhiều lựa chọn và chương trình khuyến mãi hấp dẫn. <br> Những món ăn được nêm giả đậm đà hương vị và có mùi vị rất riêng. Theo chúng mình đánh giá các bạn nên ăn thử. Vì chúng quá ngon.'
        let $oderNow = document.createElement("a");
        $oderNow.href = '#'
        $oderNow.className = 'linkBtn';
        $oderNow.innerHTML = 'Đặt hàng ngay'
        $contentHome.append($titleHome, $subTitle, $oderNow);

        let $imgHome = document.createElement("div");
        $imgHome.className = 'd-inline-block w-50';

        let $img = document.createElement("img");
        $img.className = 'homeImg w-100';
        $img.src = '../../img/home-img.png'
        $imgHome.append($img);

        $home.append($contentHome, $imgHome);

        $container.append($home)

        let $foodTitle = document.createElement("h3");
        $foodTitle.innerHTML = 'Đồ ăn';
        $container.append($foodTitle);
        appendTo($container, new ListFoodItems({
            data: this.state.food
        }))

        let $drinkTitle = document.createElement("h3");
        $drinkTitle.innerHTML = 'Đồ uống';
        $container.append($drinkTitle);
        appendTo($container, new ListFoodItems({
            data: this.state.drink
        }))

        let $screamTitle = document.createElement("h3");
        $screamTitle.innerHTML = 'Kem';
        $container.append($screamTitle);
        appendTo($container, new ListFoodItems({
            data: this.state.scream
        }))

        return $container;
    }
}