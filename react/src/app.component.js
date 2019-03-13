import React from 'react';
import { Provider } from 'react-redux';
import reactLogo from '../assets/images/react-logo.png'
import Regards from './regards'
import '../assets/style/app.scss'
import '../assets/style/app.less'

export default class App extends React.Component {

  state = {
    store: this.props.store,
    globalEventDistributor: this.props.globalEventDistributor,
  };

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    let mainView = <div className="App">
    </div>;

    if (this.state && this.state.store && this.state.globalEventDistributor) {
      mainView =
        <Provider store={this.state.store}>
          <div>
            <img src={reactLogo} className="App-logo" style={{ width: 100 }} />
            <div className="angular-backbground border-gray">
              <br />
              <label>This is React application running on "localhost:9009"</label>
            </div>
            <Regards globalEventDistributor={this.state.globalEventDistributor} />
          </div>
        </Provider>
    }

    return mainView;
  }
}

