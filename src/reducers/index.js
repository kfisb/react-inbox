import {combineReducers} from 'redux'
import {
    APPLY_LABEL,
    DELETE_MESSAGES,
    MESSAGE_SELECTION,
    MESSAGE_SUBMITTED,
    MESSAGES_READ,
    MESSAGES_RECEIVED,
    MESSAGES_UNREAD,
    REMOVE_LABEL,
    STAR_MESSAGE,
    TOOLBAR_MESSAGE_SELECTION,
    MESSAGE_BODY,
    MESSAGE_READ,
} from '../actions'

function messages(state = {all: [], composeForm: false}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                all: action.messages,
            }
        case MESSAGE_BODY:
            return {
                ...state,
                messageBody: action.messageBody,
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
                    ...state.all[action.index].selected = action.selected,
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
                all: updatedReadMessages,
            }
        case MESSAGE_READ:
            let index = state.all.findIndex(message => message.id === action.messageId)
            return {
                ...state,
                all: [
                    ...state.all,
                    ...state.all[index].read = true,
                ]
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
                all: updatedUnreadMessages,
            }
        case APPLY_LABEL:
            const newAddedLabelMessages = state.all.map(element => {
                if (element.selected) {
                    if (!element.labels.includes(action.label)) {
                        element.labels.push(action.label)
                    }
                }
                return element
            })
            return {
                ...state,
                all: newAddedLabelMessages
            }
        case REMOVE_LABEL:
            const newRemovedLabelMessages = state.all.map(element => {
                if (element.selected) {
                    element.labels = element.labels.filter(element => element !== action.label)
                }
                return element
            })
            return {
                ...state,
                all: newRemovedLabelMessages
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