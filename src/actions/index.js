export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'

export function fetchMessages() {
    return async (dispatch) => {
        const messagesResponse = await fetch('/api/messages')
        const messagesJson = await messagesResponse.json()
        dispatch({
            type: MESSAGES_RECEIVED,
            messages: messagesJson._embedded.messages,
        })
    }
}

export const MESSAGE_SELECTION = 'MESSAGE_SELECTION'

export function messageSelection(selected, index) {
    return (dispatch) => {
        dispatch({
            type: MESSAGE_SELECTION,
            selected,
            index,
        })
    }
}

export const STAR_MESSAGE = 'STAR_MESSAGE'

export function starMessage(message) {
    return (dispatch) => {
        const patchBody = {
            messageIds: [message.id],
            command: 'star',
            star: !message.starred,
        }
        patchMethod(patchBody)

        dispatch({
            type: STAR_MESSAGE,
            message,
        })
    }
}

export const TOGGLE_COMPOSE_FORM = 'TOGGLE_COMPOSE_FORM'

export const MESSAGE_SUBMITTED = 'MESSAGE_SUBMITTED'

export function composeMessage(messageBody, history) {
    return async (dispatch) => {
        const response = await fetch('api/messages', {
            method: 'POST',
            body: JSON.stringify(messageBody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const responseJson = await response.json()

        dispatch({
            type: MESSAGE_SUBMITTED,
            newMessage: responseJson,
        })

        history.push('/')
    }
}

export const MESSAGES_READ = 'MESSAGES_READ'

export function messagesRead(messageIds) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: messageIds,
            command: 'read',
            read: true,
        }
        await patchMethod(patchBody)

        dispatch({
            type: MESSAGES_READ,
        })
    }
}

export const MESSAGES_UNREAD = 'MESSAGES_UNREAD'

export function messagesUnread(messageIds) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: messageIds,
            command: 'read',
            read: false,
        }
        await patchMethod(patchBody)

        dispatch({
            type: MESSAGES_UNREAD,
        })
    }
}

export const TOOLBAR_MESSAGE_SELECTION = 'TOOLBAR_MESSAGE_SELECTION'

export function toolbarMessageSelection() {
    return (dispatch) => {
        dispatch({
            type: 'TOOLBAR_MESSAGE_SELECTION',
        })
    }
}

export const APPLY_LABEL = 'APPLY_LABEL'

export function applyLabel(messageIds, label) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: messageIds,
            command: 'addLabel',
            label: label,
        }
        await patchMethod(patchBody)

        dispatch({
            type: 'APPLY_LABEL',
            label,
        })
    }
}

export const REMOVE_LABEL = 'REMOVE_LABEL'

export function removeLabel(messageIds, label) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: messageIds,
            command: 'removeLabel',
            label: label,
        }
        await patchMethod(patchBody)

        dispatch({
            type: 'REMOVE_LABEL',
            label,
        })
    }
}

export const DELETE_MESSAGES = 'DELETE_MESSAGES'

export function deleteMessages(messageIds) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: messageIds,
            command: 'delete',
        }
        await patchMethod(patchBody)

        dispatch({
            type: 'DELETE_MESSAGES',
        })
    }
}

const patchMethod = (body) => {
    fetch('/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
}

export const EXPAND_MESSAGE = 'EXPAND_MESSAGE'

export function expandMessage(messageId) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: [messageId],
            command: 'read',
            read: true,
        }
        await patchMethod(patchBody)

        dispatch({
            type: EXPAND_MESSAGE,
            messageId,
        })
    }
}