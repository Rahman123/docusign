import React from 'react';
import ReactDom from 'react-dom';

import './main.less';

// Required Components
import APIContainer from './containers/APIContainer';

export default class App {
  constructor({templates, recipients, api}, container) {
    this._container = container;
    this._templates = templates;
    this._recipients = recipients;
    this._api = api;

    this._render();
  }

  _render() {
    const App = (
      <APIContainer
        templates={this._templates}
        recipients={this._recipients}
        api={this._api}/>
    );

    ReactDom.render(App, this._container);
  }
}
