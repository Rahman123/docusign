window.mockData = {
  templates: [
    {
      name: 'Omaha boarding app',
      templateId: '1',
      selected: true
    },
    {
      name: 'Change address form',
      templateId: '3',
      selected: true
    },
    {
      name: 'Wells Fargo App',
      templateId: '2'
    },
    {
      name: 'Change DBA name',
      templateId: '4'
    }
  ],
  recipients: [
    {
      Id: '12341234',
      Name: 'Trevor Hanus'
    },
    {
      Id: '123412344',
      Name: 'Trevor Hanus'
    },
    {
      Id: '1234134',
      Name: 'Oliver Henengan',
      Email: 'ohenegan@gravitypayments.com'
    },
    {
      Id: '123414',
      Name: 'Tammi Kroll',
      Email: 'tkroll@gmail.com'
    }
  ]
}
/*
// this is the schema for the json being sent back to apex
result = {
  templateIds: [
    '23fo2ifkdslfej',
    'asdf12398fajsdlfkj'
  ],
  signers: [
    {
      contactId: '12341234',
      name: 'TRevor Hanus',
      email: 'trevorhanus@gmail.com',
      role: 'signer 1',
      embeddedSigning: false // indicates if the signer is going to sign in person
    }
  ]
}
*/
