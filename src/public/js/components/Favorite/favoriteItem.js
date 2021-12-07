import BaseComponent from "../BaseComponent.js";

export default class FavoriteItem extends BaseComponent {
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
        $nameFood.className = 'w-100 favoriteItem_name'
        $nameFood.innerHTML = this.props.nameFood;

        let $descriptionFood = document.createElement("p");
        $descriptionFood.className = 'w-100 favoriteItem_des mb-1'
        $descriptionFood.innerHTML = this.props.descriptionFood;

        let $createdBy = document.createElement("p");
        $createdBy.className = 'w-100 mb-1'
        $createdBy.innerHTML = '<b>Nguời tạo: </b>' + this.props.createdBy;

        let $price = document.createElement("p");
        $price.className = 'w-100 mb-1'
        $price.innerHTML = '<b>Giá: </b>' + this.props.price + 'đ';

        let $btnDelete = document.createElement("btn");
        $btnDelete.className = 'btn btn-warning';
        $btnDelete.innerHTML = 'Xóa';
        $btnDelete.onclick = this.props.onClick;

        $content.append($nameFood, $descriptionFood, $createdBy, $price, $btnDelete)

        $container.append($img, $content);

        return $container;
    }
}