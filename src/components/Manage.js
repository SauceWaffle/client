import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'

import {GolferRoundsContainer} from './golferrounds'

export const Manage = React.createClass({
  mixins: [PureRenderMixin],
  getGolfers: function() {
    return this.props.golfers || [];
  },
  render: function() {
    var currentGolfer;

    return <div className="management">
        <table className="managegolfers">
        <tbody>
        <tr>
          <th>NAME</th>
          <th>PLACE</th>
          <th>HANDICAP</th>
          <th>ROUNDS ON FRONT</th>
          <th>TOTAL FRONT SCORE</th>
          <th>ROUNDS ON BACK</th>
          <th>TOTAL BACK SCORE</th>
          <th>MESSAGE BOARD COLOR</th>
          <th></th>
        </tr>

        {this.getGolfers().map(golfer =>
          <tr key={golfer.get('_id')}>
            <td><input type="text" ref={golfer.get('_id')+"_name"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'name', ele.currentTarget.value)}
                  placeholder={golfer.get('name')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_place"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'place', ele.currentTarget.value)}
                  placeholder={golfer.get('place')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_handicap"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'handicap', ele.currentTarget.value)}
                  placeholder={golfer.get('handicap')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_frontrounds"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'frontrounds', ele.currentTarget.value)}
                  placeholder={golfer.get('frontrounds')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_frontscore"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'frontscore', ele.currentTarget.value)}
                  placeholder={golfer.get('frontscore')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_backrounds"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'backrounds', ele.currentTarget.value)}
                  placeholder={golfer.get('backrounds')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_backscore"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'backscore', ele.currentTarget.value)}
                  placeholder={golfer.get('backscore')} /></td>
            <td><input type="text" ref={golfer.get('_id')+"_my_color"} className="golferinputs"
                  onChange={(ele) => this.props.sendGolferInfo(golfer.get('_id'), 'my_color', ele.currentTarget.value)}
                  placeholder={golfer.get('my_color')} /></td>
            <td><button className="golferrounds" onClick={() => {this.props.setCurrentGolfer(golfer.get('_id')); this.props.getManageGolferRounds(golfer.get('_id')); } }>Rounds</button></td>
          </tr>
        )}
        </tbody>
        </table>


        <form onSubmit={e => {
            e.preventDefault()
            this.props.addNewGolfer()
        }} className="addnewgolfer">

        <button type="submit" >Add a New Golfer</button>

        </form>




        <GolferRoundsContainer golfer_id={this.props.currentGolfer} />




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
    holes:        state.get('holes'),
    currentGolfer: state.get('currentManageGolfer')
  }
}

export const ManageContainer = connect(
  mapStateToProps,
  actionCreators
)(Manage);
