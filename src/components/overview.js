/* @flow */
import React, { PropTypes } from 'react';
import 'react-daterange-picker/dist/css/react-calendar.css';
import DateRangePicker from 'react-daterange-picker';
import _ from 'lodash';

const stateDefinitions = {
  __default: {
    label: 'This stay'
  },
  euDays: {
    color: '#cccccc',
    label: 'Time spent in EU'
  }
};

class Overview extends React.Component {

  static propTypes = {
    otherRanges: PropTypes.object.isRequired,
    setReferencePoint: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  };

  state = {
    value: null
  };

  onSelect = (value, states) => {
    this.props.setReferencePoint(value);
  }

  render = () => {
    const sortedRanges = _.sortBy(_.filter(this.props.otherRanges, _.isObject), (range) => {
      return range.start;
    });
    let dateRanges = _.map(sortedRanges, (range) => {
      return {
        state: 'euDays',
        range: range
      };
    });

    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <DateRangePicker
              singleDateRange
              firstOfWeek={1}
              numberOfCalendars={6}
              selectionType='single'
              selectedLabel='Reference Point'
              showLegend
              fullDayStates
              stateDefinitions={stateDefinitions}
              dateStates={dateRanges}
              value={this.props.value || null}
              onSelect={this.onSelect}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Overview;
