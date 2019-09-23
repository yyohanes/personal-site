import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

import './SocialSection.scss'
import { Block } from 'app/infrastructure/models/Block'

type Props = {
  generalInformationBlock: Block | null;
}

const SocialSection = (props: Props) => {
  const { generalInformationBlock } = props

  if (!generalInformationBlock || !generalInformationBlock.metadata || !generalInformationBlock.metadata.socialMedia) {
    return null
  }

  return (
    <div className="social-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            <div className="social-link-warp">
              <div className="social-links">
                {generalInformationBlock.metadata.socialMedia.linkedin && (
                  <a href={generalInformationBlock.metadata.socialMedia.linkedin} rel='noreferrer noopener' target='_blank'>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                )}
                {generalInformationBlock.metadata.socialMedia.instagram && (
                  <a href={generalInformationBlock.metadata.socialMedia.instagram} rel='noreferrer noopener' target='_blank'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                )}
                {generalInformationBlock.metadata.socialMedia.facebook && (
                  <a href={generalInformationBlock.metadata.socialMedia.facebook} rel='noreferrer noopener' target='_blank'>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                )}
              </div>
              <h2 className="d-none d-md-block">My Social Profiles</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialSection
