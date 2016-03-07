/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setValue, addRange, deleteRange } from '../../redux/modules/ranges';
import { showCalendar, hideCalendar, setReferencePoint, editMode, overviewMode, MODE_EDIT, MODE_OVERVIEW } from '../../redux/modules/uiState';
import classes from './HomeView.scss';
import Range from '../../components/range';
import Entry from '../../components/entry';
import Overview from '../../components/overview';
import _ from 'lodash';
import schengen from 'schengen-calculator';
import moment from 'moment';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const Undo = ({ canUndo, onUndo }) => (
  (canUndo ? (
    <a className="btn btn-default btn-xs" onClick={onUndo} disabled={!canUndo}>
      Undo
    </a>
  ) : (
    <span style={{display: 'none'}}></span>
  ))
)

const Redo = ({ canRedo, onRedo }) => (
  (canRedo ? (
    <a className="btn btn-default btn-xs" onClick={onRedo} disabled={!canRedo}>
    Redo
    </a>
  ) : (
    <span style={{display: 'none'}}></span>
  ))
)

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
      key={"range-" + id}
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

  entry (range, id) {
    const deleteRange = this.props.deleteRange.bind(null, id);
    const showCalendar = this.props.editMode.bind(null, id);
    const hideCalendar = this.props.overviewMode.bind(null, id);

    const uiState = this.props.uiState.ranges[id];

    return (<Entry
      key={"entry-" + id}
      rangeId={id}
      value={range}
      deleteRange={deleteRange}
      showCalendar={showCalendar}
      hideCalendar={hideCalendar}
      uiState={uiState}
    />);
  }

  editPanel (range, id) {
    return (<div className="panel panel-default">
      <div className="panel-heading">
        <div className="row">
          <div className="col-xs-12 panel-title">
            Edit Stay
            <div className="btn-group pull-right">
              <Undo
              canUndo={this.props.canUndo}
              onUndo={this.props.undo} />
              <Redo
              canRedo={this.props.canRedo}
              onRedo={this.props.redo} />
              <button className='btn btn-success btn-xs' onClick={this.props.overviewMode}>
                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-body">
        { this.range(range, id) }
      </div>
    </div>)
  }

  overviewPanel () {
    return (<div className="panel panel-default">
      <div className="panel-heading">
        <div className="row">
          <div className="col-xs-12 panel-title">
            Enter your dates
            <div className="btn-group pull-right">
              <Undo
              canUndo={this.props.canUndo}
              onUndo={this.props.undo} />
              <Redo
              canRedo={this.props.canRedo}
              onRedo={this.props.redo} />
              <button className='btn btn-success btn-xs' onClick={this.props.addRange}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Stay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-body">
        {_.map(this.props.ranges, (range, id) => {
          return (
            this.entry(range, id)
          )
        })}
      </div>
    </div>)
  }
  render () {
    const isEditMode = this.props.uiState.mode === MODE_EDIT;
    const editId = this.props.uiState.editId;

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
            { isEditMode ? (
              this.editPanel(this.props.ranges[editId], editId)
            ) : (
              this.overviewPanel()
            )}
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
  const ranges = state.get('ranges');

  const uiState = state.get('uiState').toJS();
  const days = schengen(180, uiState.referencePoint, _.filter(_.values(ranges.present.toJS()), _.isObject));
  const dayCount = days.reduce((sum, count) => sum + count, 0);
  const remainingDays = 90 - dayCount;

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
    setReferencePoint,
    undo: UndoActionCreators.undo,
    redo: UndoActionCreators.redo,
    editMode,
    overviewMode
  }, dispatch)
}

let idCounter = 0;
function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    canUndo: stateProps.ranges.past.length > 0,
    canRedo: stateProps.ranges.future.length > 0,
    undo: dispatchProps.undo,
    redo: dispatchProps.redo,
    ranges: stateProps.ranges.present.toJS(),
    uiState: stateProps.uiState,
    dayCount: stateProps.dayCount,
    remainingDays: stateProps.remainingDays,
    editMode: dispatchProps.editMode,
    overviewMode: dispatchProps.overviewMode,
    addRange: () => {
      const id = `range-${idCounter++}`;
      dispatchProps.addRange(id);
      dispatchProps.editMode(id);
    },
    setValue: (id, newValue) => dispatchProps.setValue(id, newValue),
    deleteRange: (id) => dispatchProps.deleteRange(id),
    showCalendar: (id) => dispatchProps.showCalendar(id),
    hideCalendar: (id) => dispatchProps.hideCalendar(id),
    setReferencePoint: (value) => dispatchProps.setReferencePoint(value)
  })
}

export default HomeView = connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeView);
