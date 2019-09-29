import React from 'react'

import './ResumeSection.scss'
import { Client } from 'app/infrastructure/models/Client'
import { Project } from 'app/infrastructure/models/Project'

const monthDictionary = new Map([
  [0, 'Jan'],
  [1, 'Feb'],
  [2, 'Mar'],
  [3, 'Apr'],
  [4, 'May'],
  [5, 'Jun'],
  [6, 'Jul'],
  [7, 'Aug'],
  [8, 'Sep'],
  [9, 'Oct'],
  [10, 'Nov'],
  [11, 'Dec'],
])

function datesToPeriod (dateFrom: Date, dateTo: Date | null) {
  const dateFromString = `${monthDictionary.get(dateFrom.getMonth())} ${dateFrom.getFullYear()}`
  const dateToString = dateTo ? `${monthDictionary.get(dateTo.getMonth())} ${dateTo.getFullYear()}` : 'Present'

  return `${dateFromString} - ${dateToString}`
}

interface ResumeItem {
  dateFrom: Date;
  dateTo: Date | null;
  company: Client;
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
                  <h2>{datesToPeriod(resumeItem.dateFrom, resumeItem.dateTo)}</h2>
                  <h3>
                    {resumeItem.company.website ?
                      (
                        <a href={resumeItem.company.website} rel='noreferrer noopener' target='_blank'>
                          {resumeItem.company.name}
                        </a>
                      ) :
                      resumeItem.company.name
                    }
                  </h3>
                  <h4>{resumeItem.role}</h4>
                  {resumeItem.company.description &&
                    <p dangerouslySetInnerHTML={{__html: resumeItem.company.description}} />
                  }
                  {resumeItem.shortDescription &&
                    <div dangerouslySetInnerHTML={{__html: resumeItem.shortDescription}} />
                  }

                  {resumeItem.projects.length > 0 && (
                    <div className='mt-4'>
                      {resumeItem.projects.map((project, idx) => (
                        <div key={idx} className='mt-3'>
                          <h5 className='mb-1'>{project.name}</h5>
                          {project.shortDescription && <div dangerouslySetInnerHTML={{__html: project.shortDescription}}></div>}
                          {project.detail && <div dangerouslySetInnerHTML={{__html: project.detail}}></div>}
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
