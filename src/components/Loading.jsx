import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper-loading">
        <h1 className="ds-message">Preparing Envelopes...</h1>
      </div>
    );
  }
}
