import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from './logic/store';
import Routes from './Routes';

export default class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      store: null,
      persistor: null,
      isLoading: true,
    };
  }

  componentWillMount(){
    const {store, persistor} = configureStore(() => {this.setState({isLoading: false});});
    this.setState({store, persistor});
  }

  render() {
    if(this.state.isLoading){
      return null;
    }

    return (
      <Provider store={this.state.store} persistor={this.state.persistor}>
        <Routes/>
      </Provider>
    );
  }
}
