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
    color: '#cccccc',
    label: 'Previous stays',
  },
};

const DatePicker = React.createClass({
  getInitialState() {
    return {
      value: null
    };
  },
  onSelect(range, states) {
    // range is a moment-range object
    this.props.setValue(range);
    setTimeout(function () {
      this.props.hideCalendar();
    }.bind(this), 500)
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
      <div className="row">
        <div className="col-xs-12">
          <div className="center-block">
            <DateRangePicker
              singleDateRange={true}
              firstOfWeek={1}
              numberOfCalendars={3}
              selectionType='range'
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

export default DatePicker;
