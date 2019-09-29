import React from 'react'

import './HeroSection.scss'
import { Block } from 'app/infrastructure/models/Block'

type Props = {
  aboutBlock: Block | null;
  expertiseBlock: Block | null;
  generalInformationBlock: Block | null;
}
const HeroSection = (props: Props) => {
  const { aboutBlock, generalInformationBlock, expertiseBlock } = props
  return (
    <section className="hero-section spad">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            <div className="row">
              <div className="col-lg-6">
                {aboutBlock && (
                  <div className="hero-text">
                    <h2>{aboutBlock.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: aboutBlock.body}} />
                  </div>
                )}
                {expertiseBlock && (
                  <div className="hero-expertise">
                    <h3 className='mb-3'>{expertiseBlock.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: expertiseBlock.body}} />
                  </div>
                )}
                {generalInformationBlock && (
                  <div className="hero-info">
                    <h2>General Info</h2>
                    <div dangerouslySetInnerHTML={{__html: generalInformationBlock.body}} />
                  </div>
                )}
              </div>
              {aboutBlock && aboutBlock.image && (
                <div className="col-lg-6">
                  <figure className="hero-image">
                    <img src={aboutBlock.image.url} alt={aboutBlock.image.title} />
                  </figure>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
