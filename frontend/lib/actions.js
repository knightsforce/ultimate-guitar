import flags, {statuses} from "../lib/flags";


/*
	Если пустое поле ввода и запрос - то все очищается список альбомов,
	работает только с главным поиском, второй input просто ничего не делает
*/
function queryAlbums(text) {
	return (dispatch)=>{
		
		if(!text.length) {
			dispatch(deleteAllAlbums(flags.albums.delAll));
			return;
		}
		
		text=text.trim();

		$.ajax(createQuery(text, "m"), {
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
		/*
			Промисы использовать не стал, т.к. и без них контролируется процесс
		*/
	}
}

export {queryAlbums};

function queryOneAlbum(text) {
	text=text.trim();
	return (dispatch)=>{
		
		if(!text.length) {
			return;
		} else if(text.indexOf("del:")==0) {
			text=text.replace(/(del:)(.)/ig, (str, p1, p2)=>{
				return p2;
			});
			dispatch(deleteAction(flags.albums.del, text));
			return;
		}

		$.ajax(createQuery(text, "o"), {
			crossDomain: true,
			success: (data)=>{
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

function deleteAction(flag, data) {
	return {
			type: flag,
			payload: data
		};
}

function deleteAllAlbums(flag) {
	return {
			type: flag,
		};
}

//------------------Рабочие функции

function createQuery(text, f) {//Создать нужный запрос, multi или one
	switch(f.toLowerCase()) {
		case "m":
			return `http://musicbrainz.org/ws/2/release-group/?query=${text}&fmt=json`;
			break;
		case "o":
			return `http://musicbrainz.org/ws/2/release-group/${text}?inc=artist-credits&fmt=json`
			break;
	}
}

function parseResponse(jsonObj, flag) {//Парсю ответ
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

function parseAlbums(data) {//Парсю много альбомов
	let obj = {};
	data["release-groups"].forEach((item, i)=>{
		obj[item.id]=parseOneAlbum(item);
    });
    return obj;
}

function parseOneAlbum(data) {//парсю один альбом

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