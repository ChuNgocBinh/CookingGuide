import BaseComponent from "../BaseComponent.js";
import InputWrapper from "../Common/inputWrapper.js";
import { createPost, upfilesInput } from "../../models/setData.js";
import { appendTo } from "../../utils.js";

export default class CreateFood extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                imgUrl: '',
                description: '',
                content: '',
                price: '',
                rule: '',
            },
            error: {
                title: '',
                imgUrl: '',
                description: '',
                content: '',
                price: '',
                rule: '',
            }
        }
    }

    async handleChangeFile(value) {
        const imgUrl = await upfilesInput(value)
        let tmpState = this.state;
        tmpState.data.imgUrl = imgUrl
        this.setState(tmpState);
    }


    async handleclickSubmit(e, editor,$typefood) {
        e.preventDefault();
        const editorData = editor.getData();
        let tmpState = this.state;
        tmpState.data.content = editorData;
        let selectedValue = $typefood.options[$typefood.selectedIndex].value;
        tmpState.data.rule = selectedValue;

        console.log(tmpState);

        await createPost(tmpState.data)
        tmpState.data=  {
            title: '',
            imgUrl: '',
            description: '',
            content: '',
            rule: '',
            price: '',
        }
        this.setState(tmpState);

    }

    handleInputChange(name, value) {
        let tmpState = this.state;
        tmpState.data[name] = value;
        this.setState(tmpState);
    }

    render() {
        let $form = document.createElement('form');
        $form.className = 'content__mainContent ms-3 container';
        $form.style.height = '100vh';
        $form.style.paddingTop = '100px';
        $form.style.overflowY = 'auto';
        $form.style.overflowX = 'hidden';

        let $title = document.createElement('h2');
        $title.innerHTML = 'Tạo bài mới'

        let _nameFood = new InputWrapper({
            title: 'Tên món ăn',
            name: 'title',
            type: 'text',
            placeholder: 'Nhập tên món ăn',
            value: this.state.data.title,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.title
        })


        let _description = new InputWrapper({
            title: 'Mô tả',
            name: 'description',
            type: 'text',
            placeholder: 'Nhập mô tả món ăn',
            value: this.state.data.description,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.description
        })

        $form.append($title);


        let _price = new InputWrapper({
            title: 'Giá',
            name: 'price',
            type: 'number',
            placeholder: 'Nhập giá món ăn',
            value: this.state.data.price,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.price
        })

        appendTo($form, _nameFood, _description, _price)

        let $brand = document.createElement('p');
        $brand.innerHTML = 'Loại món ăn: '
        $brand.className = 'my-2'

        let $typefood = document.createElement('select')
        $typefood.className = 'form-select'
        // $typefood.selected = 

        let $optionFood = document.createElement('option')
        $optionFood.value = 'food';
        $optionFood.innerHTML = 'Food';

        let $optionDrink = document.createElement('option')
        $optionDrink.value = 'drink';
        $optionDrink.innerHTML = 'Drink';

        let $optionScream = document.createElement('option')
        $optionScream.value = 'scream';
        $optionScream.innerHTML = 'Scream';
        $typefood.append($optionFood, $optionDrink, $optionScream)
      
        $form.append($brand);
        $form.append($typefood);

        let $titleFile = document.createElement('label');
        $titleFile.innerHTML = 'Ảnh bài viết';
        $titleFile.className = 'my-2 d-block';
        $form.append($titleFile);

        let $imgPost = document.createElement('input');
        $imgPost.className = 'form-control mb-3';
        $imgPost.type = 'file';
        $imgPost.onchange = (e) => {
            this.handleChangeFile(e.target.files[0]);
        }

        let $imgReview = document.createElement('img');
        $imgReview.src = this.state.data.imgUrl
        $imgReview.className = 'd-block w-50 mb-3'
        $form.append($imgPost, $imgReview);

        let $content = document.createElement('label');
        $content.innerHTML = 'Nội dung';
        $content.className = 'mb-2';
        $form.append($content);

        let $editor = document.createElement('div');
        $editor.className = 'editor'

        let editor;
        ClassicEditor
            .create($editor)
            .then(newEditor => {
                editor = newEditor;
            })
            .catch(error => {
                console.error(error);
            });

        let $btn = document.createElement('button');
        $btn.className = 'btn mt-3 btn-warning';
        $btn.innerHTML = 'Tạo bài viết';
        $form.onsubmit = (e) => {
            this.handleclickSubmit(e, editor,$typefood)

        }

        $form.append($editor, $btn)
        return $form;
    }
}