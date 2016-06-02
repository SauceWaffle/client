import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

import {MessageBoardContainer} from './messageboard';
import {ScoreCardContainer} from './scorecard';
import {ScoringContainer} from './livescoring';
import {LeaderboardContainer} from './leaderboard';



export const Home = React.createClass({
  mixins: [PureRenderMixin],
  getAllGolfers: function() {
    return this.props.golfers || []
  },
  isRegistered: function() {
      if (this.props.whoAmI_name) {
        return <div>Signed In As: {this.props.whoAmI_name}</div>
      }
      else {
        return <div>Register to:
              <select onChange={() => this.props.registerTo(this.props.client_id,
                                                            this.refs.registerDropdown.value)}
                      ref="registerDropdown" value=""
                      className="registrationdropdown" >

                <option value=""></option>
                {this.getAllGolfers().map(golfer =>
                  <option key={golfer.get('_id')}
                          value={golfer.get('_id')} >
                          {golfer.get('name')}
                  </option>
                )}

              </select>

              </div>
      }
  },
  curRound: function() {
      if (this.props.round_id) {
        return <div>Week Of: {this.props.round_id}</div>
      }
      else {
        return ""
      }
  },
  isActiveTab: function(tab) {
    if (this.props.currentPane && tab === this.props.currentPane){
      return "tab selected";
    }
    else { return "tab" }
  },
  isActivePane: function(pane) {
    if (this.props.currentPane && pane === this.props.currentPane){
      return "active";
    }
    else { return "inactive" }
  },
  render: function() {
    return <div className="homescreen">
        <div className="homeheader">
          <div className="topbar">
            <div className="registration">{this.isRegistered()}</div>
            <div className="currentround">{this.curRound()}</div>
          </div>


          <div className="hometabs">
            <button className={this.isActiveTab("score")} ref="scoretab" onClick={() => {this.props.setActivePane("score") }}>SCORE CARD</button>
            <button className={this.isActiveTab("leader")} ref="leadertab" onClick={() => {this.props.setActivePane("leader") }}>LEADER BOARD</button>
            <button className={this.isActiveTab("message")} ref="messagetab" onClick={() => {this.props.setActivePane("message") }}>MESSAGE BOARD</button>
          </div>

        </div>

        <div className="viewpane">

          <div className={this.isActivePane("score")}>
            <ScoringContainer />
          </div>

          <div className={this.isActivePane("leader")}>
            <LeaderboardContainer />
          </div>

          <div className={this.isActivePane("message")}>
            <MessageBoardContainer />
          </div>

        </div>
    </div>
  }
});

function mapStateToProps(state) {
  return {
    client_id:    state.getIn(['clientId', '_id']),
    whoAmI:       state.getIn(['clients', state.getIn(['clientId', '_id']), '_id']),
    whoAmI_id:    state.getIn(['clients', state.getIn(['clientId', '_id']), 'golfer_id']),
    whoAmI_name:  state.getIn(['clients', state.getIn(['clientId', '_id']), 'golfer_name']),
    round_id:     state.get('currentRound'),
    golfers:      state.get('golfers'),
    currentPane:  state.get('currentPane')
  };
}

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);
