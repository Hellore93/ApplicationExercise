import {select, templates} from './settings.js';
import {utils} from './utils.js';

class Element {
  constructor(id, data) {
    const thisElement = this;
    thisElement.id = id;
    thisElement.data = data;
    thisElement.renderInMenu();
    // thisElement.elementNavigation();
  }

  renderInMenu() {
    const thisElement = this;

    const generatedHTML = templates.panelElement(thisElement.data);
    /* create element using utils.createElementFromHTML */
    thisElement.element = utils.createDOMFromHTML(generatedHTML);
    thisElement.elements = utils.createDOMFromHTML(generatedHTML);
    /* find menu container */
    const panelElement = document.querySelector(select.containerOf.panelElement);
    /* add element to menu */
    panelElement.appendChild(thisElement.element);
  }
  // elementNavigation(){
  //   const panelElementNav = document.querySelector('.panelElementNav');
  //   panelElementNav.innerHTML('asd');
  // }
}

export default Element;