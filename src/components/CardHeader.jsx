import React from 'react';

export default class CardHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, icon} = this.props;
    const className = "icon fa fa-" + icon;
    return (
      <div className="card-header">
        <h1 className="title"><i className={className}></i> {title}</h1>
      </div>
    );
  }
}

CardHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string
};
