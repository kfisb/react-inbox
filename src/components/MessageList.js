import React from 'react'
import Message from './Message'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";

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

export default withRouter(connect(mapStateToProps, null)(MessageList))