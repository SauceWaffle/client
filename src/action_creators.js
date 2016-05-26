export function setClientId(clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId
  };
}

export function setConnectionState(state, connected) {
  return {
    type: 'SET_CONNECTION_STATE',
    state,
    connected
  };
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function getAppRegistration(client_id) {
  return {
    meta: {remote: true},
    type: 'GET_APP_REGISTRATION',
    client_id
  };
}

export function sendNewMessage(round_id, golfer_id, message) {
  return {
    meta: {remote: true},
    type: 'ADD_NEW_MESSAGE',
    round_id,
    golfer_id,
    message
  }
}



export function registerTo(client_id, golfer_id) {
  return {
    meta: {remote: true},
    type: 'REGISTER_TO_GOLFER',
    client_id,
    golfer_id
  };
}

export function sendGolferScore(client_id, round_id, golfer_id, hole_id, score) {
  return {
    meta: {remote: true},
    type: 'SEND_GOLFER_SCORE',
    client_id,
    round_id,
    golfer_id,
    hole_id,
    score
  };
}

export function resetMyVote(voter) {
  return {
    meta: {remote: true},
    type: 'RESET_MY_VOTE',
    voter
  };
}

export function vote(group, entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    group,
    entry
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function restart() {
  return {
    meta: {remote: true},
    type: 'REFRESH_SERVER_DATA'
  };
}
