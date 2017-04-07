import { combineReducers } from 'redux';
import flags from "./flags";

/*
const flags = {
	albums: {
		getInit: "GET_INIT",
		//getComplete: "GET_COMPLETE",
		getSucc: "GET_SUCCESSFUL",
		getErr: "GET_ERROR",

		create: "CREATE_ALBUM",
		createSucc: "CREATED_ALBUM",
		createErr: "CREATED_ERROR",

		save: "SAVE_ALBUM",
		saveSucc: "SAVE_ALBUM_COMPLITE",
		saveErr: "SAVE_ALBUM_ERROR",
	}
};
*/

function albums(state={}, action) {
	switch(action.type) {
		case flags.albums.getInit:

		case flags.albums.getSucc:
			
		case flags.albums.getErr:

		console.log("-------", action.payload)
			return Object.assign({}, action.payload, state);

		default:
			return state;
	}
}

let rootReducer = combineReducers({
	albums,
});

export default rootReducer;