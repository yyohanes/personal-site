import React, { RefObject} from 'react'

import { Block } from 'app/infrastructure/models/Block'
import './Footer.scss'

type Props = {
  footerBlock: Block;
}

class Footer extends React.PureComponent<Props> {
  anchors: HTMLCollection | null
  copyrightRef: RefObject<any>

  constructor (props: Props) {
    super(props)
    this.copyrightRef = React.createRef()
    this.anchors = null
  }

  componentDidMount () {
    // Make all <a> open new tab
    this.anchors = this.copyrightRef.current.getElementsByTagName('a')
    if (this.anchors) {
      for (let i = 0; i < this.anchors.length; i += 1) {
        this.anchors[i].setAttribute('target', '_blank')
      }
    }
  }

  render () {
    return (
      <footer className="footer-section">
        <div className="container text-center">
          <div
            className="copyright"
            ref={this.copyrightRef}
            dangerouslySetInnerHTML={{__html: this.props.footerBlock.body}}
          />
        </div>
      </footer>
    )
  }
}

export default Footer
