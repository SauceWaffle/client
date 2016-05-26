import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

export const VOTE_WIDTH_PERCENT = 20;

export const Results = React.createClass({
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
  getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  getVotesBlockWidth: function(entry) {
    return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
  },
  render: function() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">

        <div className="surfresults">
          <div className="tally">
            {this.getSurface().map(entry =>
              <div key={entry} className="entry">
                <div className="voteentry">{entry}</div>
                <div className="voteVisualization">
                  <div className="votesBlock"
                       style={{width: this.getVotesBlockWidth(entry)}}>
                  </div>
                </div>
                <div className="voteCount">
                  {this.getVotes(entry)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hillresults">
          <div className="tally">
            {this.getHills().map(entry =>
              <div key={entry} className="entry">
                <div className="voteentry">{entry}</div>
                <div className="voteVisualization">
                  <div className="votesBlock"
                       style={{width: this.getVotesBlockWidth(entry)}}>
                  </div>
                </div>
                <div className="voteCount">
                  {this.getVotes(entry)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="distresults">
          <div className="tally">
            {this.getDistance().map(entry =>
              <div key={entry} className="entry">
                <div className="voteentry">{entry}</div>
                <div className="voteVisualization">
                  <div className="votesBlock"
                       style={{width: this.getVotesBlockWidth(entry)}}>
                  </div>
                </div>
                <div className="voteCount">
                  {this.getVotes(entry)}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>;
  }
});
