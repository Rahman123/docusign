import React from 'react';
import {prepareSigningConfiguration, validateConfig, formatResults} from '../utils/utils.js';
import {returnUrl} from '../utils/config.js';
import UIContainer from './UIContainer.jsx';

export default class APIContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
      results: {}
    };

    this.setResult = this.setResult.bind(this);
  }

  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }

  refreshSigningUrl(signer, cb) {
    const {api} = this.props;
    const envId = this.state.results.envelopeId;
    api.refreshSigningUrl(envId, signer, returnUrl, cb);
  }

  signInPerson(templatesAndRecipients) {
    const {api} = this.props;
    const config = prepareSigningConfiguration(templatesAndRecipients, true);
    // Do some client side validation
    const errorMessages = validateConfig(config);
    if (errorMessages.length) {
      this.showMessages(errorMessages);
    } else {
      this.toggleLoading();
      api.signInPerson(config, (result) => {
        this.setResult(result);
      });
    }
  }

  sendWithEmail(templatesAndRecipients) {
    const self = this;
    const {api} = this.props;
    const config = prepareSigningConfiguration(templatesAndRecipients, false);
    // Do some client side validations
    const errorMessages = validateConfig(config);
    if (errorMessages.length) {
      this.showMessages(errorMessages);
    } else {
      this.toggleLoading();
      api.sendWithEmail(config, (result) => {
        this.setResult(result);
      });
    }
  }

  setResult(result) {
    this.toggleLoading(); // hide loading
    this.setState({
      results: result
    });
  }

  clearResults() {
    this.setState({
      results: {}
    });
  }

  showMessages(messages) {
    this.setState({
      messages: messages
    });
  }

  removeMessage(message) {
    let {messages} = this.state;
    const newMessages = messages.filter(currentMessage => {
      return currentMessage.id !== message.id;
    });

    this.setState({
      messages: newMessages
    });
  }

  render() {
    const {templates, recipients, api} = this.props;
    const {loading, messages, results} = this.state;
    const signInPerson = this.signInPerson.bind(this);
    const sendWithEmail = this.sendWithEmail.bind(this);
    const removeMessage = this.removeMessage.bind(this);

    // Experimenting with passing a `methods` object between components
    // This will reduce the number of props required on each component
    // and centralize the functions for the app
    // <Component method1={method1} method2={method2}/>
    // Would become
    // <Component methods={methods}/>
    // and  methods = {
    //        method1: () => {does something},
    //        method2: () => {does something else}
    //      }
    const methods = {};
    methods.clearResults = this.clearResults.bind(this);
    methods.refreshSigningUrl = this.refreshSigningUrl.bind(this);
    methods.close = api.close;

    return (
      <UIContainer
        loading={loading}
        messages={messages}
        results={results}
        templates={templates}
        recipients={recipients}
        signInPerson={signInPerson}
        sendWithEmail={sendWithEmail}
        removeMessage={removeMessage}
        methods={methods}/>
    );
  }
}
