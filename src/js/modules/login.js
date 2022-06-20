/**
 * Form 
 *
 * @file login.js
 */

import { $, validate, Swal } from '../vendors';
import { authInfo, loggedInUser } from '../utils/contants';

const login = (function () {
    const init = function () {
        if($('#js-login').length > 0){
            loginFormSubmit();
        }
        
    };

    const loginFormSubmit = () => {
        const loginForm = document.getElementById('js-login');

        $(loginForm).validate({
            errorElement: 'div',
            messages: {
                email: {
                    required: 'Lütfen mail adresinizi giriniz',
                },
                password: {
                    required: 'Lütfen şifrenizi giriniz',
                },
            },
            rules: {
                email: {
                    required: true,
                    maxlength: 30,
                },
                password: {
                    required: true,
                    maxlength: 30,
                },
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parents('#js-login .c-form__group'));
            },

            submitHandler: async function (form) {
                let formData = {};

                formData.Email = document.getElementById('email').value;
                formData.Password = document.getElementById('password').value;

                authControl(formData);
            }
        });
    };

    const authControl = (formData) => {

        if (authInfo.Email == formData.Email && authInfo.Password == formData.Password) {
            localStorage.setItem("loggedInUser", true);
            Swal.fire(
                'Başarılı',
                'Giriş işlemi başarılı.',
                'success'
              ).then(function () {
                window.location.href = '/invoice.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mail adresiniz veya şifreniz hatalı tekrar deneyiniz.',
            })
        }
    }

    return {
        init,
    };
}());

export default login;
