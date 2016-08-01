import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from '../routes'

export default class Root extends React.Component {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}
