import BaseComponent from "../components/BaseComponent.js";
import Content from "../components/content.js";
import Navbar from "../components/navbar.js";
import SideBar from "../components/sidebar.js";
import { appendTo } from "../utils.js";

export default class IndexScreen extends BaseComponent{

    
    render() {
        let $container = document.createElement("div");
        appendTo($container, new Navbar());

        let $content = document.createElement("div");
        $content.className = 'content'

        appendTo($content, new SideBar(), new Content())

        $container.append($content)

        return $container;
    }
}