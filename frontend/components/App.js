import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import rootReducer from '../lib/reducers';
import * as actions from '../lib/actions';
import flags from "../lib/flags";
import thunk from 'redux-thunk';
import AlbumsContainer from "./AlbumsContainer";
import SearchField from "./SearchField";
//alert(actions.getAlbum);
//import './App.css';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

class App extends Component {

  render() {
	let props = this.props;
    return (
      <div className="App">
      	<AlbumsContainer className="albumsContainer" storeAlbums={this.props.store.albums}/>
      	<SearchField queryAlbums={props.queryAlbums}/>
      </div>
    );
  }
}





function mapStateToProps(state) {
	return {store: state};
}

function mapDispatchToProps(dispatch) {
	return {
		queryAlbums: ()=>{dispatch(actions.queryAlbums())},
	};
}

//----------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};