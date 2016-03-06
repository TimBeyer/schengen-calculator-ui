/* @flow */
import React, { PropTypes } from 'react';
import 'react-daterange-picker/dist/css/react-calendar.css';
import moment from 'moment-range';
import DateRangePicker from 'react-daterange-picker';


const DatePicker = React.createClass({
  getInitialState() {
    return {
      value: null
    };
  },
  onSelect(range, states) {
    // range is a moment-range object
    this.props.setValue(range);
  },

  render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.props.deleteRange}>Delete</button>
        <DateRangePicker
          singleDateRange={true}
          firstOfWeek={1}
          numberOfCalendars={3}
          selectionType='range'
          showLegend={false}
          value={this.props.value || null}
          onSelect={this.onSelect} />
        </div>
    );
  },
});

export default DatePicker;
