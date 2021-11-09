'use strict';
import { settings } from './settings.js';
import Element from './Element.js';
import ElementNavigation from './ElementNavigation.js';

export const app = {
  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.elements;
    // console.log('url' + url);
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.elements = parsedResponse;
        thisApp.initElement();
      });
  },

  initElement: function(){
    const thisApp = this;
    for(let elementData in thisApp.data.elements){
      new Element(thisApp.data.elements[elementData].id, thisApp.data.elements[elementData]);
    }
    thisApp.initFavorite();
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
    thisApp.initData();
    thisApp.initLogin();
    thisApp.initRegistration();
    // thisApp.initCreateAcount();
    thisApp.initElementNavigation();
  },

  initLogin: function () {
    const thisApp = this;
    thisApp.dataUser = {};
    const url2 = settings.db.urlUser + '/' + settings.db.users;

    const passwordButton = document.querySelector('.reg');
    passwordButton.addEventListener('click', function(event){
      event.preventDefault();
      const registration = document.querySelector('.registration');
      registration.classList.remove('hidden');
      const login = document.querySelector('.container');
      login.classList.add('hidden');
    });

    // console.log(url2);
    fetch(url2)
      .then(function (rawResponse) {
        // console.log('rawResponse' + ' ' +rawResponse.length);
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.elementsUser = parsedResponse;
        // console.log(Object.values(parsedResponse));

        const login = document.querySelector('#username');
        const password = document.querySelector('#password');
        const loginButton = document.querySelector('.loginButton');
        loginButton.addEventListener('click', function(event){
          event.preventDefault();
          for(let i=0; i<parsedResponse.length; i++){
            const L = parsedResponse[i].Login;
            const P =parsedResponse[i].Password;
            if (login.value == L && password.value == P) {
              console.log('podany login i hasło istnieją');
              thisApp.initHidden();
              break;
            }else{
              console.log('Nie możemy cię zalogować');
            }}
        });
      });
  },

  initHidden : function (){
    console.log('funkcja działa');
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

    const formLog = document.querySelector('form');
    const registrationButton = document.querySelector('.regButton');
    registrationButton.addEventListener('click', function(event){
      event.preventDefault();

      createAcount();
    });

    const createAcount = async(e) => {
      // e.preventDefault();
      const doc = {
        Login: document.querySelector('#usernameReg').value,
        Email: document.querySelector('#useremail').value,
        Password: document.querySelector('#passwordReg').value
      };

      await fetch('http://localhost:3132/users', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers:{ 'Content-Type': 'application/json'}
      });
    // window.location.replaced('/index.html');
    };
    formLog.addEventListener('submit', createAcount);
  },
};

app.init();