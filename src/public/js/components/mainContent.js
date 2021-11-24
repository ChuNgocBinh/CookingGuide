import { appendTo } from "../utils.js";
import HomeScreen from "../view/homeScreen.js";
import BaseComponent from "./BaseComponent.js";
import FoodItem from "./foodItem.js";
import ListFoodItems from "./listFoodItems.js";

export default class Content extends BaseComponent {

    render() {
        let $content = document.createElement("div");
        $content.className = 'content__mainContent mt-3 ms-3';
        $content.style.height = '100vh';
        $content.style.paddingTop = '60px';
        $content.style.overflowY = 'auto';
        $content.style.overflowX = 'hidden';


        // appendTo($content, new FoodItem())
        appendTo($content, new HomeScreen())
        return $content
    }
}