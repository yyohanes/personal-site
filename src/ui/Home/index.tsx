import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HeroSection from './HeroSection'
import SocialSection from './SocialSection'
import ResumeSection from './ResumeSection'
import { State } from 'app/infrastructure/reducers'
import { Block } from 'app/infrastructure/models/Block'
import HomeActions from 'app/infrastructure/Home/actions'
import { ProfessionalExperience } from 'app/infrastructure/models/ProfessionalExperience'

type Props = {
  aboutBlock: Block | null;
  generalInformationBlock: Block | null;
  professionalExperiences: ProfessionalExperience[];
  requestData: () => void;
}
class Home extends PureComponent<Props> {
  componentDidMount () {
    this.props.requestData()
  }

  render () {
    const { aboutBlock, generalInformationBlock, professionalExperiences } = this.props

    return (
      <div>
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
            }
          })}
        />
      </div>
    )
  }
}

function mapStateToProps (state: State) {
  return {
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
