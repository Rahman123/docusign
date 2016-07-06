import React from 'react';
import {isEmptyObject} from '../utils/utils.js';

import TemplatesCard from '../cards/TemplatesCard.jsx';
import RecipientsCard from '../cards/RecipientsCard.jsx';
import SendButtons from '../components/SendButtons.jsx';
import Messages from '../components/Messages.jsx';
import Loading from '../components/Loading.jsx';

export default class EnvelopeConfigPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      loading,
      messages,
      results,
      removeMessage,
      templates,
      toggleTemplateSelect,
      recipients,
      availableRoles,
      assignRole,
      signInPerson,
      sendWithEmail
    } = this.props;

    return (
      <div className="page">
        { loading ? <Loading /> : null }
        { messages.length ? <Messages messages={messages} removeMessage={removeMessage}/> : null }
        <TemplatesCard templates={templates} toggleTemplateSelect={toggleTemplateSelect}/>
        <RecipientsCard recipients={recipients} availableRoles={availableRoles} assignRole={assignRole}/>
        <SendButtons signInPerson={signInPerson} sendWithEmail={sendWithEmail}/>
      </div>
    );
  }
}
