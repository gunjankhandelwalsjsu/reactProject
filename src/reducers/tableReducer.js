import { ACTIONS } from '../constants'

export function listLocaleWithProperties (data) {
    return data;
}
    
function handleTableActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_LOCALES_DATA:
      return { isFetching: true }
    case ACTIONS.RECEIVE_LOCALES_DATA:
      return {
        isFetching: false,
        data: listLocaleWithProperties(action.data),
      }
    case ACTIONS.FILTER_LOCALES_DATA:
      return { filterString: action.filterString.toLowerCase(), flag:false }
    case ACTIONS.SORT_LOCALES_DATA:
      return {
        sortKey: action.sortKey,
        sortDesc: state.sortKey === action.sortKey ? !state.sortDesc : false,
      }
    case ACTIONS.SET_INPUT:
      return Object.assign({}, state, {
        input: [action.inputText, ...state.input]
      })
     
     case ACTIONS.SET_INPUT_TEXT:
      return { inputText:action.inputText }
     case ACTIONS.REMOVE_INPUT_TEXT:
      return Object.assign({}, state, {
        input: state.input.filter((inputProperty) => {
          return (inputProperty != action.inputText)
        })
      })
      
    default:
      return state
  }
}

function table (state = {}, action) {
  return Object.assign({}, state, handleTableActions(state, action))
}

export default table
