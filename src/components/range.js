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

  onToggleCalendar () {
    if (this.props.uiState.showCalendar) {
      this.props.hideCalendar();
    } else {
      this.props.showCalendar();
    }
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

    console.log(this.props.uiState)
    return (
      <div>
        <div className="row">
          <form className="form-inline">
            <div className="form-group">
              <div className="input-group">
                <input type="text" style={{width: '100px'}} className="form-control" value={start} placeholder="Start" readOnly disabled/>
                <div className="input-group-addon">-</div>
                <input type="text" style={{width: '100px'}} className="form-control" value={end} placeholder="End" readOnly disabled />
              </div>
            </div>
            <div className="btn-group" role="group">
              <a className="btn btn-default" onClick={this.onToggleCalendar}>
              {
                this.props.uiState.showCalendar ? (
                  <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                ) : (
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                )
              }
              </a>
              <a className="btn btn-default" onClick={this.props.deleteRange}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </a>
            </div>
          </form>
        </div>
        { this.props.uiState.showCalendar ? <DateRangePicker
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
