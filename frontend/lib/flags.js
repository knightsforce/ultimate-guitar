const flags = {
	albums: {
		getInit: "GET_INIT",
		getSucc: "GET_SUCCESSFUL",
		getErr: "GET_ERROR",

		add: "ADD_ALBUM",
		del: "DELETE_ALBUM",
		delAll: "DELETE_ALL_ALBUM",

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