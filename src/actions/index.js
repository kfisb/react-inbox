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

export const TOGGLE_COMPOSE_FORM = 'TOGGLE_COMPOSE_FORM'
export function toggleComposeForm(composeForm) {
    return (dispatch) => {

        dispatch({
            type: TOGGLE_COMPOSE_FORM,
            composeForm,
        })
    }
}
