import React from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import MessageBody from "./MessageBody";
import {connect} from "react-redux";
import {messageSelection, starMessage} from "../actions/index";
import {bindActionCreators} from "redux";

const Message = ({
                     index,
                     message,
                     messageSelection,
                     starMessage,
                 }) => {

    let rowStyle = "row message"
    if (message.selected === true) {
        rowStyle += " selected"
    }
    if (message.read === true) {
        rowStyle += " read"
    } else {
        rowStyle += " unread"
    }

    let starStyle = "star fa fa-star"
    if (message.starred !== true) {
        starStyle += "-o"
    }

    return (
        <div>
            <div className={rowStyle}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input
                                type="checkbox"
                                name="checkbox"
                                onChange={(e) => messageSelection(e.target.checked, index)}
                                checked={message.selected ? true : false}
                            />
                        </div>
                        <div className="col-xs-2">
                            <i
                                className={starStyle}
                                name="star"
                                onClick={() => starMessage(message)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {message.labels.map((label, i) =>
                        <span key={i} className="label label-warning">{label}</span>
                    )}
                    <Link to={`/messages/${message.id}`}>
                        {message.subject}
                    </Link>
                </div>
            </div>

            <Route key="message-bod" path={`/messages/${message.id}`} render={props => (
                <MessageBody messageId={message.id} {...props} />
            )}/>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messageSelection,
    starMessage,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))