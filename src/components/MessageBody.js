import React from 'react'

const MessageBody = ({
                         body,
                         match,
                     }) => {
    debugger
    return (
        <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
                The message body here for id: {match.params.id}
            </div>
        </div>
    )
}

export default MessageBody