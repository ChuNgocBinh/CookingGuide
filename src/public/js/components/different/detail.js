import BaseComponent from "../BaseComponent.js";
import { getFoodId } from "../../models/getData.js";
import { createCart, createFavorite } from "../../models/setData.js";
import {appendTo} from "../../utils.js";
import ListComment from "../comments/listComments.js";


export default class Detail extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            createdBy: '',
            numberRate: '',
        }
    }

    async componentDidMount() {
        let postIdJSON = localStorage.getItem('postId');
        let postId = JSON.parse(postIdJSON);
        const post = await getFoodId(postId)
        let tmpState = this.state;
        tmpState.data = post
        tmpState.createdBy = post.createBy.name;
        tmpState.numberRate = post.rate.length;
        this.setState(tmpState)
    }

    handeClickAddCart() {
        let postIdJSON = localStorage.getItem('postId');
        let postId = JSON.parse(postIdJSON);
        createCart({ postId })
    }

    handeClickAddFavorite() {
        let postIdJSON = localStorage.getItem('postId');
        let postId = JSON.parse(postIdJSON);
        createFavorite({ postId })
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'content__mainContent ms-3 ';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        let $main = document.createElement('div')
        $main.className = 'd-flex'

        let $image = document.createElement('div')
        let $imgFood = document.createElement('img');
        $imgFood.src = this.state.data.imgUrl;
        $imgFood.className = 'w-100';

        $image.append($imgFood)
        $image.className = 'w-50 pe-3 align-items-center';

        let $detail = document.createElement('div');
        $detail.className = 'w-50'

        let $nameFood = document.createElement('h2');
        $nameFood.innerHTML = this.state.data.title;
        $nameFood.className = 'text-center';

        let $price = document.createElement('h5')
        $price.innerHTML = 'Gi??:  ' + this.state.data.price + '??'

        let $interact = document.createElement('div');

        let $likeCount = document.createElement('span');
        $likeCount.innerHTML = '<strong> L?????t th??ch: </strong>' + this.state.data.likeCount
        $likeCount.className = 'px-2 border-end'
        let $buyCount = document.createElement('span');
        $buyCount.innerHTML = '<strong> ???? b??n: </strong>' + this.state.data.buyCount
        $buyCount.className = 'px-2 border-end'
        let $rateCount = document.createElement('span');
        $rateCount.innerHTML = '<strong> ????nh gi??: </strong>' + this.state.numberRate

        $interact.append($likeCount, $buyCount, $rateCount);

        let $description = document.createElement('p')
        $description.innerHTML = this.state.data.description;

        let $desTitle = document.createElement('h4');
        $desTitle.innerHTML = 'M?? t??? m??n ??n';

        let $content = document.createElement('div');
        $content.innerHTML = this.state.data.content;

        let $btnCart = document.createElement('button')
        $btnCart.className = 'btn btn-warning mb-3'
        $btnCart.innerHTML = `<i class="fas fa-cart-arrow-down"></i> Th??m v??o gi??? h??ng`
        $btnCart.onclick = this.handeClickAddCart

        let $btnFavorite = document.createElement('button')
        $btnFavorite.className = 'btn btn-warning mb-3 ms-3'
        $btnFavorite.innerHTML = `<i class="fas fa-thumbs-up"></i> Th??m v??o y??u th??ch`
        $btnFavorite.onclick = this.handeClickAddFavorite

        let $createBy = document.createElement('p');
        $createBy.innerHTML = '<strong> Ng?????i b??n: </strong>' + this.state.createdBy;

        $detail.append($nameFood, $price, $interact, $description, $btnCart, $btnFavorite, $desTitle, $content, $createBy)

        $main.append($image, $detail);
        $container.append($main)

        appendTo($container, new ListComment({}))

        

        return $container
    }
}