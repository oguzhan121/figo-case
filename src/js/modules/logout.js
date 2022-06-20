/**
 * Form 
 *
 * @file Logout.js
 */

 const logout = (function () {
     const init = function () {
         logoutMethod();
     };
 
     const logoutMethod = () => {
         const logoutBtn = document.getElementById('js-logout');
        
         logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = '/';

         })
     };

 
     return {
         init,
     };
 }());
 
 export default logout;
 