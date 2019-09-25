import React from 'react'

import SiteLogo from 'app/ui/_common/SiteLogo'
import SiteBtn from 'app/ui/_common/SiteBtn'
import './Header.scss'

type Props = {
  logoText: string;
  logoSubtext: string;
  resumeDownloadLink: string;
}
const Header = (props: Props) => (
  <header className="header-section">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <SiteLogo name={props.logoText} subtitle={props.logoSubtext} />
        </div>
        <div className="col-md-8 text-md-right header-buttons">
          <SiteBtn href={props.resumeDownloadLink} target='_blank'>
            Download CV
          </SiteBtn>
        </div>
      </div>
    </div>
  </header>
)

export default Header
