/* @flow */
import React, { PropTypes } from 'react';

const Entry = React.createClass({
  getInitialState() {
    return {
      value: null
    };
  },

  onToggleCalendar () {
    if (this.props.uiState.showCalendar) {
      this.props.hideCalendar();
    } else {
      this.props.showCalendar();
    }
  },

  render() {
    const start = this.props.value ? this.props.value.start.format('DD.MM.YYYY') : '';
    const end = this.props.value ? this.props.value.end.format('DD.MM.YYYY') : '';

    return (
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
    );
  },
});

export default Entry;
