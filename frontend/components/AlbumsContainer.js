import React, { Component } from 'react';
import * as actions from '../lib/actions';
import flags, {statuses} from "../lib/flags";

export default class AlbumsContainer extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let storeAlbums = props.storeAlbums;
    let visibleElements = null;
    switch(storeAlbums.status) {
      case statuses.load:
        visibleElements=[<AlbumsLoading/>];
        break;

      case statuses.succ:
        let albums = storeAlbums.data["release-groups"].map((item, i)=>{
          return (<Album key={item.id} data={item}/>)
        });
        visibleElements=[
          <HeadContainer className="head" nameArtist="Результаты по запросу" data={storeAlbums}/>,
          <listAlbum className="listAlbum" >{albums}</listAlbum>
        ];
        break;

      case statuses.err:
        visibleElements=[<ErrorLoading text="Ошибка загрузки"/>];
        break;

      default:
        visibleElements = [];
        break;
    }
    
    return (
      <div className={props.className}>
        {visibleElements}
      </div>
    );
  }
}
//Проверить с маленькой буквы
function HeadContainer(props) {//функция - т.к. нчиего сложного не делает
  //props.countAlbums - это не count, а ralese-group
  let data = props.data;
  return(
    <div className={props.className}>
      <div className="name"><span>{`Результат поиска: ${data.count || 0}`}</span></div>
    </div>
  );
}

class listAlbum extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let list = () => {

    }
    return (
      <div className={props.className}>
        {props.children}
      </div>
    );
  }
}

class Album extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let data = props.data;

    return (
      <div className="album">
        <BasicInformation data={{title: data.title}} />
        <AlbumDetals data={data}/>
      </div>
    );
  }
}

class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let data = props.data;
    return (
      <div className="basic-information">
        <div className="name-album">{data.title}</div>
        <div className="buttons-block">
          <button type="button" className="show-details"/>
          <button type="button" className="add-album"/>
          <button type="button" className="delete-album"/>
        </div>
      </div>
    );
  }
}

class AlbumDetals extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let data = parseData(props.data);//--point

    let fileds = [];
    
    for(let key in data) {
        fileds.push(
            <li>
              <span>
                {key+": "}
              </span>
              <span>
                {data[key]}
              </span>
            </li>
        );
    }

    return (
      <div className="detals">
        <ul>
          {fileds}
        </ul>
      </div>
    );
  }
}

class ErrorLoading extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    return (
      <div className="error-loading">
        <div className="text">{props.text}</div>        
      </div>
    );
  }
}

class AlbumsLoading extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    return (
      <div className="loading">
        <div className="sidebar"></div>
      </div>
    );
  }
}




//----------------------Рабочие функции

function parseData(data) {
  let postfix = (data["artist-credit"].length>1) ? "; " : "";
  let artists = data["artist-credit"].map((item)=>{
    return item.artist.name
  }).join(postfix);
  
  return {
    id: data.id,
    artist: artists,
    title: data.title
  }
}