//import js套件
import 'jquery';
import "bootstrap";

//import scss
import './scss/index.scss';

//import 共用 js
import './js/sidebar'
import './pages/custom'
import { sidebar } from './js/menu';


sidebar()
if (module.hot) {
    module.hot.accept();
 }