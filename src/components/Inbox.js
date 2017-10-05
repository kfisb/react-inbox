import React from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import {Route} from 'react-router-dom'

const Inbox = () => (
    <div className="container">
        <Toolbar/>
        <Route path="/compose" component={ComposeForm}/>
        <MessageList/>
    </div>
)

export default Inbox