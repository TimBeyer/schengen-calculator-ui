/* @flow */
import React, { PropTypes } from 'react';
import 'react-daterange-picker/dist/css/react-calendar.css';
import moment from 'moment-range';
import DateRangePicker from 'react-daterange-picker';
import _ from 'lodash';

const stateDefinitions = {
  __default: {
    label: 'This stay'
  },
  euDays: {
    color: '#cccccc',
    label: 'Time spent in EU',
  },
};

const Overview = React.createClass({
  getInitialState() {
    return {
      value: null
    };
  },
  onSelect(value, states) {
    this.props.setReferencePoint(value);
  },

  render() {
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
        <div className="row">
          <div className="col-xs-12">
            <DateRangePicker
              singleDateRange={true}
              firstOfWeek={1}
              numberOfCalendars={6}
              selectionType='single'
              selectedLabel='Reference Point'
              showLegend={true}
              fullDayStates={true}
              stateDefinitions={stateDefinitions}
              dateStates={dateRanges}
              value={this.props.value || null}
              onSelect={this.onSelect}/>
          </div>
        </div>
      </div>
    );
  },
});

export default Overview;
