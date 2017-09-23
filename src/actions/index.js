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
        fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify(patchBody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

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