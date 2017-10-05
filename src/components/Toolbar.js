import React from 'react'
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import {
    applyLabel,
    deleteMessages,
    messagesRead,
    messagesUnread,
    removeLabel,
    toolbarMessageSelection
} from "../actions/index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const Toolbar = ({
                     messages,
                     toolbarMessageSelection,
                     messagesRead,
                     messagesUnread,
                     deleteMessages,
                     applyLabel,
                     removeLabel,
                 }) => {

    let isMessagesSelected = true
    let checkedMessagesStyle = "fa fa-minus-square-o" // default to some selected
    let selectedMessages = messages.filter(element => element.selected === true)
    if (selectedMessages.length === 0) {
        isMessagesSelected = false
        checkedMessagesStyle = "fa fa-square-o"
    } else if (selectedMessages.length === messages.length) {
        checkedMessagesStyle = "fa fa-check-square-o"
    }

    const unreadMessages = messages.filter(element => element.read === false)


    const handleToolbarMessageCheckboxClick = () => {
        toolbarMessageSelection()
    }

    const handleMarkAsRead = () => {
        const messageIds = messages
            .filter(element => element.selected === true)
            .map(element => element.id)
        messagesRead(messageIds)
    }

    const handleMarkAsUnread = () => {
        const messageIds = messages
            .filter(element => element.selected === true)
            .map(element => element.id)
        messagesUnread(messageIds)
    }

    const handleDeleteMessages = () => {
        const messageIds = messages
            .filter(element => element.selected)
            .map(element => element.id)
        deleteMessages(messageIds)
    }

    const handleApplyLabel = (e) => {
        const messageIds = messages.filter(element => element.selected).map(element => element.id)
        applyLabel(messageIds, e.target.value)
    }

    const handleRemoveLabel = (e) => {
        const messageIds = messages.filter(element => element.selected).map(element => element.id)
        removeLabel(messageIds, e.target.value)
    }


    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unreadMessages.length}</span>
                    {unreadMessages.length === 1 ? `unread message` : `unread messages`}
                </p>

                <Switch>
                    <Route exact path="/" render={props => (
                        <Link to="/compose" className="btn btn-danger">
                            <i className="fa fa-plus"></i>
                        </Link>
                    )}/>
                    <Route path="/compose" render={props => (
                        <Link to="/" className="btn btn-danger">
                            <i className="fa fa-plus"></i>
                        </Link>
                    )}/>
                </Switch>

                <button className="btn btn-default" onClick={handleToolbarMessageCheckboxClick}>
                    <i className={checkedMessagesStyle}></i>
                </button>

                <button className="btn btn-default" disabled={!isMessagesSelected} onClick={handleMarkAsRead}>
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled={!isMessagesSelected} onClick={handleMarkAsUnread}>
                    Mark As Unread
                </button>

                <select className="form-control label-select"
                        disabled={!isMessagesSelected}
                        value="Apply label"
                        onChange={handleApplyLabel}
                >
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select
                    className="form-control label-select"
                    disabled={!isMessagesSelected}
                    value="Remove label"
                    onChange={handleRemoveLabel}
                >
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled={!isMessagesSelected} onClick={handleDeleteMessages}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messagesRead,
    messagesUnread,
    toolbarMessageSelection,
    deleteMessages,
    applyLabel,
    removeLabel,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))