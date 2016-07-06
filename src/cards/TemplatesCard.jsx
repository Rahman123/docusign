import React from 'react';

import Template from '../components/Template.jsx';
import CardHeader from '../components/CardHeader.jsx';

export default class TemplatesCard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTemplates() {
    const {templates, toggleTemplateSelect} = this.props;
    return templates.map(template => {
      return <Template template={template} key={template.templateId} toggleTemplateSelect={toggleTemplateSelect}/>
    });
  }

  render() {

    return (
      <div id="templates-card" className="card">
        <CardHeader title="Documents" icon="file-text"/>
        {this.renderTemplates()}
      </div>
    );
  }
}
