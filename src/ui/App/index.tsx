import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import './styles/app.scss'
import favIcon from './assets/favicon.png'
import routes from '../routes'
import AppActions from 'app/infrastructure/App/actions'
import Header from 'app/ui/_common/Header'
import Footer from 'app/ui/_common/Footer'
import { Block } from 'app/infrastructure/models/Block'
import { State } from 'app/infrastructure/reducers'

type Props = {
  appStartup: () => void;
  headerBlock: Block | null;
  footerBlock: Block | null;
}
class App extends React.PureComponent<Props> {
  static serverActions = [AppActions.appStartup()]

  renderGoogleAnalytics (): ReactElement[] | null {
    const trackingId = process.env.REACT_GOOGLE_ANALYTICS_ID
    return trackingId ? [
      <script key='ga1' async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />,
      <script key='ga2'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${trackingId}');
        `}
      </script>
    ] : null
  }

  render () {
    const { headerBlock, footerBlock } = this.props

    return (
      <div>
        <Helmet>
          <html lang='en' />
          <link href='https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i,700' rel='stylesheet' />
          <link href={favIcon} rel='shortcut icon' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta charSet='utf-8'/>

          {this.renderGoogleAnalytics()}
        </Helmet>
        {headerBlock && headerBlock.metadata &&
          <Header
            logoText={headerBlock.metadata.logoText}
            logoSubtext={headerBlock.metadata.logoSubtext}
            resumeDownloadLink={headerBlock.metadata.resumeDownloadLink}
          />
        }
        <main>
          <Switch>
            {routes.map((route, idx) => (
              <Route key={idx} {...route} />
            ))}
          </Switch>
        </main>
        {footerBlock && <Footer footerBlock={footerBlock} />}
      </div>
    )
  }
}

function mapStateToProps (state: State) {
  return {
    headerBlock: state.app.headerBlock,
    footerBlock: state.app.footerBlock,
  }
}

function mapDispatchToProps (dispath: Dispatch) {
  return bindActionCreators({
    appStartup: () => AppActions.appStartup(),
  }, dispath)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
