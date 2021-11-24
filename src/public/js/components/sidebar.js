import { appendTo } from "../utils.js";
import BaseComponent from "./BaseComponent.js";
import LinkMenu from "./linkMenu.js";

export default class SideBar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = [
            { icon: '<i class="fas fa-home"></i>', href: '', value: 'Trang chủ' },
            { icon: '<i class="fas fa-utensils"></i>', href: '', value: 'Đồ ăn' },
            { icon: '<i class="fas fa-glass-cheers"></i>', href: '', value: 'Đồ uống' },
            { icon: '<i class="fas fa-ice-cream"></i>', href: '', value: 'Kem' },
            { icon: '<i class="fas fa-thumbs-up"></i>', href: '', value: 'Yêu thích' },
            { icon: '<i class="far fa-plus-square"></i>', href: '', value: 'Tạo món ăn mới' },
            { icon: '<i class="fas fa-shipping-fast"></i>', href: '', value: 'Đặt đồ ăn' },
            { icon: '<i class="fas fa-cart-plus"></i>', href: '', value: 'Giỏ hàng' },
            { icon: '<i class="fas fa-blog"></i>', href: '', value: 'Blog' },
            { icon: '<i class="fas fa-phone-volume"></i>', href: '', value: 'Liên hệ' },
        ]
    }

    render() {
        let $sidebar = document.createElement("div");
        $sidebar.className = 'content__sidebar mt-3'
        $sidebar.style.paddingTop = '80px'

        let $menu = document.createElement("div");

        appendTo(
            $menu,
            new LinkMenu({ icon: '<i class="fas fa-home"></i>', href: '', value: 'Trang chủ' }),
            new LinkMenu({ icon: '<i class="fas fa-utensils"></i>', href: '', value: 'Đồ ăn' }),
            new LinkMenu({ icon: '<i class="fas fa-glass-cheers"></i>', href: '', value: 'Đồ uống' }),
            new LinkMenu({ icon: '<i class="fas fa-ice-cream"></i>', href: '', value: 'Kem' }),
            new LinkMenu({ icon: '<i class="fas fa-thumbs-up"></i>', href: '', value: 'Yêu thích' }),
            new LinkMenu({ icon: '<i class="far fa-plus-square"></i>', href: '', value: 'Tạo món ăn mới' }),
            new LinkMenu({ icon: '<i class="fas fa-shipping-fast"></i>', href: '', value: 'Đặt đồ ăn' }),
            new LinkMenu({ icon: '<i class="fas fa-cart-plus"></i>', href: '', value: 'Giỏ hàng' }),
            new LinkMenu({ icon: '<i class="fas fa-blog"></i>', href: '', value: 'Blog' }),
            new LinkMenu({ icon: '<i class="fas fa-phone-volume"></i>', href: '', value: 'Liên hệ' }),
        );

        $sidebar.append($menu)

        return $sidebar
    }
}