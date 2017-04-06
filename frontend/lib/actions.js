import flags from "../lib/flags";

let groups = {
	metallica: "metallica",
}
let nameGroup = groups.nirvana;
let query = `http://musicbrainz.org/ws/2/release-group/?query=${nameGroup}&fmt=json`;

function queryAlbums() {
	return (dispatch)=>{
		$.ajax(query, {
			type: "GET",
			beforeSend: ()=>{dispatch(flags.albums.getInit)},//отрисовка загрузки
			complete: (data)=>{dispatch(flags.albums.getComplete)},//Убрать отрисовку загрузки
			susses: (data)=>{
				alert(data);
				dispatch(flags.albums.getSus, data.responseText);
			},//Пробросить данные
			error: ()=>{dispatch(flags.albums.getErr)},//ыдать ошибку
			cache: false,
			headers: {"Content-Type": "application/json"},
		});
		/*new Promise((resolve, reject) => {



		}).then(result=>{
		
		}).catch(err=>{

		});*/
	}
}

function getAlbums(flag) {
/*
	{
		get: "",
		getSus: "",
		getErr: "",	
	}
*/
	return {type: flag, payload: "loading"};
	
}

function getSusAlbums(flag, data) {
	return {type: flag, payload: data};
}

function getErrAlbums(flag) {
	return {type: flag};
}

export {getAlbums, getSusAlbums};