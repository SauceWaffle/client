import React from 'react';
import {List, Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'

import {ScoreCardHeaderContainer} from './scorecardheader';


export const Scoring = React.createClass({
  mixins: [PureRenderMixin],
  getAllGolfers: function() {
    return this.props.golfers || []
  },
  getAllFreeGolfers: function() {
    return this.props.golfers_free || []
  },
  getGolfersForScoring: function() {
    if (this.props.my_golfers) {
      return this.props.my_golfers || [];
    }
    else {
      this.props.addToMyGolfers(this.props.client_id, this.props.whoAmI_id)
      return [];
    }
  },
  getGolferScore: function(round, golfer, whatToGet) {
    if (round && golfer && whatToGet) {
      var whatever;
      whatever = round.find(val => val.get('_id') === golfer.get('_id'));
      return (whatever) ? whatever.get(whatToGet) : "";
    }
    else { return "" }
  },
  addMoreGolfers: function() {
    if (this.props.golfers_free && this.props.whoAmI_id && (!this.props.my_golfers || this.props.my_golfers.count() < 4) ) {
      return <div className="addgolfers">Add Golfer For Scoring:
            <select onChange={() => this.props.addToMyGolfers(this.props.client_id,
                                                          this.refs.addMoreGolfersDropdown.value)}
                    ref="addMoreGolfersDropdown" value=""
                    className="addgolfersdropdown" >

              <option value=""></option>
              {this.getAllFreeGolfers().map(golfer =>
                <option key={golfer.get('_id')}
                        value={golfer.get('_id')} >
                        {golfer.get('name')}
                </option>
              )}

            </select>
        </div>
    }
    else if (this.props.golfers_free && this.props.whoAmI_id && this.props.my_golfers && this.props.my_golfers.count() == 4 )  {
      return <div>Add Golfer For Scoring:
              <div>Already Have a Foursome</div>
            </div>
    }
    else { return "" }
  },
  getHalfHoles: function() {
    if (this.props.holes && this.props.frontorback) {
     return this.props.holes.filter(val => val.get('frontback') === this.props.frontorback) || [];
    }
    else { return [] }
  },
  getCurrentHole: function() {
    if (this.props.holes && this.props.my_current_hole) {
      return this.props.holes.filter(val => val.get('number') == this.props.my_current_hole) || [];
    }
    else { return [] }
  },
  getNavigation: function(number) {
    if (number == 1 || number == 10) {
      return <div>
          PREV HOLE
          <button className="holenavigation next" onClick={(ele) => {this.props.setCurrentHole(this.props.my_current_hole + 1) }}>NEXT HOLE</button>
        </div>
    }
    else if (number == 9 || number == 18) {
      return <div>
          <button className="holenavigation prev" onClick={(ele) => {this.props.setCurrentHole(this.props.my_current_hole - 1) }}>PREV HOLE</button>
          NEXT HOLE
        </div>
    }
    else { return <div>
          <button className="holenavigation prev" onClick={(ele) => {this.props.setCurrentHole(this.props.my_current_hole - 1) }}>PREV HOLE</button>
          <button className="holenavigation next" onClick={(ele) => {this.props.setCurrentHole(this.props.my_current_hole + 1) }}>NEXT HOLE</button>
        </div>
    }
  },
  surfHasVotedFor: function(entry) {
    return this.props.surfHasVoted === entry;
  },
  render: function() {
    return <div>
      <div className="livescoring">

        <div className="scoringheader">

            <div className="addgolfers">{this.addMoreGolfers()}</div>
            <div className="playingfrontorback">
              Playing:
              <select onChange={() => {
                                  (this.refs.playingFrontOrBackDropdown.value == "BACK") ? this.props.setCurrentHole(10) : this.props.setCurrentHole(1);
                                  this.props.setFrontOrBack(this.refs.playingFrontOrBackDropdown.value);
                                }
                    }
                    ref="playingFrontOrBackDropdown" value={this.props.frontorback}
                    className="frontorbackdropdown">

                  <option value=""></option>
                  <option value="FRONT">FRONT</option>
                  <option value="BACK">BACK</option>
              </select>
            </div>

        </div>


        <div className="scoringmain">

            <div className="scoringviewpane">

                <div ref="scoringMainArea">
                  {this.getCurrentHole().map(hole =>

                      <div className="scoringhole"
                          key={"hole_"+hole.get('_id')}>


                        <table>
                        <tbody>

                        <tr>
                          <td className="holenumber" colSpan="2">
                            <div>{hole.get('number')}</div>
                          </td>
                          <td>
                          </td>
                        </tr>

                        <tr>
                          <td className="holepicture" rowSpan="2">
                            <div>[picture here]</div>
                          </td>
                          <td>
                            <div className="holepar">Par {hole.get('par')}</div>
                            <div className="holehandicap">Handicap {hole.get('handicap')}</div>
                          </td>
                        </tr>

                        <tr>
                          <td className="holedistances">
                            <ul>
                              <li className="blue"><span>{hole.get('bluedistance')}yds</span></li>
                              <li className="white"><span>{hole.get('whitedistance')}yds</span></li>
                              <li className="red"><span>{hole.get('reddistance')}yds</span></li>
                            </ul>
                          </td>
                        </tr>

                        <tr>
                        <td className="golfers" colSpan="2">

                          <ul className="golfers">
                          {this.getGolfersForScoring().map(golfer =>
                              <li>

                                <div className="golfername">
                                  <button className="removegolfer"
                                        onClick={() => this.props.removeFromMyGolfers(this.props.client_id, golfer.get('_id'))}
                                    >X</button>
                                  {golfer.get('name')}
                                </div>

                                <div className="golfertotal">{(this.props.round) ? this.getGolferScore(this.props.round, golfer, 'total_score') : '' }</div>

                                <input type="text" ref={hole.get('_id') + "ScoreBox" + golfer.get('_id')} className="singlescorebox"
                                    onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), hole.get('_id'), ele.currentTarget.value)}
                                    placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, hole.get('_id')+'_score') : '' } />


                              </li>

                          )}
                          </ul>
                        </td>
                        </tr>

                        <tr>
                        <td className="navigation" colSpan="2">
                          {this.getNavigation(hole.get('number'))}
                        </td>
                        </tr>

                        </tbody>
                        </table>
                      </div>

                  )}


                </div>


            </div>
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
    round:        state.getIn(['round_data', 'round_'+state.get('currentRound')]),
    golfers:      state.get('golfers'),
    golfers_free: state.get('golfersnotscored'),
    holes:        state.get('holes'),
    my_golfers:   state.getIn(['mygolfers', state.getIn(['clientId', '_id']) ]),
    my_current_hole: state.get('mycurrenthole'),
    frontorback:  state.get('playingfrontorback')
  };
}

export const ScoringContainer = connect(
  mapStateToProps,
  actionCreators
)(Scoring);
