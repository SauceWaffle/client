import objectAssign from 'object-assign';

export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    const clientId = store.getState().getIn(['clientId','_id']);
    socket.emit('action', objectAssign({}, action, {clientId}));
  }
  return next(action);
}
