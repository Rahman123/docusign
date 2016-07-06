import React from 'react';

export default class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {template, toggleTemplateSelect} = this.props;
    const {selected} = template;
    const className = 'wrapper wrapper-template ' + (selected ? 'selected' : '');
    const select = () => toggleTemplateSelect(template.templateId);

    return (
      <div className={className} onClick={select}>
        <div className="name">
          {template.name}
        </div>
        {template.selected ? <i className="fa fa-check checkmark"></i> : null}
      </div>
    );
  }
}
