import React from 'react'

import './ResumeSection.scss'

interface Project {
  name: string;
  shortDescription: string;
}

interface ResumeItem {
  period: string;
  company: string;
  role: string;
  shortDescription: string;
  detail: string;
  projects: Project[];
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

                  <p className='my-4 text-uppercase'>Projects</p>
                  {resumeItem.projects.length > 0 && (
                    <div className='mt-3'>
                      {resumeItem.projects.map((project, idx) => (
                        <div key={idx} className='mt-3'>
                          <h5 className='mb-1'>{project.name}</h5>
                          <div dangerouslySetInnerHTML={{__html: project.shortDescription}}></div>
                        </div>
                      ))}
                    </div>
                  )}
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
