import React from 'react'

const Toolbar = ({
                     messages,
                     handleToolbarMessageCheckboxClick,
                     handleMarkAsRead,
                     handleMarkAsUnread,
                     handleDeleteMessages,
                     handleApplyLabel,
                     handleRemoveLabel,
                     toggleComposeForm,
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

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unreadMessages.length}</span>
                    {unreadMessages.length === 1 ? `unread message` : `unread messages`}
                </p>

                <a className="btn btn-danger" onClick={toggleComposeForm}>
                    <i className="fa fa-plus"></i>
                </a>

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

export default Toolbar
