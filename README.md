# docusign
GP's custom Docusign integration for Salesforce.

## About
This is the front-end for GP's custom Docusign integration. It is a React app that is bundled and uploaded to Salesforce. Salesforce then runs the app as a visualforce page.

### Building for Salesforce

```bash
$ npm run build
```

This creates 2 new folders in the salesforce-build directory, the fonts/ and js/ folders. These then need to be compressed and uploaded to Salesforce as a .zip file.

### Running locally

```bash
$ npm start
```

Then go to localhost:3000

This starts up the webpack server which bundles the code and serves it.
