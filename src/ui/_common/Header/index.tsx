import React from 'react'

import { Block } from 'app/infrastructure/models/Block'
import SiteLogo from 'app/ui/_common/SiteLogo'
import SiteBtn from 'app/ui/_common/SiteBtn'
import './Header.scss'

type Props = {
  logoBlock: Block;
}
const Header = (props: Props) => (
  <header className="header-section">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <SiteLogo name={props.logoBlock.title} subtitle={props.logoBlock.body} />
        </div>
        <div className="col-md-8 text-md-right header-buttons">
          <SiteBtn href="#">
            Download CV
          </SiteBtn>
          <SiteBtn href="#">
            Discover me
          </SiteBtn>
        </div>
      </div>
    </div>
  </header>
)

export default Header
