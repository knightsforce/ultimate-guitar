const flags = {
	albums: {
		getInit: "GET_INIT",
		//getComplete: "GET_COMPLETE",
		getSucc: "GET_SUCCESSFUL",
		getErr: "GET_ERROR",

		add: "ADD_ALBUM",
		/*createSucc: "CREATED_ALBUM",
		createErr: "CREATED_ERROR",*/

		save: "SAVE_ALBUM",
		saveSucc: "SAVE_ALBUM_COMPLITE",
		saveErr: "SAVE_ALBUM_ERROR",
	}
};

const statuses = {
	load: "loading",
	succ: "success",
	err: "error",
}
export {statuses};
export default flags;