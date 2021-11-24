import BaseComponent from "./BaseComponent.js";

export default class FoodItem extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let $container = document.createElement("div");
        $container.className = 'box d-inline-block';

        let $img = document.createElement("img");
        $img.src = '../../img/foodItem.png'

        let $boxContent = document.createElement("div");
        $boxContent.className = 'box-content';

        let $title = document.createElement("h3");
        $title.className = 'mt-3'
        $title.innerHTML = 'Hamburger Food'

        let $description = document.createElement("p");
        $description.innerHTML = 'Lorem Ipsum Dolor Sit, Amet Consectetur Adipisicing Elit. Deleniti, Ipsum.'

        let $oder = document.createElement("a");
        $oder.className = 'linkBtn';
        $oder.href = '#';
        $oder.innerHTML = 'Detail';

        $boxContent.append($title, $description, $oder)

        $container.append($img, $boxContent);

        return $container;
    }
}