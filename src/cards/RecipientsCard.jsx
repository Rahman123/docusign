import React from 'react';

import Recipient from '../components/Recipient.jsx';
import CardHeader from '../components/CardHeader.jsx';

export default class RecipientsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRecipients() {
    const {recipients, availableRoles, assignRole} = this.props;
    return recipients.map((recipient, i) => {
      return <Recipient key={i} recipient={recipient} availableRoles={availableRoles} assignRole={assignRole}/>
    });
  }

  render() {

    return (
      <div id="recipients-card" className="card">
        <CardHeader title="Recipients" icon="users"/>
        {this.renderRecipients()}
      </div>
    );
  }
}
