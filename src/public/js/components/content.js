import BaseComponent from "./BaseComponent.js";

export default class Content extends BaseComponent {

    render() {
        let $content = document.createElement("div");
        $content.className = 'content__mainContent w-75  d-inline-block' 
        $content.innerHTML = 'chu ngoc binh'
        return $content
    }
}