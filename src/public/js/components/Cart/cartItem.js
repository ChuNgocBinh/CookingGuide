import { appendTo } from "../../utils.js";
import BaseComponent from "../BaseComponent.js";
import InputWrapper from "../Common/inputWrapper.js";

export default class CartItem extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {

        let $container = document.createElement("div");
        $container.className = 'd-flex mb-3';

        let $imgCart = document.createElement("div")

        let $img = document.createElement("img");
        $img.src = this.props.src;
        $img.style.width = '300px';
        $img.style.height = '200px';
        $img.style.objectFit = 'cover';

        $imgCart.append($img);

        let $content = document.createElement("div");
        $content.className = 'ms-3 w-50';

        let $nameFood = document.createElement("h4");
        $nameFood.className = 'w-100'
        $nameFood.innerHTML = this.props.nameFood;

        $content.append($nameFood)

        let _nameFood = new InputWrapper({
            title: 'Số lượng:',
            name: this.props.name,
            type: 'number',
            placeholder: 'Nhập số lượng món ăn',
            value: this.props.value,
            onChange: (name, value) => {
                this.props.onChange(name, value)
            },
            errorsMessage: ''
        })

        appendTo($content, _nameFood)

        let $money = document.createElement("div")
        $money.innerHTML = '<b>Tổng tiền: </b>' + this.props.totalMoney + ' đ'

        let $btnDelete = document.createElement("btn");
        $btnDelete.className = 'btn btn-warning mt-2';
        $btnDelete.innerHTML = 'Xóa';
        $btnDelete.onclick = this.props.onClick;

        $content.append($money,$btnDelete)

        $container.append($img, $content);

        return $container;
    }
}