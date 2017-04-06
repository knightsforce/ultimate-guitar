import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import rootReducer from '../lib/reducers';
import * as actions from '../lib/actions';
import flags from "../lib/flags";
import thunk from 'redux-thunk';
//alert(actions.getAlbum);
//import './App.css';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="App">
      
      </div>
    );
  }
}





function mapStateToProps(state) {
	return {store: state};
}

function mapDispatchToProps(dispatch) {
	return {
		getAlbums: ()=>{dispatch(actions.queryAlbums())},
	};
}

//----------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};