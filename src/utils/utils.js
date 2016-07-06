import uuid from 'uuid-v4';
import {returnUrl} from './config.js';
import validations from './configValidations.js';

// Roles are claimed by recipients
// This function determines which roles are still available for claiming
export function getAvailableRoles(roles, recipients) {
  return roles.filter(role => {
    if (role === 'None' || role === 'Reviewer') {
        return true;
    } else {
        // find out if any recipients have been assigned the role
        let isAssigned = false;
        recipients.forEach(recipient => {
            if (!isAssigned && recipient.role === role) {
                isAssigned = true;
            }
        });
        return !isAssigned;
    }
  });
}

// Parses the results object and returns the infomation in the following format
// {
//    status: 'Success!',
//    message: 'A message to display',
//    buttons: [
//      {
//        label: 'Close',
//        onClick: function that is called when button is clicked
//      }
//    ]
// }
export function interpretResultsForSendWithEmail(results) {
  let status, message, buttons;
  if (results.envelopeId) {
    status = 'Success!';
    message = 'Your documents were sent.'
    buttons = [
      {
        type: 'close',
        label: 'Finish'
      }
    ]
  } else {
    status = 'Error :/';
    message = results.message || 'There was an error when sending your documents.';
    buttons = [
      {
        type: 'back',
        label: 'Try Again'
      },
      {
        type: 'close',
        label: 'Close'
      }
    ]
  }

  return {
    status: status,
    message: message,
    buttons: buttons
  };
}

export function isAssignedRole(role) {
  return role !== 'none' && role !== 'None' && role !== null && role !== '' && role !== undefined;
}

// Determines if an object is Empty
export function isEmptyObject(obj) {
  return Object.keys(obj).length <= 0;
}

// Prepares the configuration object from the current state
export function prepareSigningConfiguration({templates, recipients}, embeddedSigning) {
  let config = {};
  config.templateIds = getTemplateConfig(templates);
  config.signers = getRecipientConfig(recipients, embeddedSigning);
  config.returnUrl = returnUrl;
  return config;
}

function getTemplateConfig(templates) {
  return templates.filter(template => {
    return template.selected;
  }).map(template => {
    return template.templateId;
  });
}

function getRecipientConfig(recipients, embeddedSigning) {
  return recipients.filter(recipient => {
    return isAssignedRole(recipient.role);
  }).map(recipient => {
    recipient.embeddedSigning = embeddedSigning;
    return recipient;
  });
}

// Validates that the config object is complete and can be sent to apex
// Returns an error message if not
export function validateConfig(config) {
  const {hasAtLeastOneTemplate, hasASignerOne, eachSignerHasAnEmail} = validations;
  let messages = [];

  const append = (message) => message ? messages.push(message) : null;

  append(hasAtLeastOneTemplate(config));
  append(hasASignerOne(config));
  append(eachSignerHasAnEmail(config));
  return messages;
}
