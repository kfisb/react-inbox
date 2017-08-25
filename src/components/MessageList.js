import React from 'react'
import Message from './Message'

const MessageList = ({
                         messages,
    checkboxChange,
    starChange,
                     }) => (
    <div>
        {messages.map(message =>
            <Message
                key={message.id}
                id={message.id}
                message={message}
                checkboxChange={checkboxChange}
                starChange={starChange}
            />)}
    </div>
)

export default MessageList