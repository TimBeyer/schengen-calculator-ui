/* @flow */
import React, { PropTypes } from 'react';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import Picker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';

const formatter = new GregorianCalendarFormat('dd-MM-yyyy');

function isValidRange(v) {
  return v && v[0] && v[1];
}

function format(v) {
  return v ? formatter.format(v) : '';
}

const Range = React.createClass({
  getInitialState() {
    return {
      disabled: false
    };
  },

  onChange(value) {
    this.props.setRange(value);
  },

  render() {
    const state = this.state;
    const calendar = (
      <RangeCalendar
        showWeekNumber={true}
        showOk={true}
      />
    );
    return (

      <Picker
      value={this.props.value}
      onChange={this.onChange}
      animation="slide-up"
      calendar={calendar}
    >
      {
        ({ value }) => {
          return (
            <form className="form-inline">
              <div className="form-group">
                <div className="input-group">
                  <input
                    style={{ width: 200 }}
                    disabled={state.disabled}
                    className="form-control"
                    value={`${format(value[0])} - ${format(value[1])}`}
                  />
                  <a className="btn btn-danger input-group-addon" onClick={this.props.deleteRange}>X</a>
                </div>
              </div>
            </form>);
        }
      }
    </Picker>

    );
  },
});

export default Range;
