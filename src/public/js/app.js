import Navbar from "./components/navbar.js";
import { appendTo } from "./utils.js";
import IndexScreen from "./view/indexScreen.js";

let $app = document.querySelector('#root');
console.log($app);
appendTo($app, new IndexScreen());