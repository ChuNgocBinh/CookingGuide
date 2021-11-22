import BaseComponent from "./BaseComponent.js";

export default class Navbar extends BaseComponent {


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
        $nameUser.innerHTML = 'Chu Ngoc Binh'
        let $imgUser = document.createElement("div")
        $imgUser.className = 'navbar-user-img ms-1'
        let $imgFace = document.createElement("img")
        $imgFace.src = "../../img/user.jpg";
        $imgUser.append($imgFace)

        $user.append($nameUser, $imgUser);

        $container.append($brand, $search, $user);

        return $container;
    }
}