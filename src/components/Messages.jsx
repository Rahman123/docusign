import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {message, removeMessage} = this.props;
    const className = 'message ' + (message.type ? message.type : '');
    const remove = () => removeMessage(message);

    return (
      <div className={className}>
        <div className="content">
          {message.content}
        </div>
        <div className="remove-icon" onClick={remove}>
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }
}


export default class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {messages, removeMessage} = this.props;
    return (
      <div className="wrapper-messages">
        { messages.map((message, i) => {
          return <Message key={i} message={message} removeMessage={removeMessage}/>
        }) }
      </div>
    );
  }
}
