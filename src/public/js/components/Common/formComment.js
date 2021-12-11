import { appendTo } from "../../utils.js";
import BaseComponent from "../BaseComponent.js";
import InputWrapper from "./inputWrapper.js";

export default class FormComment extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let $container = document.createElement("div");
        $container.className = 'form-comment';


        let $imgUser = document.createElement('img');
        $imgUser.src = this.props.src;
        $imgUser.className = 'form-comment__imgUser';

        let $formComment = document.createElement('form')
        $formComment.className = 'form'
        $formComment.onsubmit = (e) => {
            this.props.onSubmit(e)
        }

        let $inputComment = document.createElement('input')
        $inputComment.className = 'form__inputComment'
        $inputComment.placeholder = 'Nhập comment của bạn ...'
        $inputComment.value = this.props.value;
        $inputComment.onchange = (e)=>{
            this.props.onChange(e.target.value)
        };

        let $btnComment = document.createElement('button');
        $btnComment.className = 'btn btn-warning';
        $btnComment.innerHTML = 'Bình luận'

        $formComment.append($inputComment, $btnComment);

        $container.append($imgUser, $formComment)

        return $container;
    }
}