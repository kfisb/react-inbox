import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED } from '../actions'

function messages(state = {all: []}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                all: action.messages,
            }
        default:
            return state
    }
}

export default combineReducers({
    messages,
})