import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'

import {ScoreCardHeaderContainer} from './scorecardheader';

export const Leaderboard = React.createClass({
  mixins: [PureRenderMixin],
  getLeaderboardScores: function() {
    return this.props.round || [];
  },
  surfIsDisabled: function() {
    return !!this.props.surfHasVoted;
  },
  surfHasVotedFor: function(entry) {
    return this.props.surfHasVoted === entry;
  },
  render: function() {
    return <div>
    <div className="scorecard leaderboard">
      Leaders
        <table>
        <tbody>

              <ScoreCardHeaderContainer lineType='holenumbers' />
              <ScoreCardHeaderContainer lineType='blue' />
              <ScoreCardHeaderContainer lineType='white' />
              <ScoreCardHeaderContainer lineType='red' />
              <ScoreCardHeaderContainer lineType='par' />


        {this.getLeaderboardScores().map(golfer =>
          <tr>
            <td className="names">{golfer.get('name')}</td>

            <td className="hole">{golfer.get('one_score')}</td>
            <td className="hole">{golfer.get('two_score')}</td>
            <td className="hole">{golfer.get('three_score')}</td>
            <td className="hole">{golfer.get('four_score')}</td>
            <td className="hole">{golfer.get('five_score')}</td>
            <td className="hole">{golfer.get('six_score')}</td>
            <td className="hole">{golfer.get('seven_score')}</td>
            <td className="hole">{golfer.get('eight_score')}</td>
            <td className="hole">{golfer.get('nine_score')}</td>

            <td className="totals">{golfer.get('front_score')}</td>

            <td className="hole">{golfer.get('ten_score')}</td>
            <td className="hole">{golfer.get('eleven_score')}</td>
            <td className="hole">{golfer.get('twelve_score')}</td>
            <td className="hole">{golfer.get('thirteen_score')}</td>
            <td className="hole">{golfer.get('fourteen_score')}</td>
            <td className="hole">{golfer.get('fifteen_score')}</td>
            <td className="hole">{golfer.get('sixteen_score')}</td>
            <td className="hole">{golfer.get('seventeen_score')}</td>
            <td className="hole">{golfer.get('eighteen_score')}</td>

            <td className="totals">{golfer.get('back_score')}</td>
            <td className="totals">{golfer.get('total_score')}</td>
            <td className="hole">{golfer.get('total_par')}</td>
          </tr>
        )}

        </tbody>
        </table>
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
    round:        state.getIn(['round_data', 'round_'+state.get('currentRound')]),
    golfers:      state.get('golfers'),
    holes:        state.get('holes')
  };
}

export const LeaderboardContainer = connect(
  mapStateToProps,
  actionCreators
)(Leaderboard);
