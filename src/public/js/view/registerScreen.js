import BaseComponent from "../components/BaseComponent.js";
import InputWrapper from "../components/Common/inputWrapper.js";
import { registerUser } from "../models/setData.js";
import { appendTo, validateEmail } from "../utils.js";

export default class RegisterScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                password: '',
                cfpassword: '',
            },
            errors: {
                name: '',
                email: '',
                password: '',
                cfpassword: '',
            }
        }
    }

    handleInputChange(name, value) {
        let tmpState = this.state;
        tmpState.data[name] = value;
        this.setState(tmpState);
    }

    handleSubmitForm(e) {
        e.preventDefault();
        let tmpState = this.state;
        let isValid = true;

        if (tmpState.data.name == '') {
            tmpState.errors.name = 'Tên đăng nhập không được để trống';
            isValid = false;
        }else{
            tmpState.errors.name = ''
        }

        if (tmpState.data.email == '' || !validateEmail(tmpState.data.email)) {
            tmpState.errors.email = 'Email không hợp lệ';
            isValid = false;
        }else{
            tmpState.errors.email = ''
        }

        if (tmpState.data.password == '' || tmpState.data.password.length < 6) {
            tmpState.errors.password = 'Password không hợp lệ';
            isValid = false;
        }else{
            tmpState.errors.password = ''
        }

        if (tmpState.data.cfpassword == '' || tmpState.data.cfpassword != tmpState.data.password) {
            tmpState.errors.cfpassword = 'Xác nhận password không hợp lệ';
            isValid = false;
        }else{
            tmpState.errors.cfpassword = ''
        }

        this.setState(tmpState);

        if(isValid) {
            let data = {
                name: this.state.data.name,
                email: this.state.data.email,
                password: this.state.data.password
            }
            registerUser(data)
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
        $title.innerHTML = 'Đăng ký tài khoản mới';
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

        let _email = new InputWrapper({
            title: 'Email',
            placeholder: 'Nhập email',
            name: 'email',
            type: 'text',
            value: this.state.data.email,
            onChange: (name, value) => {
                this.handleInputChange(name, value);
            },
            errorsMessage: this.state.errors.email
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

        let _cfpassword = new InputWrapper({
            title: 'Xác nhận mật khẩu',
            placeholder: 'Xác nhận mật khẩu',
            name: 'cfpassword',
            type: 'password',
            value: this.state.data.cfpassword,
            onChange: (name, value) => {
                this.handleInputChange(name, value);
            },
            errorsMessage: this.state.errors.cfpassword
        })

        appendTo($form, _name, _email, _password, _cfpassword)

        let $btnRegister = document.createElement('button');
        $btnRegister.className = 'btn btn-warning w-100';
        $btnRegister.innerHTML = 'Đăng ký';

        $form.append($btnRegister);

        let $directionRegister = document.createElement('div');
        $directionRegister.className = 'text-center mt-3' ;

        let $qsRegister = document.createElement('span');
        $qsRegister.innerHTML = 'Bạn đã có tài khoản?';
        $qsRegister.className = 'me-2';
        let $linkRegister = document.createElement('a');
        $linkRegister.innerHTML = 'Đăng nhập';
        $linkRegister.href = '#';
        $linkRegister.onclick = (e) => {
            e.preventDefault();
            router.navigate('/login')
        }

        $directionRegister.append($qsRegister, $linkRegister);
        $form.append($directionRegister);

        $container.append($form);
        return $container;
    }
}