
class ElementNavigation {
  // eslint-disable-next-line no-unused-vars
  constructor(element) {
    const thisElementNavigation = this;
    thisElementNavigation.elementNavigation();
  }

  elementNavigation(){
    const thisElementNavigation = this;
    const panelElementNav = document.querySelector('#panelElementNav');
    // panelElementNav.innerHTML = 'asd';
    console.log(panelElementNav);

    const url = 'http://localhost:3132/users';
    console.log(url);
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisElementNavigation.data.elements = parsedResponse;
      });
  }
}
export default ElementNavigation;
