/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setValue, addRange, deleteRange } from '../../redux/modules/ranges';
import classes from './HomeView.scss';
import Range from '../../components/range';
import _ from 'lodash';
import schengen from 'schengen-calculator';
import moment from 'moment';

class HomeView extends React.Component {
  static propTypes = {
    ranges: PropTypes.object.isRequired,
    addRange: PropTypes.func.isRequired
  };

  render () {
    console.log(this.props.ranges)
    return (
      <div className='container text-center'>
        <h1>Calculate your schengen area stay</h1>
        {_.map(this.props.ranges, (range, id) => <Range
          key={id}
          rangeId={id}
          value={range}
          setValue={this.props.setValue.bind(null, id)}
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
  const ranges = state.get('ranges').toJS();
  console.log(ranges);
  const days = schengen(180, moment(), _.filter(_.values(ranges), _.isObject));
  console.log(days);
  return {
    ranges
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setValue,
    addRange,
    deleteRange
  }, dispatch)
}

let idCounter = 0;
function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    ranges: stateProps.ranges,
    addRange: () => {
      dispatchProps.addRange(`range-${idCounter++}`);
    },
    setValue: (id, newValue) => dispatchProps.setValue(id, newValue),
    deleteRange: (id) => dispatchProps.deleteRange(id)
  })
}

export default HomeView = connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeView);
