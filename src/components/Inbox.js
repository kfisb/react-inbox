import React, {Component} from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleComposeForm, composeMessage, messageSelection } from '../actions'

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

    handleStarChange = (e, id) => {
        const newMessages = this.props.messages
        const index = newMessages.findIndex(message => message.id === id)
        newMessages[index].starred = !newMessages[index].starred

        const patchBody = {
            messageIds: [id],
            command: 'star',
            star: newMessages[index].starred
        }
        this.patchMethod(patchBody)

        this.setState({newMessages})
    }

    handleToolbarMessageCheckboxClick = () => {
        let newMessages
        const selectedMessages = this.props.messages.filter(element => element.selected === true)
        if (selectedMessages.length === this.props.messages.length) {
            //all are selected - need to de-select them
            newMessages = this.props.messages.map(element => {
                if (element.selected) {
                    element.selected = false
                }
                return element
            })
        } else {
            //zero or some are selected - need to select all of them
            newMessages = this.props.messages.map(element => {
                if (!element.selected) {
                    element.selected = true
                }
                return element
            })
        }

        this.setState({messages: newMessages})
    }

    handleMarkAsRead = () => {
        const newMessages = this.props.messages.map(element => {
            if (element.selected) {
                element.read = true
            }
            return element
        })

        this.patchReadUnread(newMessages, true)

        this.setState({messages: newMessages})
    }

    handleMarkAsUnread = () => {
        const newMessages = this.props.messages.map(element => {
            if (element.selected) {
                element.read = false
            }
            return element
        })

        this.patchReadUnread(newMessages, false)

        this.setState({messages: newMessages})
    }

    patchReadUnread(messages, status) {
        const messageIds = messages.filter(element => element.read === status).map(element => element.id)
        const patchBody = {
            messageIds: messageIds,
            command: 'read',
            read: status,
        }
        this.patchMethod(patchBody)
    }

    handleDeleteMessages = () => {
        const newMessages = this.props.messages.filter(element => !element.selected)

        const patchBody = {
            messageIds: this.props.messages.filter(element => element.selected).map(element => element.id),
            command: 'delete',
        }
        this.patchMethod(patchBody)

        this.setState({messages: newMessages})
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

    //done
    handleToggleComposeForm = () => {
        this.props.toggleComposeForm(!this.props.composeForm)
    }

    //done
    handleComposeFormSubmit = async (body) => {
        this.props.composeMessage(body)
    }

    render() {
        const {messages, composeForm} = this.props
        return (
            <div>
                <Toolbar
                    messages={messages}
                    handleToolbarMessageCheckboxClick={this.handleToolbarMessageCheckboxClick}
                    handleMarkAsRead={this.handleMarkAsRead}
                    handleMarkAsUnread={this.handleMarkAsUnread}
                    handleDeleteMessages={this.handleDeleteMessages}
                    handleApplyLabel={this.handleApplyLabel}
                    handleRemoveLabel={this.handleRemoveLabel}
                    toggleComposeForm={this.handleToggleComposeForm}
                />
                {composeForm &&
                <ComposeForm handleComposeFormSubmit={this.handleComposeFormSubmit}/>
                }
                <MessageList
                    messages={messages}
                    checkboxChange={this.handleCheckboxChange}
                    starChange={this.handleStarChange}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages.all,
    composeForm: state.messages.composeForm,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleComposeForm: toggleComposeForm,
    composeMessage: composeMessage,
    messageSelection: messageSelection,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Inbox)
