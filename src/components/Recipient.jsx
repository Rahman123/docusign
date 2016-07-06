import React from 'react';
import Dropdown from 'react-dropdown';
import {isAssignedRole} from '../utils/utils.js';

export default class Recipient extends React.Component {
  constructor(props) {
    super(props);

    this.changeRoleAssignment = this.changeRoleAssignment.bind(this);
  }

  changeRoleAssignment(role) {
    const {recipient, assignRole} = this.props;
    assignRole(role.value, recipient);
  }

  render() {
    const {recipient, availableRoles} = this.props;
    const {role} = recipient;
    const selected = isAssignedRole(role);
    const className = 'wrapper wrapper-recipient ' + (selected ? 'selected' : '');
    const value = recipient.role || 'None';

    return (
      <div className={className}>
        <div className="name">
          {recipient.Name}
        </div>
        <div className="email">
          {recipient.Email}
        </div>
        <div className="role-dropdown">
          <Dropdown options={availableRoles} onChange={this.changeRoleAssignment} value={value} placeholder="Select Role"/>
        </div>
      </div>
    );
  }
}
