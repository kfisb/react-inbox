import {combineReducers} from 'redux'
import {MESSAGE_SELECTION, MESSAGE_SUBMITTED, MESSAGES_RECEIVED, TOGGLE_COMPOSE_FORM} from '../actions'

function messages(state = {byId: {}, all: [], composeForm: false}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                all: action.messages,
            }
        case TOGGLE_COMPOSE_FORM:
            return {
                ...state,
                composeForm: action.composeForm
            }
        case MESSAGE_SUBMITTED:
            return {
                ...state,
                all: [
                    ...state.all,
                    action.newMessage
                ],
                composeForm: false,
            }
        case MESSAGE_SELECTION:
            let messageAtHand = state.all[action.id - 1]
            return {
                ...state,
                all: [
                    ...state.all,
                    ...messageAtHand.selected = action.messageSelected,
                ]
            }
        default:
            return state
    }
}

export default combineReducers({
    messages,
})