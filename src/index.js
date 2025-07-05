import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { createStore } from "redux";
import App from './components/app';
// import Dialog from './components/dialog';
// import TaskPane from './components/taskpane';
// import TaskpaneTableAutoFill from './components/taskpaneTableAutoFill';
// import rootReducer from './reducers';
import PluginMain from './components/pluginMain';

// const store = createStore(rootReducer, window.STATE_FROM_SERVER);

ReactDOM.render((
  // <Provider store={store}>
  <HashRouter>
    <Switch>
      <Route path="/" exact component={App} />
      {/* <Route path="/dialog" exact component={Dialog} />
        <Route path="/taskpane" exact component={TaskPane} /> */}
      <Route path="/taskpaneTableAutoFill" exact component={PluginMain} />
    </Switch>
  </HashRouter>
  // </Provider>
), document.getElementById("root")
);
