'use strict';
class ElementView{
  constructor() {
    const thisElementView = this;
    thisElementView.renderPost();
    thisElementView.try();
  }

  renderPost(){
    const ElementViewDocument = document.querySelector('#panelElement');
    const panelElementNav = document.querySelector('#panelElementNav');
    // const elementButton = document.querySelectorAll('#postNavi');
    const renderPostAsync = async () => {
      let uri = 'http://localhost:3131/elements';


      const res = await fetch(uri);
      const posts = await res.json();

      const sum = Math.ceil(posts.length / 5) ;
      // console.log(sum);

      const number = [];
      let template2 = '';
      for (let i=0; i<=sum-1; i++){
        number.push(i);
      }
      number.forEach(num =>{
        template2 +=`
      <button id="postNavi" id-data="${num}">${num+1}</button>
      `;
      });
      panelElementNav.innerHTML = template2;

      // //eslint-disable-next-line no-unused-vars
      let naviButtonState = 0;
      // // eslint-disable-next-line no-unused-vars
      const naviButton = document.querySelectorAll('#postNavi');
      naviButton.forEach(item =>{
        item.addEventListener('click', function(event){
          event.preventDefault();
          const idData = item.getAttribute('id-data');
          // naviButtonState.push(idData);

          console.log('idData' + idData);
          // idData = naviButtonState;
          naviButtonState = idData;
          console.log(naviButtonState);
        });
      });
      console.log(naviButton);
      console.log('naviButtonState' + naviButtonState);
      console.log(naviButtonState);



      let a = 0 + (naviButtonState*5);
      let b = 5 + (naviButtonState*5);
      // eslint-disable-next-line no-unused-vars
      let template = '';
      posts.slice(a,b).forEach(post =>{
        template += `
              <div id="block" class="" data-id=${post.id}>
              <div id="favorite-btn" class="btn-favorite">
                <button class="favorite-button">Test</button>
              </div>
              <h3 class="title">${post.name}</h3>
              <p class="description">${post.description}</p>
              <p class="description">${post.ingredients}</p>
              <div class="loopImage">${post.pictures}</div>
            </div>
            `;
      });
      ElementViewDocument.innerHTML = template;
    };
    window.addEventListener('DOMContentLoaded', () => renderPostAsync());
  }

  try(){

  }
}

export default ElementView;