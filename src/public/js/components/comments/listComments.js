import { getQuery, getUser } from "../../models/getData.js";
import { createComment } from "../../models/setData.js";
import { appendTo } from "../../utils.js";
import BaseComponent from "../BaseComponent.js";
import FormComment from "../Common/formComment.js";
import InputWrapper from "../Common/inputWrapper.js";
import CommentItem from "./commentItem.js";

export default class ListComment extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {
                imgUrl: '',
                name: '',
                id: ''
            },
            value: '',
            postId: ''
        }
    }

    async componentDidMount() {
        let postIdJSON = localStorage.getItem('postId');
        let postId = JSON.parse(postIdJSON);

        let comments = await getQuery('http://localhost:9000/api/comments', {
            postId,
            sortField: 'createdAt',
        })
        let tmpState = this.state;
        tmpState.data = comments;
        tmpState.postId = postId

        let user = await getUser();
        tmpState.user.imgUrl = user.data.imgUrl
        tmpState.user.name = user.data.name
        tmpState.user.id = user.data._id

        this.setState(tmpState);
    }

    handleSubmitComment(e) {
        let tmpState = this.state
        e.preventDefault();

        let isValid = true;

        if (tmpState.value == '') {
            isValid = false;
            alert('Nhập nội dung bình luận')
        }
        if (isValid) {
            let data = {
                createdBy: {
                    imgUrl: tmpState.user.imgUrl,
                    name: tmpState.user.name,
                },
                content: tmpState.value
            }
            tmpState.data.unshift(data)

            let dataNewcomment = {
                content: tmpState.value,
                createdBy: tmpState.user.id,
                postId: tmpState.postId
            }
            createComment(dataNewcomment)
            tmpState.value = ''
            this.setState(tmpState)
        }

    }

    handleInputChange(value) {
        let tmpState = this.state
        tmpState.value = value;
        this.setState(tmpState);
    }

    render() {
        let $container = document.createElement('div');
        let $title = document.createElement('h5')
        $title.innerHTML = 'Bình luận:'
        $container.append($title);

        appendTo($container, new FormComment({
            src: this.state.user.imgUrl,
            value: this.state.value,
            onChange: (value) => {
                this.handleInputChange(value)
            },
            onSubmit: (e) => {
                this.handleSubmitComment(e)
            },
        }))

        this.state.data.forEach(comment => {
            appendTo($container, new CommentItem({
                src: comment.createdBy.imgUrl,
                content: comment.content,
                name: comment.createdBy.name,
            }))
        })

        return $container;
    }
}