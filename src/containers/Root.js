import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store);
        } else {
          window.devToolsExtension.open();
        }
      } else if (!window.devToolsExtension) {
        return;
        // const DevTools = require('containers/DevTools').default;
        // return <DevTools />;
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <CoreLayout>
            <HomeView />
          </CoreLayout>
          {this.devTools}
        </div>
      </Provider>
    );
  }
}
