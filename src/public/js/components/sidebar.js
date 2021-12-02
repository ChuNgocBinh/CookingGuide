import { getCart } from "../models/getData.js";
import { appendTo } from "../utils.js";
import BaseComponent from "./BaseComponent.js";
import LinkMenu from "./linkMenu.js";

export default class SideBar extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let $sidebar = document.createElement("div");
        $sidebar.className = 'content__sidebar'
        $sidebar.style.paddingTop = '80px'

        let $menu = document.createElement("div");

        appendTo(
            $menu,
            new LinkMenu({
                icon: '<i class="fas fa-home"></i>',
                href: '',
                value: 'Trang chủ',
                number: '',
                Onclick: (e) => {
                    e.preventDefault();
                    router.navigate('/home')
                }
            }),
            new LinkMenu({
                icon: '<i class="fas fa-utensils"></i>',
                href: '',
                value: 'Đồ ăn',
                number: '',
                Onclick: (e) => {
                    e.preventDefault();
                    router.navigate('/food')
                }
            }),
            new LinkMenu({
                icon: '<i class="fas fa-glass-cheers"></i>',
                href: '',
                value: 'Đồ uống',
                number: '',
                Onclick: (e) => {
                    e.preventDefault();
                    router.navigate('/drink')
                }
            }),
            new LinkMenu({
                icon: '<i class="fas fa-ice-cream"></i>',
                href: '',
                value: 'Kem',
                number: '',
                Onclick: (e) => {
                    e.preventDefault();
                    router.navigate('/scream')
                }
            }),
            new LinkMenu({
                icon: '<i class="fas fa-thumbs-up"></i>',
                href: '',
                value: 'Yêu thích',
                number: '',
            }),

            new LinkMenu({
                icon: '<i class="far fa-plus-square"></i>',
                href: '',
                value: 'Tạo món ăn mới',
                number: '',
                Onclick: (e) => {
                    e.preventDefault();
                    router.navigate('/create-food')
                }
            }),
            new LinkMenu({
                icon: '<i class="fas fa-cart-plus"></i>',
                href: '',
                value: 'Giỏ hàng',
                number: this.state,
                Onclick: (e) => {
                    e.preventDefault();
                    router.navigate('/cart')
                }
            }),
            new LinkMenu({
                icon: '<i class="fas fa-blog"></i>',
                href: '',
                value: 'Blog',
                number: '',
            }),

            new LinkMenu({
                icon: '<i class="fas fa-phone-volume"></i>',
                href: '',
                value: 'Liên hệ',
                number: '',
            }),

        );

        $sidebar.append($menu)

        return $sidebar
    }
}