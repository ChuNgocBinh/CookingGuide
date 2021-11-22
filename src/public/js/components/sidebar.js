import BaseComponent from "./BaseComponent.js";

export default class SideBar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = [
            { href: '', value: 'Trang chủ' },
            { href: '', value: 'Trang chủ' },
            { href: '', value: 'Trang chủ' },
            { href: '', value: 'Trang chủ' },
        ]
    }

    render() {
        let $sidebar = document.createElement("div");
        $sidebar.className = 'content__sidebar w-25 d-inline-block'

        let $menu = document.createElement("div");
        let links = this.state.map(link => {
            let $tag = document.createElement("a");
            $tag.className = 'd-block mb-3';
            $tag.href = link.href;
            $tag.innerHTML = link.value;
            return $tag;
        })
        $menu.append(...links)

        $sidebar.append($menu)

        return $sidebar
    }
}