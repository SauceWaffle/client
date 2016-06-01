import {List, Map} from 'immutable';
import {getManageGolferRounds} from './action_creators';

function setConnectionState(state, connectionState, connected) {
  return state.set('connection', Map({
    state: connectionState,
    connected
  }));
}

function setState(state, newState) {
  return state.merge(newState);
}

function setCurrentGolfer(state, golfer_id) {
  return state.set('currentManageGolfer', golfer_id);
}

function setActivePane(state, pane) {
  return state.set('currentPane', pane);
}

function setFrontOrBack(state, frontorback) {
  return state.set('playingfrontorback', frontorback);
}

function setCurrentHole(state, hole) {
  return state.set('mycurrenthole', hole);
}






function getMyVotes(state, votes) {
  if (votes) {
    const entry = votes[ state.get('clientId') ];
    const currentRound = state.getIn(['vote', 'round']);
    if (entry) {
      return state.setIn('myVote', Map({
        round: currentRound,
        entry
      }));
    } else {
      return state;
    }
  } else {
    return state;
  }
}


function resetMyVote(state) {
  const votedForRound = state.getIn(['myVote', 'round']);
  const currentRound = state.getIn(['vote', 'round']);
  if (votedForRound !== currentRound) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

function vote(state, group, entry) {
  const currentRound = state.getIn(['vote', 'round']);
  const currentPair = state.getIn(['vote', group]);
  if (currentPair && currentPair.includes(entry)) {
    return state.setIn(['myVote', group], Map({
      round: currentRound,
      entry
    }));
  } else {
    return state;
  }
}

function resetVote(state) {
  const votedForRound = state.getIn(['myVote', 'round']);
  const currentRound = state.getIn(['vote', 'round']);
  if (votedForRound !== currentRound) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_CLIENT_ID':
    return state.set('clientId', action.clientId);
  case 'SET_CONNECTION_STATE':
    return setConnectionState(state, action.state, action.connected);
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'SET_CURRENT_GOLFER':
    return setCurrentGolfer(state, action.golfer_id);
  case 'SET_ACTIVE_PANE':
    return setActivePane(state, action.pane);
  case 'SET_FRONT_OR_BACK':
    return setFrontOrBack(state, action.frontorback);
  case 'SET_CURRENT_HOLE':
    return setCurrentHole(state, action.hole);
  case 'GET_MY_VOTES':
    return getMyVotes(state, action.state.vote.votes);
  case 'VOTE':
    return vote(state, action.group, action.entry);
  }
  return state;
}
