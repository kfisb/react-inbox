import React from 'react'
import Message from './Message'
import {connect} from 'react-redux'

const MessageList = ({
                         messages,
                     }) => {
    return (
        <div>
            {messages.map((message, index) =>
                <Message
                    key={index}
                    index={index}
                    message={message}
                />
            )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
})

export default connect(mapStateToProps, null)(MessageList)