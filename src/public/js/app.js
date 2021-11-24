import Navbar from "./components/navbar.js";
import { appendTo } from "./utils.js";
import IndexScreen from "./view/indexScreen.js";

let $app = document.querySelector('#root');
appendTo($app, new IndexScreen());