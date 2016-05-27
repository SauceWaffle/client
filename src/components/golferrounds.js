import React from 'react';
import {List, Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'

import {ScoreCardHeaderContainer} from './scorecardheader';


export const GolferRounds = React.createClass({
  mixins: [PureRenderMixin],
  getGolfersForScoring: function() {
    if (this.props.golfers && this.props.golfer_id) {
     return this.props.golfers.filter(val => val.get('_id') === this.props.golfer_id) || [];
    }
    else { return [] }
  },
  getGolferRounds: function(golfer) {
    return this.props.rounds || [];
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
    return <div className="golferroundhistory scorecard">
      {this.getGolfersForScoring().map(golfer =>
        <div>
          Golfer Round History - {golfer.get('name')}
          <table>
          <tbody>

              <ScoreCardHeaderContainer lineType='holenumbers' />
              <ScoreCardHeaderContainer lineType='blue' />
              <ScoreCardHeaderContainer lineType='white' />
              <ScoreCardHeaderContainer lineType='red' />
              <ScoreCardHeaderContainer lineType='par' />


          {this.getGolferRounds().map(round =>
            <tr>
              <td className="names">{round.get('name')}</td>

              <td className="hole"><input type="text" ref={"oneScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 1, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('one_score')} />
              </td>
              <td className="hole"><input type="text" ref={"twoScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 2, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('two_score')} />
              </td>
              <td className="hole"><input type="text" ref={"threeScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 3, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('three_score')} />
              </td>
              <td className="hole"><input type="text" ref={"fourScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 4, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('four_score')} />
              </td>
              <td className="hole"><input type="text" ref={"fiveScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), 5, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('five_score')} />
              </td>
              <td className="hole"><input type="text" ref={"sixScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 6, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('six_score')} />
              </td>
              <td className="hole"><input type="text" ref={"sevenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 7, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('seven_score')} />
              </td>
              <td className="hole"><input type="text" ref={"eightScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 8, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('eight_score')} />
              </td>
              <td className="hole"><input type="text" ref={"nineScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 9, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('nine_score')} />
              </td>


              <td className="totals">{round.get('front_score')}</td>



              <td className="hole"><input type="text" ref={"tenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 10, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('ten_score')} />
              </td>
              <td className="hole"><input type="text" ref={"elevenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 11, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('eleven_score')} />
              </td>
              <td className="hole"><input type="text" ref={"twelveScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 12, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('twelve_score')} />
              </td>
              <td className="hole"><input type="text" ref={"thirteenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 13, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('thirteen_score')} />
              </td>
              <td className="hole"><input type="text" ref={"fourteenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 14, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('fourteen_score')} />
              </td>
              <td className="hole"><input type="text" ref={"fifteenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 15, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('fifteen_score')} />
              </td>
              <td className="hole"><input type="text" ref={"sixteenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 16, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('sixteen_score')} />
              </td>
              <td className="hole"><input type="text" ref={"seventeenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 17, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('seventeen_score')} />
              </td>
              <td className="hole"><input type="text" ref={"eighteenScoreBox" + round.get('round_id')} className="scorebox"
                    onChange={(ele) => { this.props.sendGolferScore(this.props.client_id, round.get('round_id'), golfer.get('_id'), 18, ele.currentTarget.value, "manage"); ele.currentTarget.value = ""; }}
                    placeholder={round.get('eighteen_score')} />
              </td>
              <td className="totals">{round.get('back_score')}</td>
              <td className="totals">{round.get('total_score')}</td>
              <td className="hole">{round.get('total_par')}</td>


            </tr>
          )}

          </tbody>
          </table>
        </div>
      )}
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
    rounds:       state.getIn(['clients', state.getIn(['clientId', '_id']), 'golfermanagerounds']),
    golfers:      state.get('golfers'),
    holes:        state.get('holes')
  };
}

export const GolferRoundsContainer = connect(
  mapStateToProps,
  actionCreators
)(GolferRounds);
