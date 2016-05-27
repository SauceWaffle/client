import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'

export const MessageBoard = React.createClass({
  mixins: [PureRenderMixin],
  getMessages: function() {
    return this.props.messages || [];
  },
  surfIsDisabled: function() {
    return !!this.props.surfHasVoted;
  },
  surfHasVotedFor: function(entry) {
    return this.props.surfHasVoted === entry;
  },
  render: function() {
    return <div>
      <div className="messageboard">


        {this.getMessages().map(message =>
          <div className="message" key={message.get('_id')} >
            <div className="messagelineone">
              <span className="messageheader" style={{color: message.get('message_color')}} >{message.get('golfer_name')}</span>
              <span className="messagedate" style={{color: message.get('message_color')}}   >{message.get('created')}</span>
            </div>
            <div className="messagelinetwo">
              <span className="messagetext"   >{message.get('message')}</span>
            </div>
          </div>
        )}


        <div className="newmessage">

          <form onSubmit={e => {
              e.preventDefault()
              if (!this.refs.txtAddMessage.value.trim()) {
                return
              }
              this.props.sendNewMessage(this.props.round_id, this.props.whoAmI_id, this.refs.txtAddMessage.value)
              this.refs.txtAddMessage.value = ''
          }}>

          <input className="newmessagetext" ref="txtAddMessage" placeholder="Say Something..." />
          <button className="newmessagebutton" type="submit" >Add</button>

        </form>

      </div>
      </div>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    client_id:    state.getIn(['clientId', '_id']),
    whoAmI:       state.getIn(['clients', state.getIn(['clientId', '_id']), '_id']),
    whoAmI_id:    state.getIn(['clients', state.getIn(['clientId', '_id']), 'golfer_id']),
    whoAmI_name:  state.getIn(['clients', state.getIn(['clientId', '_id']), 'golfer_name']),
    whoAmI_color: state.getIn(['clients', state.getIn(['clientId', '_id']), 'my_color']),
    round_id:     state.get('currentRound'),
    messages:     state.get('messages')
  };
}

export const MessageBoardContainer = connect(
  mapStateToProps,
  actionCreators
)(MessageBoard);
