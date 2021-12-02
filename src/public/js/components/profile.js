import { getUser } from "../models/getData.js";
import { updateUser, upfilesInput } from "../models/setData.js";
import { appendTo } from "../utils.js";
import BaseComponent from "./BaseComponent.js";
import InputWrapper from "./inputWrapper.js";

export default class Profile extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                imgUrl: '../../img/user.png',
                adress: '',
                phone: '',
            },
            error: {
                name: '',
                email: '',
                imgUrl: '../../img/user.png',
                adress: '',
                phone: '',
            }
        }
    }
    
    async handleclickSubmit(e) {
        e.preventDefault();
       await updateUser(this.state.data)
    }

    handleInputChange(name, value) {
        let tmpState = this.state;
        tmpState.data[name] = value;
        console.log(tmpState);
        this.setState(tmpState);
    }

    async handleChangeFile(value) {
        const imgUrl = await upfilesInput(value)
        let tmpState = this.state;
        tmpState.data.imgUrl = imgUrl
        this.setState(tmpState);
    }

    async componentDidMount() {
        let user = await getUser();
        let tmpState = this.state;
        tmpState.data.name = user.data.name ? user.data.name : '';
        tmpState.data.email = user.data.email ? user.data.email : '';
        tmpState.data.imgUrl = user.data.imgUrl ? user.data.imgUrl : '../../img/user.png';
        this.setState(tmpState);
    }

    render() {
        let $container = document.createElement('div');
        $container.className = 'content__mainContent ms-3 d-flex';
        $container.style.height = '100vh';
        $container.style.paddingTop = '100px';
        $container.style.overflowY = 'auto';
        $container.style.overflowX = 'hidden';

        let $image = document.createElement('div')
        let $imgUser = document.createElement('img');
        $imgUser.src = this.state.data.imgUrl;
        $imgUser.style.width = '300px';
        $imgUser.style.height = '300px';
        $imgUser.style.objectFit = 'cover';

        $imgUser.className = 'rounded-circle';
        $image.className = 'w-50 pe-3 text-center container';

        let $titleFile = document.createElement('label');
        $titleFile.innerHTML = 'Thay đổi ảnh đại diện';
        $titleFile.className = 'my-2 d-block';

        let $inputUser = document.createElement('input');
        $inputUser.className = 'form-control mb-3';
        $inputUser.type = 'file';
        $inputUser.onchange = (e) => {
            this.handleChangeFile(e.target.files[0]);
        }


        $image.append($imgUser, $titleFile, $inputUser);


        let $detail = document.createElement('form');
        $detail.className = 'w-50 container'


        let _nameUser = new InputWrapper({
            title: 'Họ tên',
            name: 'name',
            type: 'text',
            placeholder: 'Nhập tên của bạn',
            value: this.state.data.name,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.name
        })

        let _email = new InputWrapper({
            title: 'Email',
            name: 'email',
            type: 'text',
            placeholder: 'Nhập email của bạn',
            value: this.state.data.email,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.email
        })

        let _adress = new InputWrapper({
            title: 'Địa chỉ',
            name: 'adress',
            type: 'text',
            placeholder: 'Nhập địa chỉ của bạn',
            value: this.state.data.adress,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.adress
        })

        let _phone = new InputWrapper({
            title: 'Số điện thoại',
            name: 'phone',
            type: 'number',
            placeholder: 'Nhập số điện thoại của bạn',
            value: this.state.data.phone,
            onChange: (name, value) => {
                this.handleInputChange(name, value)
            },
            errorsMessage: this.state.error.phone
        })

        appendTo($detail, _nameUser, _email, _adress, _phone)

        let $btnUpdate = document.createElement('button');
        $btnUpdate.className = 'btn btn-warning';
        $btnUpdate.innerHTML = 'Cập nhật hồ sơ'

        $detail.append($btnUpdate);

        $detail.onsubmit = (e)=>{
            this.handleclickSubmit(e)
        }

        $container.append($image, $detail);

        return $container;
    }
}