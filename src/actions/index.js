export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'

export function fetchMessages() {
    return async (dispatch) => {
        const messagesResponse = await fetch('/api/messages')
        const messagesJson = await messagesResponse.json()
        dispatch({
            type: MESSAGES_RECEIVED,
            messages: messagesJson._embedded.messages
        })
    }
}

export const MESSAGE_SELECTION = 'MESSAGE_SELECTION'

export function messageSelection(selected, id) {
    return (dispatch) => {
        dispatch({
            type: MESSAGE_SELECTION,
            selected,
            id,
        })
    }
}

export const STAR_MESSAGE = 'STAR_MESSAGE'

export function starMessage(message, id) {
    return (dispatch) => {
        const patchBody = {
            messageIds: [id],
            command: 'star',
            star: !message.starred
        }
        patchMethod(patchBody)

        dispatch({
            type: STAR_MESSAGE,
            message,
            id,
        })
    }
}

export const TOGGLE_COMPOSE_FORM = 'TOGGLE_COMPOSE_FORM'

export function toggleComposeForm(composeForm) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_COMPOSE_FORM,
            composeForm,
        })
    }
}

export const MESSAGE_SUBMITTED = 'MESSAGE_SUBMITTED'

export function composeMessage(messageBody) {
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
            // updatedMessages: selectedMessages, // not working
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
            // updatedMessages: selectedMessages, // not working
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

export const DELETE_MESSAGES = 'DELETE_MESSAGES'

export function deleteMessages(messageIds) {
    return async (dispatch) => {
        const patchBody = {
            messageIds: messageIds,
            command: 'delete',
        }
        await patchMethod(patchBody)

        dispatch({
            type: 'DELETE_MESSAGES'
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