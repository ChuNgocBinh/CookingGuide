import BaseComponent from "../components/BaseComponent.js";
import Navbar from "../components/Nav/navbar.js";
import SideBar from "../components/Nav/sidebar.js";
import { appendTo } from "../utils.js";
import Detail from "../components/different/detail.js";

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