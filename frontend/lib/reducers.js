import { combineReducers } from 'redux';
import flags from "./flags";

/*
const flags = {
	albums: {
		get: "GET_ALBUM",
		getSus: "GET_SUCCESSFUL",
		getErr: "GET_ERROR",

		create: "CREATE_ALBUM",
		createSus: "CREATED_ALBUM",
		createErr: "CREATED_ERROR",

		save: "SAVE_ALBUM",
		saveSus: "SAVE_ALBUM_COMPLITE",
		saveErr: "SAVE_ALBUM_ERROR",
	}
};
*/

function albums(state={}, action) {
	switch(action) {
		case flags.albums.get:
			
			break;
		default:
			return state;
	}
}

let rootReducer = combineReducers({
	albums,
});

export default rootReducer;