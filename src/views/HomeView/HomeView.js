/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setValue, addRange, deleteRange } from '../../redux/modules/ranges';
import { showCalendar, hideCalendar, setReferencePoint } from '../../redux/modules/uiState';
import classes from './HomeView.scss';
import Range from '../../components/range';
import Overview from '../../components/overview';
import _ from 'lodash';
import schengen from 'schengen-calculator';
import moment from 'moment';

class HomeView extends React.Component {
  static propTypes = {
    ranges: PropTypes.object.isRequired,
    addRange: PropTypes.func.isRequired,
    deleteRange: PropTypes.func.isRequired,
    hideCalendar: PropTypes.func.isRequired,
    showCalendar: PropTypes.func.isRequired
  };

  range (range, id) {
    const setValue = this.props.setValue.bind(null, id);
    const deleteRange = this.props.deleteRange.bind(null, id);
    const rangesWithoutThis = _.omitBy(this.props.ranges, (range, rangeId) => rangeId === id || range === null);
    const otherRanges = _.values(rangesWithoutThis);

    const showCalendar = this.props.showCalendar.bind(null, id);
    const hideCalendar = this.props.hideCalendar.bind(null, id);

    const uiState = this.props.uiState.ranges[id];

    return (<Range
      key={id}
      rangeId={id}
      value={range}
      otherRanges={otherRanges}
      setValue={setValue}
      deleteRange={deleteRange}
      showCalendar={showCalendar}
      hideCalendar={hideCalendar}
      uiState={uiState}
    />);
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <div className='row'>
          <div className="col-xs-12">
            <div className="page-header">
              <h1>Calculate your schengen area stay</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-12 panel-title">
                    Enter your dates
                    <button className='btn btn-success btn-xs pull-right' onClick={this.props.addRange}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Stay
                    </button>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                {_.map(this.props.ranges, this.range.bind(this))}

              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-12 panel-title">
                    Overview <small>[{this.props.dayCount} days in period, {this.props.remainingDays} remaining]</small>
                  </div>
                </div>
              </div>
              <div className="panel-body">
              <Overview
                otherRanges={this.props.ranges}
                uiState={this.props.uiState}
                setReferencePoint={this.props.setReferencePoint}
                value={this.props.uiState.referencePoint}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const ranges = state.get('ranges').toJS();

  const uiState = state.get('uiState').toJS();
  const days = schengen(180, uiState.referencePoint, _.filter(_.values(ranges), _.isObject));
  const dayCount = days.reduce((sum, count) => sum + count, 0);
  const remainingDays = 90 - dayCount;

  console.log(days, dayCount, remainingDays);
  return {
    ranges,
    uiState,
    dayCount,
    remainingDays
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setValue,
    addRange,
    deleteRange,
    showCalendar,
    hideCalendar,
    setReferencePoint
  }, dispatch)
}

let idCounter = 0;
function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    ranges: stateProps.ranges,
    uiState: stateProps.uiState,
    dayCount: stateProps.dayCount,
    remainingDays: stateProps.remainingDays,
    addRange: () => {
      dispatchProps.addRange(`range-${idCounter++}`);
    },
    setValue: (id, newValue) => dispatchProps.setValue(id, newValue),
    deleteRange: (id) => dispatchProps.deleteRange(id),
    showCalendar: (id) => dispatchProps.showCalendar(id),
    hideCalendar: (id) => dispatchProps.hideCalendar(id),
    setReferencePoint: (value) => dispatchProps.setReferencePoint(value)
  })
}

export default HomeView = connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeView);
