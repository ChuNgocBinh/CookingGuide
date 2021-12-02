import { appendTo } from "./utils.js";
import CartScreen from "./view/cartScreen.js";
import CreateFoodScreen from "./view/creaateFoodScreen.js";
import DetailScreen from "./view/detailScreen.js";
import DrinkScreen from "./view/drinkScreen.js";
import FoodScreen from "./view/foodScreen.js";
import IndexScreen from "./view/indexScreen.js";
import LoginScreen from "./view/loginScreen.js";
import ProfileScreen from "./view/profileScreen.js";
import RegisterScreen from "./view/registerScreen.js";
import ScreamScreen from "./view/screamScreen.js";

let root = null;
let useHash = true; // Defaults to: false
let hash = '#'; // Defaults to: '#'
let router = new Navigo(root, useHash, hash);

let $root = document.querySelector('#root');
appendTo($root, new IndexScreen());

let postIdJSON = localStorage.getItem('postId');
let postId = JSON.parse(postIdJSON);

router
    .on('/home', function () {
        $root.innerHTML = '';
        appendTo($root, new IndexScreen())
    }).resolve();

router
    .on('/register', function () {
        $root.innerHTML = '';
        appendTo($root, new RegisterScreen())
    }).resolve();

router
    .on('/login', function () {
        $root.innerHTML = '';
        appendTo($root, new LoginScreen())
    }).resolve();

router
    .on('/food', function () {
        $root.innerHTML = '';
        appendTo($root, new FoodScreen())
    }).resolve();

router
    .on('/drink', function () {
        $root.innerHTML = '';
        appendTo($root, new DrinkScreen())
    }).resolve();

router
    .on('/scream', function () {
        $root.innerHTML = '';
        appendTo($root, new ScreamScreen())
    }).resolve();

router
    .on('/create-food', function () {
        $root.innerHTML = '';
        appendTo($root, new CreateFoodScreen())
    }).resolve();

router
    .on(`/details/${postId}`, function () {
        $root.innerHTML = '';
        appendTo($root, new DetailScreen())
    }).resolve();

router
    .on(`/profile`, function () {
        $root.innerHTML = '';
        appendTo($root, new ProfileScreen())
    }).resolve();

router
    .on(`/cart`, function () {
        $root.innerHTML = '';
        appendTo($root, new CartScreen())
    }).resolve();




window.router = router;