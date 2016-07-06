import uuid from 'uuid-v4';

/**
  * Validations used before sending an api call
*/

const validations = {

  hasAtLeastOneTemplate: (config) => {
    if (config.templateIds.length <= 0) {
      return createMessage('error', 'You must select at least one document.');
    } else {
      return null;
    }
  },

  hasASignerOne: (config) => {
    let hasSignerOne = false;
    config.signers.forEach(recipient => {
      if (!hasSignerOne) {
        hasSignerOne = recipient.role === 'Signer 1';
      }
    });
    if (!hasSignerOne) {
      return createMessage('error', 'There must be a signer 1 recipient.');
    } else {
      return null;
    }
  },

  eachSignerHasAnEmail: (config) => {
    let hasEmail = true;
    config.signers.forEach(recipient => {
      if (hasEmail) {
        hasEmail = recipient.Email && recipient.Email.length > 0;
      }
    });
    if (!hasEmail) {
      return createMessage('error', 'Each recipient must have an email address.');
    } else {
      return null;
    }
  }

};

function createMessage(type, content) {
  return {
    type: type,
    content: content,
    id: uuid()
  }
}

export default validations;
