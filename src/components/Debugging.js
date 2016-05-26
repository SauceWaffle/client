import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Debug = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="management">
          <button ref="restart"
                  onClick={this.props.restart}>
            Restart
          </button>

          <div>

          <pre>
            redux state = { JSON.stringify(this.props.reduxState, null, 2) }
          </pre>
          </div>
        </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
    reduxState: state
  }
}

export const DebugContainer = connect(
  mapStateToProps,
  actionCreators
)(Debug);
