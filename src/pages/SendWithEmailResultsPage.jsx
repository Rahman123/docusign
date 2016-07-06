import React from 'react';
import {interpretResultsForSendWithEmail} from '../utils/utils.js';

export default class SendWithEmailResultsPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    const {results} = this.props;
    const {status, message, buttons} = interpretResultsForSendWithEmail(results);
    this.setState({
      status: status,
      message: message,
      buttons: buttons
    });
  }

  renderButtons(buttonsList) {
    const {close, clearResults} = this.props.methods;

    return buttonsList.map((button, i) => {
      switch (button.type) {
        case 'close':
          return (
            <button key={i} className='button' onClick={close}>{button.label}</button>
          );
        break;

        case 'back':
          return (
            <button key={i} className='button' onClick={clearResults}>{button.label}</button>
          );
        break;

        default:
          throw new Error('Button type not defined: ', button.type);
      }
    });
  }

  render() {
    const {methods} = this.props;
    const {status, message, buttons} = this.state;

    return (
      <div className="page page-results">
        <div className="status">
          {status}
        </div>
        <div className="ds-message">
          {message}
        </div>
        <div className="buttons">
          {buttons ? this.renderButtons(buttons) : null}
        </div>
      </div>
    );
  }
}

// what functions are available on the results page?
// close
// try Again
// url link (to signing in person)
