import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Helmet from 'react-helmet'

import HeroSection from './HeroSection'
import SocialSection from './SocialSection'
import ResumeSection from './ResumeSection'
import { State } from 'app/infrastructure/reducers'
import { Block } from 'app/infrastructure/models/Block'
import { StaticPage } from 'app/infrastructure/models/StaticPage'
import HomeActions from 'app/infrastructure/Home/actions'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'

type Props = {
  homeStaticPage: StaticPage | null;
  aboutBlock: Block | null;
  generalInformationBlock: Block | null;
  professionalExperiences: ProfessionalExperience[];
  requestData: () => void;
}
class Home extends PureComponent<Props> {
  render () {
    const { homeStaticPage, aboutBlock, generalInformationBlock, professionalExperiences } = this.props

    return (
      <div>
        {homeStaticPage && (
          <Helmet>
            <title>{homeStaticPage.metaTitle}</title>
            <meta name="description" content={homeStaticPage.metaDescription} />
          </Helmet>
        )}
        <HeroSection aboutBlock={aboutBlock} generalInformationBlock={generalInformationBlock} />
        <SocialSection generalInformationBlock={generalInformationBlock} />
        <ResumeSection
          sectionTitle={'Professional Experiences'}
          withBg
          items={professionalExperiences.map((professionalExperience) => {
            const dateFrom = new Date(professionalExperience.dateFrom).getFullYear()
            const dateTo = professionalExperience.dateTo
              ? new Date(professionalExperience.dateTo).getFullYear()
              : 'Present'

            return {
              role: professionalExperience.role,
              company: professionalExperience.employer.name,
              shortDescription: professionalExperience.shortDescription,
              period: `${dateFrom} - ${dateTo}`,
              detail: professionalExperience.detail,
              projects: professionalExperience.projects,
            }
          })}
        />
      </div>
    )
  }
}

function mapStateToProps (state: State) {
  return {
    homeStaticPage: state.home.homeStaticPage,
    aboutBlock: state.home.aboutBlock,
    generalInformationBlock: state.home.generalInformationBlock,
    professionalExperiences: state.home.professionalExperiences,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({
    requestData: () => HomeActions.requestData(),
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
