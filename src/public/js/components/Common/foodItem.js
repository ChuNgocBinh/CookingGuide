import BaseComponent from "../BaseComponent.js";

export default class FoodItem extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let $container = document.createElement("div");
        $container.className = 'box d-inline-block mb-2';

        let $img = document.createElement("img");
        $img.src = this.props.src;

        let $boxContent = document.createElement("div");
        $boxContent.className = 'box-content';

        let $title = document.createElement("h3");
        $title.className = 'mt-3 w-100'
        $title.innerHTML = this.props.title;

        let $description = document.createElement("p");
        $description.className = 'w-100'
        $description.innerHTML = this.props.description;

        let $oder = document.createElement("a");
        $oder.className = 'linkBtn';
        $oder.href = '#';
        $oder.innerHTML = 'Detail';
        $oder.onclick = (e) => {
            this.props.onClick(e)
        };

        $boxContent.append($title, $description, $oder)

        $container.append($img, $boxContent);

        return $container;
    }
}