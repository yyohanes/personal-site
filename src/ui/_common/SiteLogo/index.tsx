import React from 'react'
import { Link } from 'react-router-dom'

import './SiteLogo.scss'

type Props = {
  name: string;
  subtitle: string;
}
const SiteLogo = (props: Props) => (
  <div className='site-logo'>
    <h2 className='mb-1'>
      <Link to='/'>
        {props.name}<sup>2</sup>
      </Link>
    </h2>
    <div dangerouslySetInnerHTML={{__html: props.subtitle}} />
  </div>
)

export default SiteLogo
