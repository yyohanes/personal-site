import React, { ReactNode, MouseEvent } from 'react'

import './SiteBtn.scss'

type Props = {
  children: ReactNode;
  href: string;
  target?: string;
  size?: 'default' | 'small';
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
const SiteBtn = (props: Props) => (
  <a
    href={props.href}
    target={props.target || '_self'}
    className={`site-btn ${props.size === 'small'} site-btn--small`}
    onClick={props.onClick}
  >
    {props.children}
  </a>
)

export default SiteBtn
