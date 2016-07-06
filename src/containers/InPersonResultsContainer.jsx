import React from 'react';
import {interpretResults} from '../utils/utils.js';
import InPersonResultsPage from '../pages/InPersonResultsPage.jsx';

export default class InPersonResultsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      views: []
    };

    this.getAlreadySigned = this.getAlreadySigned.bind(this);
    this.getReadyToSign = this.getReadyToSign.bind(this);
    this.getYetToSign = this.getYetToSign.bind(this);
  }

  componentWillMount() {
    const {results} = this.props;
    const views = this.prepViews(results.views);
    this.setState({
      views: views
    });
  }

  prepViews(views) {
    return views.map(view => {
      view.signed = false;
      view.hasBeenVisited = false;
      view.isRefreshing = false;
      return view;
    });
  }

  getAlreadySigned() {
    const {views} = this.state;

    return views.filter(view => {
      return view.hasBeenVisited;
    }).sort((aView, bView) => {
      let aRoleNumber = parseInt(aView.role.charAt(aView.role.length - 1))
      let bRoleNumber = parseInt(bView.role.charAt(bView.role.length - 1))
      return aRoleNumber - bRoleNumber;
    });
  }

  getReadyToSign() {
    const {views} = this.state;
    // the first view that has not been visited
    return views.filter(view => {
      return !view.hasBeenVisited;
    }).sort((aView, bView) => {
      let aRoleNumber = parseInt(aView.role.charAt(aView.role.length - 1))
      let bRoleNumber = parseInt(bView.role.charAt(bView.role.length - 1))
      return aRoleNumber - bRoleNumber;
    })[0];
  }

  getStatus() {
    const {views} = this.state;

    let signingComplete = true;
    views.forEach(view => {
      if (!view.hasBeenVisited) {
        signingComplete = false;
      }
    });

    return signingComplete;
  }

  getYetToSign() {
    const {views} = this.state;
    // all view that have not been visited yet, expect the first view
    const notVisited = views.filter(view => {
      return !view.hasBeenVisited;
    }).sort((aView, bView) => {
      let aRoleNumber = parseInt(aView.role.charAt(aView.role.length - 1))
      let bRoleNumber = parseInt(bView.role.charAt(bView.role.length - 1))
      return aRoleNumber - bRoleNumber;
    });
    // Remove the first view
    notVisited.shift();
    return notVisited;
  }

  refreshSigningUrl2(signer) {
    const {refreshSigningUrl} = this.props.methods;
    this.toggleRefreshing(signer.Id);

    const self = this;
    refreshSigningUrl(signer, (res) => {
      self.refreshUrl(signer.Id, res.url);
      self.toggleRefreshing(signer.Id);
    });
  }

  refreshUrl(viewId, url) {
    const {views} = this.state;

    const newViews = views.map(view => {
      if (view.Id === viewId) {
        view.url = url;
        view.hasBeenVisited = false;
      }
      return view;
    });

    this.setState({
      views: newViews
    });
  }

  setHasVisited(viewId) {
    const {views} = this.state;

    const newViews = views.map(view => {
      if (view.Id === viewId) {
        view.hasBeenVisited = true;
      }
      return view;
    });

    this.setState({
      views: newViews
    });
  }

  toggleRefreshing(viewId) {
    const {views} = this.state;

    const newViews = views.map(view => {
      if (view.Id === viewId) {
        view.isRefreshing = !view.isRefreshing;
      }
      return view;
    });

    this.setState({
      views: newViews
    });
  }

  render() {
    const {methods} = this.props;
    methods.setHasVisited = this.setHasVisited.bind(this);
    methods.toggleRefreshing = this.toggleRefreshing.bind(this);
    methods.refreshSigningUrl2 = this.refreshSigningUrl2.bind(this);

    return (
      <InPersonResultsPage
        signingComplete={this.getStatus()}
        alreadySigned={this.getAlreadySigned()}
        readyToSign={this.getReadyToSign()}
        yetToSign={this.getYetToSign()}
        methods={methods}/>
    );
  }
}

/*

// Results from api call
```
results: {
  status: 'success' || 'error',
  message: `if error this would be the error message`,
  views: [
    {
      Name: `signer's name`,
      Email: `signer's email`,
      Id: `signer's id`,
      role: `signer's role` - 'Signer 1' || 'Signer 2'
      url: `link for the docusign sign in person`,
    }
  ]
}
```

// views
views: [
  {
    signed: `is true if the refreshUrl call is made and returns that is has already been signed`
    hasBeenVisited: `is set to true when the user clicks on the button`
    isRefreshing: `is set to true when the refreshUrl call is in progress`
    Name: `signer's name`,
    Email: `signer's email`,
    Id: `signer's id`,
    role: `signer's role` - 'Signer 1' || 'Signer 2'
    url: `link for the docusign sign in person`,
  }
]
*/
