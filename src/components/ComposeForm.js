import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {composeMessage} from "../actions/index"
import {withRouter} from 'react-router-dom'

const ComposeForm = ({composeMessage, history}) => {

    const onSubmitForm = (e) => {
        e.preventDefault()

        const postBody = {
            subject: e.target.subject.value,
            body: e.target.body.value,
        }

        composeMessage(postBody, history)
    }

    return (
        <form className="form-horizontal well" onSubmit={onSubmitForm}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject"
                           name="subject"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control"></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary"/>
                </div>
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    composeMessage: composeMessage,
}, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(ComposeForm))
