import React from 'react'
import {Link, Route} from 'react-router-dom'
import MessageBody from "./MessageBody";
import connect from "react-redux/es/connect/connect";
import {expandMessage, messageSelection, starMessage} from "../actions/index";
import bindActionCreators from "redux/src/bindActionCreators";

const Message = ({
                     index,
                     message,
                     messageSelection,
    starMessage,
    expandMessage,
                     match,
                 }) => {


    // const expandMessage = (id) => {
    //     expandMessage(id)
    // }

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
                    {/*<Link to={`${match.url}/${message.id}`}>*/}
                    <Link to={`messages/${message.id}`}>
                        {/*<a href="#">*/}
                        {message.subject}
                        {/*</a>*/}
                    </Link>
                </div>
            </div>
            {/*<Route path="/messages/:id" render={props => (*/}
                {/*<MessageBody/>*/}
            {/*)}/>*/}
            <Route path="/messages/:id" component={MessageBody} />
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    messageSelection,
    starMessage,
    expandMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Message)