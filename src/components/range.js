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

    return (
      <div>
        <div className="row">
          <div className="col-xs-8">
            <form className="form-inline">
              <div className="form-group">
                <div className="input-group">
                  <input type="text" className="form-control" value={start} placeholder="Start" readOnly />
                  <div className="input-group-addon">-</div>
                  <input type="text" className="form-control" value={end} placeholder="End" readOnly />
                </div>
              </div>
            </form>
          </div>
          <div className="col-xs-4">
          <form className="form-inline pull-right">
            <div className="form-group">
              <div className="btn-group btn-group-justified" role="group">
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
            </div>
          </form>
          </div>
        </div>

        { this.props.uiState.showCalendar ? <div className="center-block"><DateRangePicker
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
          onSelect={this.onSelect} /></div> : '' }

      </div>
    );
  },
});

export default DatePicker;
