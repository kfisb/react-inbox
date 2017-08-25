import React, {Component} from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'

export class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: props.messages
        }
    }

    handleCheckboxChange = (e, id) => {
        const newMessages = this.state.messages.map(element => {
            if (element.id === id) {
                element.selected = e.target.checked
            }
            return element
        })

        this.setState({messages: newMessages})
    }

    handleStarChange = (e, id) => {
        const newMessages = this.state.messages.map(element => {
            if (element.id === id) {
                element.starred = !element.starred
            }
            return element
        })

        this.setState({messages: newMessages})
    }

    handleToolbarMessageCheckboxClick = () => {
        let newMessages
        const selectedMessages = this.state.messages.filter(element => element.selected === true)
        if (selectedMessages.length === this.state.messages.length) {
            //all are selected - need to de-select them
            newMessages = this.state.messages.map(element => {
                if (element.selected) {
                    element.selected = false
                }
                return element
            })
        } else {
            //zero or some are selected - need to select all of them
            newMessages = this.state.messages.map(element => {
                if (!element.selected) {
                    element.selected = true
                }
                return element
            })
        }

        this.setState({messages: newMessages})
    }

    handleMarkAsRead = () => {
        const newMessages = this.state.messages.map(element => {
            if (element.selected) {
                element.read = true
            }
            return element
        })

        this.setState({messages: newMessages})
    }

    handleMarkAsUnread = () => {
        const newMessages = this.state.messages.map(element => {
            if (element.selected) {
                element.read = false
            }
            return element
        })

        this.setState({messages: newMessages})
    }

    handleDeleteMessages = () => {
        const newMessages = this.state.messages.filter(element => !element.selected)
        this.setState({messages: newMessages})
    }

    handleApplyLabel = (e) => {
        const newMessages = this.state.messages.map(element => {
            if (element.selected) {
                if (!element.labels.includes(e.target.value)) {
                    element.labels.push(e.target.value)
                }
            }
            return element
        })

        this.setState({messages: newMessages})
    }

    handleRemoveLabel = (e) => {
        const newMessages = this.state.messages.map(element => {
            if (element.selected) {
                element.labels = element.labels.filter(element => element !== e.target.value)
            }
            return element
        })

        this.setState({messages: newMessages})
    }

    render() {
        return (
            <div>
                <Toolbar
                    messages={this.state.messages}
                    handleToolbarMessageCheckboxClick={this.handleToolbarMessageCheckboxClick}
                    handleMarkAsRead={this.handleMarkAsRead}
                    handleMarkAsUnread={this.handleMarkAsUnread}
                    handleDeleteMessages={this.handleDeleteMessages}
                    handleApplyLabel={this.handleApplyLabel}
                    handleRemoveLabel={this.handleRemoveLabel}
                />
                <MessageList
                    messages={this.state.messages}
                    checkboxChange={this.handleCheckboxChange}
                    starChange={this.handleStarChange}
                />
            </div>
        )
    }
}

export default Inbox