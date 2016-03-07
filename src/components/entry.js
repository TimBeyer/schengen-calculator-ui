/* @flow */
import React, { PropTypes } from 'react';

const Entry = React.createClass({
  getInitialState() {
    return {
      value: null
    };
  },

  onEditMode () {
    this.props.editMode()
  },

  render() {
    const start = this.props.value ? this.props.value.start.format('DD.MM.YYYY') : '';
    const end = this.props.value ? this.props.value.end.format('DD.MM.YYYY') : '';

    return (
      <div className="row">
        <div className="col-xs-8">
          <span>{start} - {end}</span>
        </div>
        <div className="col-xs-4">
        <form className="form-inline pull-right">
          <div className="form-group">
            <div className="btn-group" role="group">
              <a className="btn btn-default btn-xs" onClick={this.onEditMode}>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </a>
              <a className="btn btn-default btn-xs" onClick={this.props.deleteRange}>
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
