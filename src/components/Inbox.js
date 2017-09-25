import React from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    applyLabel,
    deleteMessages,
    messageSelection,
    messagesRead,
    messagesUnread,
    removeLabel,
    starMessage,
    toolbarMessageSelection,
} from '../actions'

const Inbox = ({
                   messages,
                   composeForm,
                   messageSelection,
                   starMessage,
                   messagesRead,
                   messagesUnread,
                   toolbarMessageSelection,
                   deleteMessages,
                   applyLabel,
                   removeLabel,
               }) => {

    //done
    const handleCheckboxChange = (e, index) => {
        messageSelection(e.target.checked, index)
    }

    //done
    const handleStarChange = (index) => {
        starMessage(messages[index])
    }

    //done
    const handleToolbarMessageCheckboxClick = () => {
        toolbarMessageSelection()
    }

    //done
    const handleMarkAsRead = () => {
        const messageIds = messages
            .filter(element => element.selected === true)
            .map(element => element.id)
        messagesRead(messageIds)
    }

    //done
    const handleMarkAsUnread = () => {
        const messageIds = messages
            .filter(element => element.selected === true)
            .map(element => element.id)
        messagesUnread(messageIds)
    }

    //done
    const handleDeleteMessages = () => {
        const messageIds = messages
            .filter(element => element.selected)
            .map(element => element.id)
        deleteMessages(messageIds)
    }

    //done
    const handleApplyLabel = (e) => {
        const messageIds = messages.filter(element => element.selected).map(element => element.id)
        applyLabel(messageIds, e.target.value)
    }

    //done
    const handleRemoveLabel = (e) => {
        const messageIds = messages.filter(element => element.selected).map(element => element.id)
        removeLabel(messageIds, e.target.value)
    }

    return (
        <div>
            <Toolbar
                handleToolbarMessageCheckboxClick={handleToolbarMessageCheckboxClick}
                handleMarkAsRead={handleMarkAsRead}
                handleMarkAsUnread={handleMarkAsUnread}
                handleDeleteMessages={handleDeleteMessages}
                handleApplyLabel={handleApplyLabel}
                handleRemoveLabel={handleRemoveLabel}
            />
            {composeForm &&
            <ComposeForm/>
            }
            <MessageList
                checkboxChange={handleCheckboxChange}
                starChange={handleStarChange}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
    messageById: state.messages.byId,
    composeForm: state.messages.composeForm,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messageSelection: messageSelection,
    starMessage: starMessage,
    messagesRead: messagesRead,
    messagesUnread: messagesUnread,
    toolbarMessageSelection: toolbarMessageSelection,
    deleteMessages: deleteMessages,
    applyLabel: applyLabel,
    removeLabel: removeLabel,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Inbox)
