import React from 'react' // eslint-disable-line
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import CidrPage from './containers/CidrPage'
import NotFoundPage from './containers/NotFoundPage'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={CidrPage} />
    <Route path='cidr' component={CidrPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
)
