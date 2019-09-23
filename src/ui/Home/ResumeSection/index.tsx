import React from 'react'

import './ResumeSection.scss'

interface ResumeItem {
  period: string;
  company: string;
  role: string;
  shortDescription: string;
}

type Props = {
  sectionTitle: string;
  withBg?: boolean;
  items: ResumeItem[];
}
const ResumeSection = (props: Props) => {
  const classes = [
    'resume-section',
    'spad',
  ]

  if (props.withBg) {
    classes.push('with-bg')
  }

  return (
    <section className={classes.join(' ')}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-7 offset-xl-2">
            <div className="section-title">
              <h2>{props.sectionTitle}</h2>
            </div>
            <ul className="resume-list">
              {props.items.map((resumeItem, idx) => (
                <li key={idx}>
                  <h2>{resumeItem.period}</h2>
                  <h3>{resumeItem.company}</h3>
                  <h4>{resumeItem.role}</h4>
                  <div dangerouslySetInnerHTML={{__html: resumeItem.shortDescription}} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
