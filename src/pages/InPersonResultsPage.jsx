import React from 'react';

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {alreadySigned, readyToSign, yetToSign, methods, signingComplete} = this.props;
    const {close, setHasVisited, refreshSigningUrl2, toggleRefreshing} = methods;

    return (
      <div className="page page-results">
        <div className="status">
          {signingComplete ? 'All Done!' : 'Ready to Sign!'}
        </div>
        { alreadySigned.length ? <AlreadySigned signers={alreadySigned} refreshSigningUrl2={refreshSigningUrl2} toggleRefreshing={toggleRefreshing}/> : null }
        { readyToSign ? <ReadyToSign signer={readyToSign} setHasVisited={setHasVisited}/> : null }
        { yetToSign.length ? <YetToSign signers={yetToSign}/> : null }
        { signingComplete ?
          <button className="button" onClick={close}>Finish</button>:
          null
        }
      </div>
    );
  }
}

const AlreadySigned = ({signers, refreshSigningUrl2, toggleRefreshing}) => {
  return (
    <div className="section already-signed">
      <h2 className="title">Done Signing</h2>
      {
        signers.map((signer, i) => {
          return (
            <AlreadySignedRow key={i} signer={signer} refreshSigningUrl2={refreshSigningUrl2} toggleRefreshing={toggleRefreshing}/>
          );
        })
      }
    </div>
  );
}

const AlreadySignedRow = ({signer, refreshSigningUrl2, toggleRefreshing}) => {
  return (
    <div className="signer-name">
      {signer.Name}
      <RefreshButton signer={signer} refreshSigningUrl2={refreshSigningUrl2} toggleRefreshing={toggleRefreshing}/>
    </div>
  );
}

const RefreshButton = ({signer, refreshSigningUrl2, toggleRefreshing}) => {
  const onClick = (e) => {
    if (signer.signed) return;
    refreshSigningUrl2(signer);
  }

  const content = () => {
    if (signer.isRefreshing) {
      return <i className="fa fa-spinner fa-spin refresh-button"></i>
    } else {
      return signer.signed ? 'Finished Signing' : 'Sign Again';
    }
  }

  return <span className="refresh-button" onClick={onClick}>{content()}</span>;
}

const ReadyToSign = ({signer, setHasVisited}) => {
  const onClick = (e) => {
    // need to set the view's hasVisited to true
    setHasVisited(signer.Id);
    // then send the user to the url
    window.open(signer.url);
  }
  return (
    <div className="section ready-to-sign">
      <h2 className="title">Ready To Sign</h2>
      <button className='button' onClick={onClick}>{signer.Name}</button>
    </div>
  );
}

const YetToSign = ({signers}) => {
  return (
    <div className="section yet-to-sign">
      <h2 className="title">Waiting To Sign</h2>
      {
        signers.map((signer, i) => {
          return <div key={i} className="signer-name">{signer.Name}</div>
        })
      }
    </div>
  );
}
