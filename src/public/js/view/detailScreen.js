import BaseComponent from "../components/BaseComponent.js";
import Navbar from "../components/navbar.js";
import SideBar from "../components/sidebar.js";
import { getFood } from "../models/getData.js";
import { appendTo } from "../utils.js";

import Home from "../components/home.js";
import Food from "../components/food.js";
import CreateFood from "../components/createFood.js";
import Detail from "../components/detail.js";

export default class DetailScreen extends BaseComponent {

    render() {
        let $container = document.createElement("div");
        $container.style.height = '100vh';

        $container.style.backgroundImage = "url(../../img/home-bg.jpg"
        $container.style.backgroundAttachment = 'fixed';

        appendTo($container, new Navbar());

        let $content = document.createElement("div");
        $content.className = 'content d-flex';


        appendTo($content, new SideBar(), new Detail())

        $container.append($content)



        return $container;
    }
}