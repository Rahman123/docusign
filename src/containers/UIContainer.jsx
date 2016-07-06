import React from 'react';
import {getAvailableRoles} from '../utils/utils.js';

import AppLayout from '../layouts/AppLayout.jsx';

export default class UIContainer extends React.Component {
  constructor(props) {
    super(props);

    const {templates, recipients} = this.props;
    this.roles = ['None', 'Signer 1', 'Signer 2', 'Reviewer'];
    this.state = {
      templates: templates, // Array of templates
      recipients: recipients // Array of recipients
    }
  }

  assignRoleToRecipient(role, selectedRecipient) {
    let {recipients} = this.state;

    recipients.forEach(currentRecipient => {
      if (currentRecipient.Id === selectedRecipient.Id) {
        currentRecipient.role = role;
      }
    });

    this.setState({
      recipients: recipients
    });
  }

  toggleTemplateSelect(id) {
    let {templates} = this.state;

    templates.filter(tmp => {
      return tmp.templateId === id;
    }).map(tmp => {
      if (tmp && tmp.selected) {
        tmp.selected = !tmp.selected;
      } else {
        tmp.selected = true;
      }
    });

    this.setState({
      templates: templates
    });
  }

  callSignInPerson() {
    const {signInPerson} = this.props;
    const {templates, recipients} = this.state;

    signInPerson({
      templates: templates,
      recipients: recipients
    });
  }

  callSendWithEmail() {
    const {sendWithEmail} = this.props;
    const {templates, recipients} = this.state;

    sendWithEmail({
      templates: templates,
      recipients: recipients
    });
  }

  render() {
    const {loading, messages, removeMessage, results, methods} = this.props;
    const {templates, recipients} = this.state;
    const availableRoles = getAvailableRoles(this.roles, recipients);
    const assignRole = this.assignRoleToRecipient.bind(this);
    const toggleTemplateSelect = this.toggleTemplateSelect.bind(this);
    const signInPerson = this.callSignInPerson.bind(this);
    const sendWithEmail = this.callSendWithEmail.bind(this);

    return (
      <AppLayout
        loading={loading}
        messages={messages}
        removeMessage={removeMessage}
        methods={methods}
        results={results}
        templates={templates}
        recipients={recipients}
        availableRoles={availableRoles}
        assignRole={assignRole}
        toggleTemplateSelect={toggleTemplateSelect}
        signInPerson={signInPerson}
        sendWithEmail={sendWithEmail}/>
    );
  }
}
