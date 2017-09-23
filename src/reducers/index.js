import {combineReducers} from 'redux'
import {MESSAGE_SELECTION, MESSAGE_SUBMITTED, MESSAGES_RECEIVED, STAR_MESSAGE, TOGGLE_COMPOSE_FORM} from '../actions'

function messages(state = {byId: {}, all: [], composeForm: false}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            const messagesById = action.messages.reduce((result, message) => {
                result[message.id] = message
                return result
            }, {})

            return {
                ...state,
                byId: messagesById,
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
            return {
                ...state,
                all: [
                    ...state.all,
                    ...state.all[action.id - 1].selected = action.selected,
                ]
            }
        case STAR_MESSAGE:
            return {
                ...state,
                all: [
                    ...state.all,
                    ...action.message.starred = !action.message.starred,
                ]
            }
        default:
            return state
    }
}

export default combineReducers({
    messages,
})