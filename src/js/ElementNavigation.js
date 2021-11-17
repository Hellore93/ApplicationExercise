
class ElementNavigation {
  constructor() {
    const thisElementNavigation = this;
    thisElementNavigation.elementNavigation();
    // thisElementNavigation.renderElement();
  }

  elementNavigation(){
    // const thisElementNavigation = this;
    const panelElementNav = document.querySelector('#panelElementNav');
    // console.log(panelElementNav);

    const renderElement = async () => {
      let uri = 'http://localhost:3131/elements';
      const res = await fetch(uri);
      const posts = await res.json();
      const sum = posts.length % 5 ;
      // console.log(sum);
      const sum2 = Math.floor(posts.length / 5);
      // console.log(sum2);

      // eslint-disable-next-line no-unused-vars
      let template = '';

      let navQuan = 0 ;
      if (sum !== 0) {
        // console.log('Sum nie równa się zero');
        navQuan = sum2 + 1;
      }else{
        // console.log('równa się zero');
        navQuan = sum2;
      }
      const number={};
      for (let i=1; i<=navQuan; i++){
        let number = [i];
        console.log(number);
      }
      // console.log('ile elementów' + ' '+navQuan);
      panelElementNav.innerHTML = number.value;


    };
    window.addEventListener('DOMContentLoaded', () => renderElement());
  }
}
export default ElementNavigation;
