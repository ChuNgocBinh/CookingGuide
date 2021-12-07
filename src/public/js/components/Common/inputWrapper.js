import BaseComponent from "../BaseComponent.js";

export default class InputWrapper extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let $container = document.createElement("div");
        $container.className = 'form-group mb-3'

        let $title = document.createElement("label");
        $title.className = 'form-label';
        $title.innerHTML = this.props.title;

        let $input = document.createElement("input");
        $input.className = 'form-control';
        $input.name = this.props.name;
        $input.type = this.props.type;
        $input.placeholder = this.props.placeholder;
        $input.value = this.props.value;
        $input.onchange = (e) => {
            this.props.onChange(e.target.name, e.target.value)
        }

        let $errorsMessage = document.createElement("div");
        $errorsMessage.className = 'text-danger';
        $errorsMessage.innerHTML = this.props.errorsMessage;

        $container.append($title, $input, $errorsMessage);

        return $container;
    }

}