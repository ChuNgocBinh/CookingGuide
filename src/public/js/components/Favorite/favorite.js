import { getFavorite } from "../../models/getData.js";
import { deleteFavorite } from "../../models/setData.js";
import { appendTo } from "../../utils.js";
import BaseComponent from "../BaseComponent.js";
import FavoriteItem from "./favoriteItem.js";

export default class Favorite extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = []
    }

    async handleClickDelete(index) {
        let tmpState = this.state;
        let data = {
            postId: tmpState[index].postId._id,
            userId: tmpState[index].userId._id
        }
        tmpState.splice(index, 1);
        await deleteFavorite(data)
        this.setState(tmpState);
    }

    async componentDidMount() {
        let favorite = await getFavorite()
        let tmpState = this.state;
        tmpState = favorite
        console.log(tmpState);
        this.setState(tmpState);
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'content__mainContent ms-3 container';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        this.state.forEach((item, index) => {

            let _favoritetItem = new FavoriteItem({
                src: item.postId.imgUrl,
                nameFood: item.postId.title,
                descriptionFood: item.postId.description,
                createdBy: item.userId.name,
                price: item.postId.price,
                onClick: () => {
                    this.handleClickDelete(index)
                }
            })

            appendTo($container, _favoritetItem)
        })

        return $container;
    }
}