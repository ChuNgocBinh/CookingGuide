import { getUser } from "../models/getData.js";
import BaseComponent from "./BaseComponent.js";

export default class Navbar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Đăng nhập',
            image: '../../img/user.png',
        }
    }

    handleClickProfile(e) {
        e.preventDefault();
        router.navigate('/profile');
    }

    handleClickSignOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        router.navigate('/login');
    }

    async componentDidMount() {
        let user = await getUser()
        let tmpState = this.state;
        tmpState.name = user.data.name ? user.data.name : `Đăng nhập`
        tmpState.image = user.data.imgUrl ? user.data.imgUrl : '../../img/user.png'
        this.setState(tmpState);
    }


    render() {
        let $container = document.createElement("div");
        $container.className = 'navbar d-flex justify-content-around align-items-center'

        let $brand = document.createElement("div");
        $brand.className = 'navbar-brand d-flex justify-content-center';
        let $img = document.createElement("img");
        $img.src = "../../img/brand.png";

        $brand.append($img);

        let $search = document.createElement("form");
        $search.className = 'navbar-search d-flex align-items-center justify-content-center'
        let $inputSearch = document.createElement("input");
        $inputSearch.className = 'flex-grow-1 ms-1 ps-2'
        $inputSearch.placeholder = 'Tìm kiếm...'

        let $btnSearch = document.createElement("button");
        $btnSearch.innerHTML = '<i class="fas fa-search"></i>';
        $btnSearch.className = 'me-1'

        $search.append($inputSearch, $btnSearch)

        let $user = document.createElement("div");
        $user.className = 'navbar-user d-flex align-items-center justify-content-center';

        let $nameUser = document.createElement("div");
        $nameUser.innerHTML = this.state.name;

        let $imgUser = document.createElement("div")
        $imgUser.className = 'navbar-user-img ms-2'

        let $imgFace = document.createElement("img")
        $imgFace.src = this.state.image;
        $imgUser.append($imgFace)

        let $dropdown = document.createElement("div");
        $dropdown.className = 'dropdown mx-2';


        let $btnDropdown = document.createElement("btn")
        $btnDropdown.innerHTML = '<i class="fas fa-chevron-down"></i>'
        $btnDropdown.setAttribute('data-bs-toggle', 'dropdown')

        let $listDropdown = document.createElement("ul");
        $listDropdown.className = 'dropdown-menu';

        let $listProfile = document.createElement('li')
        let $linkProfile = document.createElement('a');
        $linkProfile.href = '#';
        $linkProfile.innerHTML = 'Hồ sơ';
        $linkProfile.className = 'dropdown-item';
        $listProfile.append($linkProfile);
        $linkProfile.onclick = (e) => {
            this.handleClickProfile(e);
        }

        let $listSignOut = document.createElement('li')
        let $linkSignOut = document.createElement('a');
        $linkSignOut.href = '#';
        $linkSignOut.innerHTML = 'Đăng xuất';
        $linkSignOut.className = 'dropdown-item';
        $listSignOut.append($linkSignOut);
        $linkSignOut.onclick = (e) => {
            this.handleClickSignOut(e);
        }

        let $listLogin = document.createElement('li')
        let $linkLogin = document.createElement('a');
        $linkLogin.href = '#';
        $linkLogin.innerHTML = 'Đăng nhập';
        $linkLogin.className = 'dropdown-item';
        $listLogin.append($linkLogin);
        $linkLogin.onclick = (e) => {
            e.preventDefault();
            router.navigate('/login')
        }

        $listDropdown.append($listProfile, $linkSignOut, $listLogin);
        $dropdown.append($btnDropdown, $listDropdown)


        $user.append($nameUser, $imgUser, $dropdown);

        $container.append($brand, $search, $user);

        return $container;
    }
}