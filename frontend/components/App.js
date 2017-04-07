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
let initState = {
	albums: {
		status: "empty",
		data: {},
	},
}

const store = createStore(rootReducer, initState, applyMiddleware(thunk));

class App extends Component {

  render() {
	let props = this.props;
    return (
      <div className="App">
    	<SearchField queryAlbums={props.queryAlbums}/>
      	<AlbumsContainer className="albumsContainer" storeAlbums={this.props.store.albums}/>
      </div>
    );
  }
}





function mapStateToProps(state) {
	return {store: state};
}

function mapDispatchToProps(dispatch) {
	return {
		queryAlbums: (text)=>{dispatch(actions.queryAlbums(text))},
	};
}

//----------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};