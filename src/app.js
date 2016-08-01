import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'

// Define the initial state properties here
const initialAppState = {
  table: {
    isFetching: false,
    data: [],
    filterString: '',
    input: [],
    inputText:'',
    sortDesc: false,
    sortKey: 'locale',
  },
  errorMessage: null
}

const store = configureStore(initialAppState)

render(
  <Root store={store} />,
  document.getElementById('app')
)
