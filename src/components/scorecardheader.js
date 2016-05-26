import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import classNames from 'classnames'


export const ScoreHeader = React.createClass({
  mixins: [PureRenderMixin],
  getHoles: function() {
    return this.props.holes || [];
  },
  render: function() {
    switch (this.props.lineType) {
      case 'holenumbers' :
        return <tr className="scoreheader">
                <td className="names"></td>

                {this.getHoles().map(hole =>
                  <td className="hole">{hole.get('number')}</td>
                )}

              </tr>;
        break;

      case 'blue':
        return <tr className="scoreheaderblue">
                <td className="names">BLUE</td>

                {this.getHoles().map(hole =>
                  <td className="hole">{hole.get('bluedistance')}</td>
                )}

              </tr>;
        break;

      case 'white':
        return <tr className="scoreheaderwhite">
                <td className="names">WHITE</td>

                {this.getHoles().map(hole =>
                  <td className="hole">{hole.get('whitedistance')}</td>
                )}

              </tr>;
        break;

      case 'red':
        return <tr className="scoreheaderred">
                <td className="names">RED</td>

                {this.getHoles().map(hole =>
                  <td className="hole">{hole.get('reddistance')}</td>
                )}

              </tr>;
        break;

      case 'par':
        return <tr className="scoreheaderpar">
                <td className="names">PAR</td>

                {this.getHoles().map(hole =>
                  <td className="hole">{hole.get('par')}</td>
                )}

              </tr>;
        break;

      default:
        return <tr></tr>;
    }

  }
});

function mapStateToProps(state) {
  return {
    holes: state.get('holes')
  };
}

export const ScoreCardHeaderContainer = connect(
  mapStateToProps,
  actionCreators
)(ScoreHeader);
