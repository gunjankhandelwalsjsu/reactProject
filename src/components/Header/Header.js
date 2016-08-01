import React from 'react'
import './Header.styl'
import { IndexLink } from 'react-router'
import Navigation from './Navigation'

export default (props) => {
  return (
    <header img src="../../static/favicon.ico">
      <h3>
        <IndexLink to='/'> CIDR data </IndexLink>
      </h3>
    </header>
  )
}
