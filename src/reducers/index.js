import {combineReducers} from 'redux'
import {
    MESSAGE_SELECTION,
    MESSAGE_SUBMITTED,
    MESSAGES_READ,
    MESSAGES_RECEIVED,
    MESSAGES_UNREAD,
    STAR_MESSAGE,
    TOGGLE_COMPOSE_FORM,
    TOOLBAR_MESSAGE_SELECTION,
    DELETE_MESSAGES,
} from '../actions'

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
            // const additionalMessagesById = action.messages.reduce((result, message) => {
            //     result[message.id] = message
            //     return result
            // }, {})

            return {
                ...state,
                // byId: {...state.byId, action.newMessage},
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
                    // ...state.all[action.id - 1].selected = action.selected,
                    ...state.byId[action.id].selected = action.selected,
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
        case TOOLBAR_MESSAGE_SELECTION:
            let newMessages
            const selectedMessages = state.all.filter(element => element.selected === true)
            if (selectedMessages.length === state.all.length) {
                //all are selected - need to de-select them
                newMessages = state.all.map(element => {
                    if (element.selected) {
                        element.selected = false
                    }
                    return element
                })
            } else {
                //zero or some are selected - need to select all of them
                newMessages = state.all.map(element => {
                    if (!element.selected) {
                        element.selected = true
                    }
                    return element
                })
            }

            // this.setState({messages: newMessages})
            return {
                ...state,
                all: newMessages,
            }
        case MESSAGES_READ:
            const updatedReadMessages = state.all.map(element => {
                if (element.selected) {
                    element.read = true
                }
                return element
            })
            return {
                ...state,
                // all: [
                //     ...state.all,
                //     action.updatedMessages, // not working
                // ]
                all: updatedReadMessages, // this works
            }
        case MESSAGES_UNREAD:
            const updatedUnreadMessages = state.all.map(element => {
                if (element.selected) {
                    element.read = false
                }
                return element
            })
            return {
                ...state,
                // all: [
                //     ...state.all,
                //     action.updatedMessages, // not working
                // ]
                all: updatedUnreadMessages, // this works
            }
        case DELETE_MESSAGES:
            const activeMessages = state.all.filter(element => !element.selected)
            return {
                ...state,
                all: activeMessages,
            }
        default:
            return state
    }
}

export default combineReducers({
    messages,
})