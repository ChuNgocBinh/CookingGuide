import BaseComponent from "../BaseComponent.js";

export default class CommentItem extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'comment'

        let $user = document.createElement('div');
        $user.className = 'userComment'

        let $imgUser = document.createElement('img');
        $imgUser.src = this.props.src;
        $imgUser.className = 'userComment-img';

        $user.append($imgUser);

        let $content = document.createElement('div');
        $content.className = 'content--comment'

        let $nameUser = document.createElement('div');
        $nameUser.className = 'nameUser-comment'
        $nameUser.innerHTML = '<b>' + this.props.name + '</b>';

        let $comment = document.createElement('p');
        $comment.className = 'commentUser-comment'
        $comment.innerHTML = this.props.content

        $content.append($nameUser, $comment)

        $container.append($user, $content)

        return $container;
    }
}