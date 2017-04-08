import flags, {statuses} from "../lib/flags";

let groups = {
	metallica: "metallica",
}
let nameGroup = groups.nirvana;



function queryAlbums(text) {

	return (dispatch)=>{
		$.ajax(createQuery(text), {
			crossDomain: true,
			beforeSend: ()=>{
				dispatch(albumsAction(flags.albums.getInit, {}));
			},//отрисовка загрузки
			complete: (data)=>{
				//dispatch(flags.albums.getComplete);
			},//Убрать отрисовку загрузки
			success: (data)=>{
				dispatch(albumsAction(flags.albums.getSucc, parseResponse(data, "m")));
			},//Пробросить данные
			error: ()=>{
				dispatch(albumsAction(flags.albums.getErr, {}));
			},//выдать ошибку

			cache: false,
		});
		/*new Promise((resolve, reject) => {



		}).then(result=>{
		
		}).catch(err=>{

		});*/
	}
}

export {queryAlbums};

function queryOneAlbum(text) {
alert(text)
	return (dispatch)=>{
		$.ajax(`http://musicbrainz.org/ws/2/release-group/${text}?inc=artist-credits&fmt=json`, {
			crossDomain: true,
			success: (data)=>{
				console.log("-------------------", data);
				dispatch(oneAlbumsAction(flags.albums.add, parseResponse(data, "o")));
			},//Пробросить данные
			error: ()=>{
				//dispatch(albumsAction(flags.albums.getErr, {}));
			},//выдать ошибку

			cache: false,
		});
	}
}

export {queryOneAlbum}

function albumsAction(flag, data) {
	let status = null;
	switch(flag) {
		case flags.albums.getInit:
			status = statuses.load;
			break;
		case flags.albums.getSucc:
			status = statuses.succ;
			break;
		case flags.albums.getErr:
			status = statuses.err;
			break;
	}
	return {
			type: flag,
			payload: {
				status: status, 
				list: data,
				}
		};
}

function oneAlbumsAction(flag, data) {

	switch(flag) {
		case flags.albums.add:
			break;
	}

	return {
			type: flag,
			payload: data
		};
}

//------------------Рабочие функции

function createQuery(text) {
	return `http://musicbrainz.org/ws/2/release-group/?query=${text}&fmt=json`;
	
}

function parseResponse(jsonObj, flag) {
	flag=flag.toLowerCase();
	let obj = {};

	switch(flag) {
		case "m":
			obj = parseAlbums(jsonObj);
			break;
		case "o":
			obj = parseOneAlbum(jsonObj);
			break;
	}

	return obj;
}

function parseAlbums(data) {
	return data["release-groups"].map((item, i)=>{
		return parseOneAlbum(item);
    });
}
//c9fdb94c-4975-4ed6-a96f-ef6d80bb7738
function parseOneAlbum(data) {

	let postfix = (data["artist-credit"].length>1) ? "; " : "";
	let artists = data["artist-credit"].map((item)=>{
		return item.artist.name;
	}).join(postfix);

    return {
       	id: data.id,
		artist: artists,
		title: data.title
    }
}