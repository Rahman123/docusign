import React from 'react';
import {isEmptyObject, parseResults} from '../utils/utils.js';

import ResultsRouter from '../containers/ResultsRouter.jsx';
import EnvelopeConfigPage from '../pages/EnvelopeConfigPage.jsx';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      loading,
      messages,
      results,
      removeMessage,
      methods,
      templates,
      toggleTemplateSelect,
      recipients,
      availableRoles,
      assignRole,
      signInPerson,
      sendWithEmail
    } = this.props;

    return (
      <div id="container">
        { !isEmptyObject(results) ?
          <ResultsRouter results={results} methods={methods}/> :
          /* <ResultsPage results={results} clearResults={clearResults} close={close} refreshSigningUrl={refreshSigningUrl}/> : */
          <EnvelopeConfigPage
            loading={loading}
            messages={messages}
            removeMessage={removeMessage}
            templates={templates}
            toggleTemplateSelect={toggleTemplateSelect}
            recipients={recipients}
            availableRoles={availableRoles}
            assignRole={assignRole}
            signInPerson={signInPerson}
            sendWithEmail={sendWithEmail}
            />
        }
      </div>
    );
  }
}
