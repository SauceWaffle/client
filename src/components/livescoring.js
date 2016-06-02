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

      switch ( whatToGet.substring(0, whatToGet.indexOf("_")) ) {
        case "1": whatToGet = "one"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "2": whatToGet = "two"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "3": whatToGet = "three"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "4": whatToGet = "four"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "5": whatToGet = "five"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "6": whatToGet = "six"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "7": whatToGet = "seven"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "8": whatToGet = "eight"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "9": whatToGet = "nine"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "10": whatToGet = "ten"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "11": whatToGet = "eleven"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "12": whatToGet = "twelve"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "13": whatToGet = "thirteen"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "14": whatToGet = "fourteen"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "15": whatToGet = "fifteen"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "16": whatToGet = "sixteen"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "17": whatToGet = "seventeen"+whatToGet.substring(whatToGet.indexOf("_")); break;
        case "18": whatToGet = "eighteen"+whatToGet.substring(whatToGet.indexOf("_")); break;
        default: whatToGet;
      }

      return (whatever) ? whatever.get(whatToGet) : "";
    }
    else { return "" }
  },
  addMoreGolfers: function() {
    if (this.props.golfers_free && this.props.whoAmI_id && (!this.props.my_golfers || this.props.my_golfers.count() < 4) ) {
      return <div className="addgolfers">Add Golfer:
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
      return <div></div>
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


                <div ref="scoringMainArea">
                  {this.getCurrentHole().map(hole =>

                      <div className="scoringhole"
                          key={"hole_"+hole.get('_id')}>


                        <table>
                        <tbody>

                        <tr>
                          <td rowSpan="2" colSpan="2">
                              <div className="holenumber">{hole.get('number')}</div>
                              <div className="holepicture"><img src={"./images/"+hole.get('number')+".png"} /></div>
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
                          <td className="golfers" colSpan="3">

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

                                  <input type="number" ref={hole.get('_id') + "ScoreBox" + golfer.get('_id')} className="singlescorebox"
                                      onChange={(ele) => this.props.sendGolferScore(this.props.client_id, this.props.round_id, golfer.get('_id'), hole.get('_id'), ele.currentTarget.value)}
                                      placeholder={(this.props.round) ? this.getGolferScore(this.props.round, golfer, hole.get('_id')+'_score') : '' } />


                                </li>

                            )}
                            </ul>
                          </td>
                        </tr>

                        <tr>
                        <td className="navigation" colSpan="3">
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
