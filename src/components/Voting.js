import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import {Results} from './Results'
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="votescreen">
        <Vote {...this.props} />
        <button className="resetmyvote"
                onClick={() => this.props.resetMyVote(this.props.whoIsVoting)}>
            Reset My Vote
        </button>
        <Results {...this.props} />
    </div>
  }
});

function mapStateToProps(state) {
  return {
    surface: state.getIn(['vote', 'surface']),
    hills: state.getIn(['vote', 'hills']),
    distance: state.getIn(['vote', 'distance']),
    surfHasVoted: state.getIn(['vote','votes', 'surface', state.get('clientId')]),
    hillHasVoted: state.getIn(['vote', 'votes', 'hills', state.get('clientId')]),
    distHasVoted: state.getIn(['vote', 'votes', 'distance', state.get('clientId')]),
    whoIsVoting: state.get('clientId'),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
