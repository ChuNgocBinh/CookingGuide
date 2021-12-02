import { deleteAllCart, getCart, getFoodId } from "../models/getData.js";
import { deleteCart } from "../models/setData.js";
import { appendTo } from "../utils.js";
import BaseComponent from "./BaseComponent.js";
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
        $money.innerHTML = '<b>Tổng tiền: </b>' + sum + 'đ';

        let $pay = document.createElement('select')
        $pay.className = 'form-select mt-2'

        let $cash = document.createElement('option')
        $cash.value = 'cash';
        $cash.innerHTML = 'Thanh toán khi nhận hàng';

        let $banking = document.createElement('option')
        $banking.value = 'banking';
        $banking.innerHTML = 'Thanh toán bằng hình thức chuyển khoản';

        $pay.append($cash, $banking)

        let $btnPay = document.createElement('button');
        $btnPay.className = 'btn btn-warning my-2';
        $btnPay.innerHTML = 'Thanh toán';

        $btnPay.onclick = () => {
            if (this.state.length == 0) {
                alert("không có món ăn nào được đặt")
            } else {
                alert('Hoàn tất thanh toán, Cảm ơn quý khách đã gọi đồ ăn, đồ ăn sẽ được chuyển tới quý khách trong vòng 15 phút tới')
                deleteAllCart();
            }
            router.navigate('/home');
        }

        $container.append($money, $pay, $btnPay);

        return $container;
    }
}