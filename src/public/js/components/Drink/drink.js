import BaseComponent from "../BaseComponent.js";
import FoodItem from "../Common/foodItem.js";
import { getQuery } from "../../models/getData.js";
import { appendTo } from "../../utils.js"; 

export default class Drink extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = []
    }

    handleClickDetail(e, item) {
        e.preventDefault();
        localStorage.setItem('postId', JSON.stringify(item._id))
        router.navigate(`/details/${item._id}`)
        window.location.reload()
    }
    
    async componentDidMount() {
        let tmpState = this.state;
        let listFood = await getQuery('http://localhost:9000/api/posts', {
            rule: 'drink',
            sortField: 'buyCount',
        })
        tmpState = listFood;
        this.setState(tmpState);
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'content__mainContent ms-3 ';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        let listFoodItems = this.state.map(item => {
            let _foodItem = new FoodItem({
                src: item.imgUrl,
                title: item.title,
                description: item.description,
                onClick: (e) => {
                    this.handleClickDetail(e, item)
                }
            })

            return _foodItem;
        })

        appendTo($container, ...listFoodItems)


        return $container
    }
}