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

export function setCurrentGolfer(golfer_id) {
  return {
    type: 'SET_CURRENT_GOLFER',
    golfer_id
  };
}

export function setActivePane(pane) {
  return {
    type: 'SET_ACTIVE_PANE',
    pane
  }
}







export function getManageGolferRounds(golfer_id) {
  return {
    meta: {remote: true},
    type: 'GET_MANAGE_GOLFER_ROUNDS',
    golfer_id
  };
}



export function getAppRegistration(client_id) {
  return {
    meta: {remote: true},
    type: 'GET_APP_REGISTRATION',
    client_id
  };
}

export function registerTo(client_id, golfer_id) {
  return {
    meta: {remote: true},
    type: 'REGISTER_TO_GOLFER',
    client_id,
    golfer_id
  };
}





export function addNewGolfer() {
  return {
    meta: {remote: true},
    type: 'ADD_NEW_GOLFER'
  };
}


export function sendGolferInfo(golfer_id, field, value) {
  return {
    meta: {remote: true},
    type: 'SAVE_GOLFER_INFO',
    golfer_id,
    field,
    value
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






export function sendGolferScore(client_id, round_id, golfer_id, hole_id, score, from_where = "scorecard") {
  return {
    meta: {remote: true},
    type: 'SEND_GOLFER_SCORE',
    client_id,
    round_id,
    golfer_id,
    hole_id,
    score,
    from_where
  };
}











export function restart() {
  return {
    meta: {remote: true},
    type: 'REFRESH_SERVER_DATA'
  };
}
