import { getQuery } from "../../models/getData.js";
import { appendTo } from "../../utils.js";
import BaseComponent from "../BaseComponent.js";
import FoodItem from "../Common/foodItem.js";

export default class Search extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = []
    }

    async componentDidMount() {
        let searchJSON = localStorage.getItem('search');
        let search = JSON.parse(searchJSON);

        let data = await getQuery('http://localhost:9000/api/posts/', {
            keyword: search
        })
        let tmpState = this.state;
        tmpState = data;
        this.setState(tmpState);
    }

    handleClickDetail(e, item) {
        e.preventDefault();
        localStorage.setItem('postId', JSON.stringify(item._id))
        router.navigate(`/details/${item._id}`)
        window.location.reload()
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'content__mainContent ms-3 container ';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        let listFood = this.state.map(item => {
            let _foodItem = new FoodItem({
                src: item.imgUrl,
                title: item.title,
                description: item.description,
                onClick: (e) => {
                    this.handleClickDetail(e, item)
                }
            })
            return _foodItem
        })

        appendTo($container, ...listFood)


        return $container;
    }
}