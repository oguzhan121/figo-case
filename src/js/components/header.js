/**
 * Header Layout
 *
 * @file header.js
 */

 import { loggedInUser} from '../utils/contants';

 const header = (function () {
   const init = function () {
     authControl();
   };
 
    const authControl = () =>{
      const headerMenu = document.querySelector('.o-header__menu');  
      const loggedBtn = document.querySelector('.o-header__auth');  

      if(loggedInUser == "true"){
        headerMenu.classList.add('o-header--active');
        loggedBtn.classList.add('o-header--active');
       }
    } 
 
   return {
     init,
   };
 }());
 
 export default header;
 