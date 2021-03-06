import { deleteAllCart, getCart, getFoodId } from "../../models/getData.js";
import { deleteCart } from "../../models/setData.js";
import { appendTo } from "../../utils.js";
import BaseComponent from "../BaseComponent.js";
import CartItem from "./cartItem.js";

export default class Cart extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = []
    }

    async handleClickDelete(index) {
        let tmpState = this.state;
        let data = {
            postId: tmpState[index].postId._id,
            userId: tmpState[index].userId
        }
        tmpState.splice(index, 1);
        await deleteCart(data)
        this.setState(tmpState);
    }

    handleInputChange(name, value) {
        let tmpState = this.state;
        tmpState[name].buyNumber = value;
        this.setState(tmpState)
    }

    async componentDidMount() {
        let cart = await getCart()
        let tmpState = this.state;
        tmpState = cart
        tmpState.forEach(item => {
            item.buyNumber = 1
        })
        this.setState(tmpState);
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'content__mainContent ms-3 container';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        let sum = 0;
        this.state.forEach((item, index) => {

            let _cartItem = new CartItem({
                src: item.postId.imgUrl,
                nameFood: item.postId.title,
                name: index,
                value: item.buyNumber,
                totalMoney: item.postId.price * item.buyNumber,
                onChange: (name, value) => {
                    this.handleInputChange(name, value)
                },
                onClick: () => {
                    this.handleClickDelete(index)
                }
            })

            sum += item.postId.price * item.buyNumber

            appendTo($container, _cartItem)
        })

        let $money = document.createElement('div');
        $money.innerHTML = '<b>T???ng ti???n: </b>' + sum + '??';

        let $pay = document.createElement('select')
        $pay.className = 'form-select mt-2'

        let $cash = document.createElement('option')
        $cash.value = 'cash';
        $cash.innerHTML = 'Thanh to??n khi nh???n h??ng';

        let $banking = document.createElement('option')
        $banking.value = 'banking';
        $banking.innerHTML = 'Thanh to??n b???ng h??nh th???c chuy???n kho???n';

        $pay.append($cash, $banking)

        let $btnPay = document.createElement('button');
        $btnPay.className = 'btn btn-warning my-2';
        $btnPay.innerHTML = 'Thanh to??n';

        $btnPay.onclick = () => {
            if (this.state.length == 0) {
                alert("kh??ng c?? m??n ??n n??o ???????c ?????t")
            } else {
                alert('Ho??n t???t thanh to??n, C???m ??n qu?? kh??ch ???? g???i ????? ??n, ????? ??n s??? ???????c chuy???n t???i qu?? kh??ch trong v??ng 15 ph??t t???i')
                deleteAllCart();
            }
            router.navigate('/home');
        }

        $container.append($money, $pay, $btnPay);

        return $container;
    }
}