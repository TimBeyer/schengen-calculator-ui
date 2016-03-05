/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setRange, deleteRange } from '../../redux/modules/dates';
import classes from './HomeView.scss';
import Range from '../../components/range';
import _ from 'lodash';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class HomeView extends React.Component {
  static propTypes = {
    dates: PropTypes.object.isRequired,
    addRange: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <h1>Calculate your schengen area stay</h1>
        {_.map(this.props.dates, (range, id) => <Range
          key={id}
          rangeId={id}
          value={range}
          setRange={this.props.setRange.bind(null, id)}
          deleteRange={this.props.deleteRange.bind(null, id)}
        />)}
        <h2>
        </h2>
        <button className='btn btn-default' onClick={this.props.addRange}>
          Add Range
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dates: state.get('dates').toJS()
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setRange,
    deleteRange
  }, dispatch)
}

let idCounter = 0;
function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    dates: stateProps.dates,
    addRange: () => dispatchProps.setRange(`range-${idCounter++}`, []),
    setRange: (id, newRange) => dispatchProps.setRange(id, newRange),
    deleteRange: (id) => dispatchProps.deleteRange(id)
  })
}
export default HomeView = connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeView);
