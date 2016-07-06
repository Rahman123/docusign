import React from 'react';

export default class InPersonSigningButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: this.props.button
    }
  }

  getLabel() {
    const {button} = this.state;
    if (button.isRefreshing) {
      return (
        <i className="fa fa-spinner fa-spin"></i>
      );
    } else {
      return button.isActive ? button.label : 'Refresh Link';
    }
  }

  onButtonClick() {
    const {button} =  this.state;
    if (button.isActive) {
      button.onClick();
      this.toggleActive();
    } else if (button.isRefreshing) {
      return;
    } else {
      this.refreshUrl();
    }
  }

  refreshUrl() {
    const {refreshSigningUrl} = this.props;
    this.setRefreshing();

    const self = this;
    refreshSigningUrl((url) => {
      const {button} = self.state;
      button.onClick = () => {
        window.open(url);
      };
      button.isRefreshing = false;
      button.isActive = true;
      self.setState({
        button: button
      });
    });
  }

  toggleActive() {
    const {button} = this.state;
    button.isActive = !button.isActive;
    this.setState({
      button: button
    });
  }

  setRefreshing() {
    const {button} = this.state;
    button.isRefreshing = true;
    this.setState({
      button: button
    });
  }

  render() {
    const {button} = this.state;
    const onClick = this.onButtonClick.bind(this);
    return (
      <button className='button' onClick={onClick}>{this.getLabel()}</button>
    );
  }
}
