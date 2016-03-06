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

const DatePicker = React.createClass({
  getInitialState() {
    return {
      value: null,
      showCalendar: true
    };
  },
  onSelect(range, states) {
    // range is a moment-range object
    this.props.setValue(range);
  },

  onToggleCalendar () {
    this.setState({
      showCalendar: !this.state.showCalendar
    });

    return false;
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

    const start = this.props.value ? this.props.value.start.format('DD.MM.YYYY') : '';
    const end = this.props.value ? this.props.value.end.format('DD.MM.YYYY') : '';

    return (
      <div>
        <div className="row">
          <form className="form-inline">
            <div className="form-group">
              <input type="text" className="form-control" value={start} readOnly disabled/>
              <input type="text" className="form-control" value={end} readOnly disabled />
            </div>
            <div className="btn-group" role="group">
              <a className="btn btn-primary" onClick={this.onToggleCalendar}>
                <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                <span> Toggle Calendar</span>
              </a>
              <a className="btn btn-default" onClick={this.props.deleteRange}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </a>
            </div>
          </form>
        </div>
        { this.state.showCalendar ? <DateRangePicker
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
          onSelect={this.onSelect} /> : '' }

      </div>
    );
  },
});

export default DatePicker;
