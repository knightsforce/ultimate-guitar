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
				alert(1)
			},//отрисовка загрузки
			complete: (data)=>{
				//dispatch(flags.albums.getComplete);
			},//Убрать отрисовку загрузки
			success: (data)=>{
				dispatch(albumsAction(flags.albums.getSucc, data));
				alert(2)
			},//Пробросить данные
			error: ()=>{
				dispatch(albumsAction(flags.albums.getErr, {}));
				alert(3)
			},//выдать ошибку

			cache: false,
			headers: {"Content-Type": "application/json"},
		});
		/*new Promise((resolve, reject) => {



		}).then(result=>{
		
		}).catch(err=>{

		});*/
	}
}
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
				data: data,
				}
			};
}


export {queryAlbums};

//------------------Рабочие функции

function createQuery(text) {
	return `http://musicbrainz.org/ws/2/release-group/?query=${text}&fmt=json`;
}

/*function parseData(jsonObj) {
	let list=jsonObj["release-groups"].map((item, i)=>{
		return {
			id: item.id,
			title: item.title,
		}
	});


	var obj = {
		count: jsonObj.count,
		list: list,
		artist: {

		}
	}
	return obj;
}*/
