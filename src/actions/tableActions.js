import CONSTS from '../constants'
import fetchDispatch from './fetchUtils'

const apiProps = {
  url: 'http://localhost:4000/api/v1/output',
  types: {
    request: CONSTS.ACTIONS.REQUEST_LOCALES_DATA,
    receive: CONSTS.ACTIONS.RECEIVE_LOCALES_DATA
  }
}

function shouldFetchData ({table}) {
  return (!table.data || !table.isFetching)
}

function fetchData () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function filterBy (filterString) {
  return {
    type: CONSTS.ACTIONS.FILTER_LOCALES_DATA,
    filterString
  }
}

function sortBy (sortKey) {
  return {
    type: CONSTS.ACTIONS.SORT_LOCALES_DATA,
    sortKey
  }
}

function setInput(inputText) {
  return {
    type: CONSTS.ACTIONS.SET_INPUT,
    inputText
  }
}
function setInputText (inputText) {
  return {
    type: CONSTS.ACTIONS.SET_INPUT_TEXT,
    inputText
  }
}
function removeInput (inputText) {
  return {
    type: CONSTS.ACTIONS.REMOVE_INPUT_TEXT,
    inputText
  }
}

export default { fetchData, filterBy, sortBy, setInput, setInputText, removeInput }
