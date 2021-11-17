'use strict';
import ElementNavigation from './ElementNavigation.js';
import ElementView from './ElementView.js';

export const app = {

  initElementView:function(){
    const thisApp = this;
    thisApp.view = new ElementView();
  },


  initFavorite : function(){
    // const thisApp = this;
    const favoriteElement = document.querySelectorAll('.btn-favorite').forEach(item => {
      item.addEventListener('click' , event => {
        console.log('działam' , event);
        console.log(favoriteElement);
      });
    });
  },

  init:function(){
    const thisApp = this;
    // thisApp.initData();
    thisApp.initLogin();
    thisApp.initRegistration();
    thisApp.initElementNavigation();
    thisApp.initElementView();
  },

  initLogin: function () {
    const thisApp = this;
    thisApp.dataUser = {};
    const url2 = 'http://localhost:3132/users';

    const passwordButton = document.querySelector('.reg');
    passwordButton.addEventListener('click', function(event){
      event.preventDefault();
      const registration = document.querySelector('.registration');
      registration.classList.remove('hidden');
      const login = document.querySelector('.container');
      login.classList.add('hidden');
    });

    fetch(url2)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.dataUser.elementsUser = parsedResponse;
        const login = document.querySelector('#username');
        const password = document.querySelector('#password');
        const loginButton = document.querySelector('.loginButton');
        loginButton.addEventListener('click', function(event){
          event.preventDefault();
          for(let i=0; i<parsedResponse.length; i++){
            const L = parsedResponse[i].Login;
            const P =parsedResponse[i].Password;
            if (login.value == L && password.value == P) {
              // console.log('podany login i hasło istnieją');
              thisApp.initHidden();
              break;
            }else{
              // console.log('Nie możemy cię zalogować');
            }}
        });
      });
  },

  initHidden : function (){
    const element = document.querySelector('#element');
    element.classList.remove('hidden');
    const login = document.querySelector('.container');
    login.classList.add('hidden');
  },

  initElementNavigation: function(){
    const thisApp = this;
    const elemNavigation = document.querySelector('.panelElementNav');
    thisApp.navigation = new ElementNavigation(elemNavigation);
  },

  initRegistration : function () {
    const registrationButton = document.querySelector('.regButton');
    registrationButton.addEventListener('click', function(event){
      event.preventDefault();
      createAcount();
      testEmail();
      testLogin();
    });

    const testLogin = function ValidationLogin(){
      if(document.querySelector('#usernameReg').value.length>3){
        return (true);
      }
      alert('You have entered an invalid login');
    };

    const testEmail = function ValidateEmail()
    {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.querySelector('#useremail').value))
      {
        return (true);
      }
      alert('You have entered an invalid email address!');
      return (false);
    };


    // eslint-disable-next-line no-unused-vars
    const createAcount = async(e) => {
      // e.preventDefault();
      const doc = {
        Login: document.querySelector('#usernameReg').value,
        Email: document.querySelector('#useremail').value,
        Password: document.querySelector('#passwordReg').value
      };

      // eslint-disable-next-line no-cond-assign
      if (testEmail() == true && testLogin() == true){
        await fetch('http://localhost:3132/users', {
          method: 'POST',
          body: JSON.stringify(doc),
          headers:{ 'Content-Type': 'application/json'}
        });
      }else{console.log('NIE ZALOGUJE');}
    };
  },
};

app.init();