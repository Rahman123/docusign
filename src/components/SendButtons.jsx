import React from 'react';
import Dropdown from 'react-dropdown';

const dropdownPlaceholder = (<span>Select Role <i className="fa fa-caret-down"></i></span>);

export default class SendButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {signInPerson, sendWithEmail} = this.props;

    return (
      <div className="wrapper-send-buttons">
        <button className="button" onClick={signInPerson}><i className="fa fa-pencil-square-o"></i>Sign in Person</button>
        <button className="button" onClick={sendWithEmail}><i className="fa fa-paper-plane"></i>Send with Email</button>
      </div>
    );
  }
}
