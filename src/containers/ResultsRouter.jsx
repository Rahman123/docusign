import React from 'react';
import InPersonResultsContainer from './InPersonResultsContainer.jsx';
import SendWithEmailResultsPage from '../pages/SendWithEmailResultsPage.jsx';

// Routes to the appropriate results page depending on the results
export default class ResultsRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {results, methods} = this.props;

    const Component = results.views && results.views.length ?
      <InPersonResultsContainer results={results} methods={methods}/> :
      <SendWithEmailResultsPage results={results} methods={methods}/> ;

    return Component;
  }
}
