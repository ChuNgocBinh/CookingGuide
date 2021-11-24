import BaseComponent from "../components/BaseComponent.js";
import ListFoodItems from "../components/listFoodItems.js";
import { appendTo } from "../utils.js";

export default class HomeScreen extends BaseComponent {


    render() {
        let $container = document.createElement("div");

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
        // $foodTitle.className = 'text-center';
        $container.append($foodTitle);
        appendTo($container, new ListFoodItems())

        let $drinkTitle = document.createElement("h3");
        $drinkTitle.innerHTML = 'Đồ uống';
        $container.append($drinkTitle);
        appendTo($container, new ListFoodItems())

        let $screamTitle = document.createElement("h3");
        $screamTitle.innerHTML = 'Kem';
        $container.append($screamTitle);
        appendTo($container, new ListFoodItems())

        return $container;
    }
}