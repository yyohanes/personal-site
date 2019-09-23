import React, { ReactNode } from 'react'

import './SiteBtn.scss'

type Props = {
  children: ReactNode;
  href: string;
  target?: string;
}
const SiteBtn = (props: Props) => (
  <a href={props.href} target={props.target || '_self'} className='site-btn'>
    {props.children}
  </a>
)

export default SiteBtn
