import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionState, getAppRegistration} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import {HomeContainer} from './components/Home';
import {ManageContainer} from './components/Manage';
import {DebugContainer} from './components/Debugging';
import {Map} from 'immutable';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8000`, {secure: true});
socket.on('state', state =>
  store.dispatch(setState(state))
);
[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));
store.dispatch(getAppRegistration(getClientId().get('_id')));
//socket.on('state', state =>
//  store.dispatch(getMyVotes(state))
//);


const routes = <Route component={App}>
  <Route path="/" component={HomeContainer} />
  <Route path="/debug" component={DebugContainer} />
  <Route path="/manage" component={ManageContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
