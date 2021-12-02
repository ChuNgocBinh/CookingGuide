import BaseComponent from "./BaseComponent.js";

export default class LinkMenu extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let $link = document.createElement("a");
        $link.className = 'd-block pt-3 ms-4 ps-2 border-bottom'
        $link.href = this.props.href;
        $link.innerHTML = this.props.icon + this.props.value ;
        $link.onclick = this.props.Onclick

        return $link

    }
}