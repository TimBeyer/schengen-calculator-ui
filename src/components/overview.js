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
  unavailable: {
    selectable: false,
    color: '#78818b',
    label: 'Previous stays',
  },
};

const Overview = React.createClass({
  getInitialState() {
    return {
      value: null
    };
  },
  onSelect(range, states) {

  },

  render() {
    const sortedRanges = _.sortBy(_.filter(this.props.otherRanges, _.isObject), (range) => {
      return range.start;
    });
    let dateRanges = _.map(sortedRanges, (range) => {
      return {
        state: 'unavailable',
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
              numberOfCalendars={3}
              selectionType='single'
              selectedLabel='This stay'
              showLegend={true}
              fullDayStates={true}
              stateDefinitions={stateDefinitions}
              dateStates={dateRanges}
              value={this.props.value || null}
              onSelect={this.onSelect} />
          </div>
        </div>
      </div>
    );
  },
});

export default Overview;
