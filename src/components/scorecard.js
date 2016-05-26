import React from 'react';
import {List, Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'

import {ScoreCardHeaderContainer} from './scorecardheader';


export const ScoreCard = React.createClass({
  mixins: [PureRenderMixin],
  getGolfersForScoring: function() {
    if (this.props.golfers && this.props.whoAmI_id) {
     return this.props.golfers.filter(val => val.get('_id') === this.props.whoAmI_id) || [];
    }
    else { return [] }
  },
  getGolferScore: function(round, golfer, whatToGet) {
    if (round && golfer && whatToGet) {
      var whatever;
      whatever = round.find(val => val.get('_id') === golfer.get('_id'));
      return (whatever) ? whatever.get(whatToGet) : "";
    }
    else { return "" }
  },
  surfHasVotedFor: function(entry) {
    return this.props.surfHasVoted === entry;
  },
  render: function() {
    return <div className="scorecard leaderboard">
        Scoring
        <table>
        <tbody>

            <ScoreCardHeaderContainer lineType='holenumbers' />
            <ScoreCardHeaderContainer lineType='blue' />
            <ScoreCardHeaderContainer lineType='white' />
            <ScoreCardHeaderContainer lineType='red' />
            <ScoreCardHeaderContainer lineType='par' />


        {this.getGolfersForScoring().map(golfer =>
          <tr>
            <td className="names">{golfer.get('name')}</td>

            <td className="hole"><input type="text" ref={"oneScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 1, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'one_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"twoScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 2, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'two_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"threeScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 3, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'three_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"fourScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 4, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'four_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"fiveScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 5, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'five_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"sixScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 6, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'six_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"sevenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 7, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'seven_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"eightScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 8, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'eight_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"nineScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 9, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'nine_score') : '' } />
            </td>


            <td className="totals">{(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'front_score') : '' }</td>



            <td className="hole"><input type="text" ref={"tenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 10, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'ten_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"elevenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 11, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'eleven_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"twelveScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 12, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'twelve_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"thirteenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 13, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'thirteen_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"fourteenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 14, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'fourteen_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"fifteenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 15, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'fifteen_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"sixteenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 16, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'sixteen_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"seventeenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 17, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'seventeen_score') : '' } />
            </td>
            <td className="hole"><input type="text" ref={"eighteenScoreBox" + golfer.get('_id')} className="scorebox"
                  onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 18, ele.currentTarget.value)}
                  placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'eighteen_score') : '' } />
            </td>
            <td className="totals">{(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'back_score') : '' }</td>
            <td className="totals">{(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'total_score') : '' }</td>
            <td className="hole">{(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'total_par') : '' }</td>


          </tr>
        )}

        </tbody>
        </table>

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

export const ScoreCardContainer = connect(
  mapStateToProps,
  actionCreators
)(ScoreCard);
