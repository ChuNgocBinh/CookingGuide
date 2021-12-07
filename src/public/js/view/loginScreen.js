import BaseComponent from "../components/BaseComponent.js";
import InputWrapper from "../components/Common/inputWrapper.js";
import { loginUser } from "../models/setData.js";
import { appendTo } from "../utils.js";

export default class LoginScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                password: '',
            },
            errors: {
                name: '',
                password: '',
            }
        }
    }

    handleInputChange(name, value) {
        let tmpState = this.state;
        tmpState.data[name] = value;
        this.setState(tmpState);
    }

    async handleSubmitForm(e) {
        e.preventDefault();
        let tmpState = this.state;
        let isValid = true;

        if (tmpState.data.name == '') {
            tmpState.errors.name = 'Tên đăng nhập không được để trống';
            isValid = false;
        } else {
            tmpState.errors.name = ''
        }

        if (tmpState.data.password == '' || tmpState.data.password.length < 6) {
            tmpState.errors.password = 'Password không hợp lệ';
            isValid = false;
        } else {
            tmpState.errors.password = ''
        }

        this.setState(tmpState);

        if (isValid) {
            let data = {
                name: this.state.data.name,
                password: this.state.data.password
            }
            await loginUser(data)
            router.navigate('/home')

        }
    }

    render() {
        let $container = document.createElement('div')
        $container.style.backgroundImage = 'url(../../img/home-bg.jpg)';
        $container.style.height = '100vh';
        $container.className = 'd-flex justify-content-center align-items-center';

        let $form = document.createElement('form');
        $form.className = 'form container';
        $form.onsubmit = (e) => {
            this.handleSubmitForm(e);
        }

        let $title = document.createElement('h2');
        $title.innerHTML = 'Đăng nhập';
        $title.className = 'text-center';

        $form.append($title);

        let _name = new InputWrapper({
            title: 'Tên đăng nhập',
            placeholder: 'Nhập tên đăng nhập',
            name: 'name',
            type: 'text',
            value: this.state.data.name,
            onChange: (name, value) => {
                this.handleInputChange(name, value);
            },
            errorsMessage: this.state.errors.name
        })

        let _password = new InputWrapper({
            title: 'Mật khẩu',
            placeholder: 'Nhập mật khẩu',
            name: 'password',
            type: 'password',
            value: this.state.data.password,
            onChange: (name, value) => {
                this.handleInputChange(name, value);
            },
            errorsMessage: this.state.errors.password
        })

        appendTo($form, _name, _password)

        let $btnRegister = document.createElement('button');
        $btnRegister.className = 'btn btn-warning w-100';
        $btnRegister.innerHTML = 'Đăng ký';

        $form.append($btnRegister);

        let $directionRegister = document.createElement('div');
        $directionRegister.className = 'text-center mt-3' ;

        let $qsRegister = document.createElement('span');
        $qsRegister.innerHTML = 'Bạn chưa có tài khoản?';
        $qsRegister.className = 'me-2';
        let $linkRegister = document.createElement('a');
        $linkRegister.innerHTML = 'Đăng ký';
        $linkRegister.href = '#';
        $linkRegister.onclick = (e) => {
            e.preventDefault();
            router.navigate('/register')
        }

        $directionRegister.append($qsRegister, $linkRegister);
        $form.append($directionRegister);

        $container.append($form);

      

        return $container;
    }
}