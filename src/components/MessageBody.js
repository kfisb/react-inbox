import React from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchMessageBody} from "../actions/index";
import {bindActionCreators} from "redux";

class MessageBody extends React.Component {
    componentDidMount() {
        this.props.fetchMessageBody(this.props.messageId)
    }

    componentWillUpdate() {
        this.props.fetchMessageBody(this.props.messageId)
    }

    render() {
        return (
            <div className="row message-body">
                <div className="col-xs-11 col-xs-offset-1">
                    {this.props.messageBody}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, {messageId}) => ({
    messageBody: state.messages.messageBody,
    messageId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMessageBody,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageBody))