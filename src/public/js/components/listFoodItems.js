import { appendTo } from "../utils.js";
import BaseComponent from "./BaseComponent.js";
import FoodItem from "./foodItem.js";

export default class ListFoodItems extends BaseComponent {


    render() {
        let $container = document.createElement("div");
        $container.className = 'listFoodItem mb-4'

        let $listItem = document.createElement("div");
        $listItem.className = 'list-items'
        $listItem.style.width = '10000px'

        appendTo(
            $listItem,
            new FoodItem(),
            new FoodItem(),
            new FoodItem(),
            new FoodItem(),
            new FoodItem(),
            new FoodItem(),
            new FoodItem(),
            new FoodItem(),
        )

        let $btn = document.createElement("div");
        $btn.className = 'listFoodItem__btn'

        let $prev = document.createElement("button")
        $prev.className = 'btn-prev';
        $prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        let counter = 1;
        $prev.onclick = () => {
            counter--;
            console.log(counter);
            $listItem.style.transform = `translateX(${-290 * counter}px)`
            $listItem.style.transition = '0.3s linear'
            if (counter < 1) {
                counter = 1
            }
        }

        let $next = document.createElement("button");
        $next.className = 'btn-next'
        $next.innerHTML = '<i class="fas fa-chevron-right"></i>'
        $next.onclick = () => {
            counter++;
            console.log(counter);
            $listItem.style.transform = `translateX(${-290 * counter}px)`
            $listItem.style.transition = '0.3s linear'
            if (counter >= 7) {
                counter = 1
            }
        }

        $btn.append($prev, $next);

        $container.append($listItem, $btn);

        return $container;
    }
}