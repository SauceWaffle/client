import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames'

export default React.createClass({
  mixins: [PureRenderMixin],
  getSurface: function() {
    return this.props.surface || [];
  },
  getHills: function() {
    return this.props.hills || [];
  },
  getDistance: function() {
    return this.props.distance || [];
  },
  surfIsDisabled: function() {
    return !!this.props.surfHasVoted;
  },
  hillIsDisabled: function() {
    return !!this.props.hillHasVoted;
  },
  distIsDisabled: function() {
    return !!this.props.distHasVoted;
  },
  surfHasVotedFor: function(entry) {
    return this.props.surfHasVoted === entry;
  },
  hillHasVotedFor: function(entry) {
    return this.props.hillHasVoted === entry;
  },
  distHasVotedFor: function(entry) {
    return this.props.distHasVoted === entry;
  },
  render: function() {
    return <div className="voting">


      <div className="surface">
          <button className="voteheader" disabled>
            <div className="voteentry">SURFACE</div>
          </button>
        {this.getSurface().map(entry =>
          <button key={entry}
                  className={classNames({voted: this.surfHasVotedFor(entry)})}
                  disabled={this.surfIsDisabled()}
                  onClick={() => this.props.vote('surface', entry)}>
            <div className="voteentry">{entry}</div>
            {this.surfHasVotedFor(entry) ?
              <div className="label">Voted</div> :
              null}
          </button>
        )}
      </div>



      <div className="hills">
          <button className="voteheader" disabled>
            <div className="voteentry">HILLS</div>
          </button>
        {this.getHills().map(entry =>
          <button key={entry}
                  className={classNames({voted: this.hillHasVotedFor(entry)})}
                  disabled={this.hillIsDisabled()}
                  onClick={() => this.props.vote('hills', entry)}>
            <div className="voteentry">{entry}</div>
            {this.hillHasVotedFor(entry) ?
              <div className="label">Voted</div> :
              null}
          </button>
        )}
      </div>



      <div className="distance">
          <button className="voteheader" disabled>
            <div className="voteentry">DISTANCE</div>
          </button>
        {this.getDistance().map(entry =>
          <button key={entry}
                  className={classNames({voted: this.distHasVotedFor(entry)})}
                  disabled={this.distIsDisabled()}
                  onClick={() => this.props.vote('distance', entry)}>
            <div className="voteentry">{entry}</div>
            {this.distHasVotedFor(entry) ?
              <div className="label">Voted</div> :
              null}
          </button>
        )}
      </div>

    </div>;
  }
});
