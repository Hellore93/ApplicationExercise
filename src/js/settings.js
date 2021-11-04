export const select = {
  templateOf:{
    element: '#template-page-element'
  },
  containerOf:{
    panelElement: '#panelElement'
  },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    urlUser: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3132' : ''),
    elements: 'elements',
    users: 'users',
  },
};

export const templates = {
  panelElement: Handlebars.compile(document.querySelector(select.templateOf.element).innerHTML),
};