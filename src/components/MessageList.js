import React from 'react'
import Message from './Message'
import {connect} from 'react-redux'

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

const mapStateToProps = state => ({
    messages: state.messages.all,
})
export default connect(mapStateToProps)(MessageList)