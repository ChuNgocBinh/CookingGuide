import BaseComponent from "../components/BaseComponent.js";
import Navbar from "../components/Nav/navbar.js";
import SideBar from "../components/Nav/sidebar.js";
import { appendTo } from "../utils.js";
import CreateFood from "../components/different/createFood.js";

export default class CreateFoodScreen extends BaseComponent {

    render() {
        let $container = document.createElement("div");
        $container.style.height = '100vh';

        $container.style.backgroundImage = "url(../../img/home-bg.jpg"
        $container.style.backgroundAttachment = 'fixed';

        appendTo($container, new Navbar());

        let $content = document.createElement("div");
        $content.className = 'content d-flex';


        appendTo($content, new SideBar(), new CreateFood())

        $container.append($content)



        return $container;
    }
}