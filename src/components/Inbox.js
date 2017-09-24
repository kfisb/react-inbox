import React, {Component} from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {messageSelection, messagesRead, messagesUnread, starMessage, toolbarMessageSelection, deleteMessages} from '../actions'

export class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //messages: [],
            // composeForm: false,
        }
    }

    //done
    handleCheckboxChange = (e, id) => {
        this.props.messageSelection(e.target.checked, id)
    }

    //only a helper method
    patchMethod(body) {
        fetch('/api/messages', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
    }

    //done
    handleStarChange = (id) => {
        this.props.starMessage(this.props.messageById[id], id)
    }

    handleToolbarMessageCheckboxClick = () => {
        this.props.toolbarMessageSelection()
    }

    //done
    handleMarkAsRead = () => {
        const messageIds = this.props.messages
            .filter(element => element.selected === true)
            .map(element => element.id)
        this.props.messagesRead(messageIds)
    }

    //done
    handleMarkAsUnread = () => {
        const messageIds = this.props.messages
            .filter(element => element.selected === true)
            .map(element => element.id)
        this.props.messagesUnread(messageIds)
    }

    handleDeleteMessages = () => {
        const messageIds = this.props.messages
            .filter(element => element.selected)
            .map(element => element.id)
        this.props.deleteMessages(messageIds)
    }

    handleApplyLabel = (e) => {
        const newMessages = this.props.messages.map(element => {
            if (element.selected) {
                if (!element.labels.includes(e.target.value)) {
                    element.labels.push(e.target.value)
                }
            }
            return element
        })

        this.patchAddRemoveLabel('addLabel', e.target.value)

        this.setState({messages: newMessages})
    }

    handleRemoveLabel = (e) => {
        const newMessages = this.props.messages.map(element => {
            if (element.selected) {
                element.labels = element.labels.filter(element => element !== e.target.value)
            }
            return element
        })

        this.patchAddRemoveLabel('removeLabel', e.target.value)

        this.setState({messages: newMessages})
    }

    patchAddRemoveLabel(status, value) {
        const messageIds = this.props.messages.filter(element => element.selected).map(element => element.id)

        const patchBody = {
            messageIds: messageIds,
            command: status,
            label: value,
        }
        this.patchMethod(patchBody)
    }

    render() {
        const {composeForm} = this.props
        return (
            <div>
                <Toolbar
                    handleToolbarMessageCheckboxClick={this.handleToolbarMessageCheckboxClick}
                    handleMarkAsRead={this.handleMarkAsRead}
                    handleMarkAsUnread={this.handleMarkAsUnread}
                    handleDeleteMessages={this.handleDeleteMessages}
                    handleApplyLabel={this.handleApplyLabel}
                    handleRemoveLabel={this.handleRemoveLabel}
                />
                {composeForm &&
                <ComposeForm/>
                }
                <MessageList
                    checkboxChange={this.handleCheckboxChange}
                    starChange={this.handleStarChange}
                />
            </div>
        )
    }
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
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Inbox)
