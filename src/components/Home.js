import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

import {MessageBoardContainer} from './messageboard';
import {ScoreCardContainer} from './scorecard';
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
                      ref="registerDropdown" value="" >

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
  render: function() {
    return <div className="homescreen">
        <div>{this.isRegistered()}</div>

        <div className="messageboardarea">
          <MessageBoardContainer />
        </div>

        <div className="scorecardarea">
          <ScoreCardContainer />
        </div>

        <div className="leaderboardarea">
          <LeaderboardContainer />
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
    golfers:      state.get('golfers')


  };
}

export const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);
