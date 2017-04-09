import React, { Component } from 'react';
import * as actions from '../lib/actions';
import flags, {statuses} from "../lib/flags";
import SearchField from "./SearchField";

export default class AlbumsContainer extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let storeAlbums = props.storeAlbums;
    let visibleElements = [];
    switch(storeAlbums.status) {
      case statuses.load:
        visibleElements.push(<AlbumsLoading/>);
        break;

      case statuses.succ:
        let albums = [];
        let list = storeAlbums.list;

        for(let key in storeAlbums.list) {
          albums.push(<Album key={key} data={list[key]} handleDelete={props.queryOneAlbum}/>)
        }

        visibleElements.push(
          <HeadContainer
            className="head"
            count={Object.keys(storeAlbums.list).length}
            queryOneAlbum={props.queryOneAlbum}
          />,
          <listAlbum className="listAlbum" >{albums}</listAlbum>
        );
        break;

      case statuses.err:
        visibleElements.push(<ErrorLoading text="Ошибка загрузки"/>);
        break;

      default:
        
        break;
    }
    
    return (
      <div className={props.className}>
        {visibleElements}
      </div>
    );
  }
}



class HeadContainer extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handleVisible=this.handleVisible.bind(this);
    this.state={
      visibleSearch: false,
    };
  }

  handleVisible(e) {

    this.setState((prevState)=>{
      return {"visibleSearch": !prevState.visibleSearch};
    });
  }

  render() {

    let props = this.props;
    let count = props.count;
    let styleButton={
      transform: ((this.state.visibleSearch) ? "rotate(45deg)" : null)
    };
    let styleSearch = {
      display: ((this.state.visibleSearch) ? "flex" : "none")
    }
    return(
      <div className={props.className}>
        <div className="wrap">
          <div className="name">
            <span>{`Результаты поиска: ${props.count || 0}`}</span>
          </div>
          <button
              className="addAlbum"
              onClick={this.handleVisible}
              style={styleButton}
          ></button>
        </div>
        <SearchField
          style={styleSearch}
          queryAlbums={props.queryOneAlbum}
          placeholder='Введите id (для удаления: "del:id")'
        />
      </div>
    );
  }
}

class listAlbum extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
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
    this.id=props.data.id;

    this.handleVisible = this.handleVisible.bind(this);
    this.manageLocalStorage = this.manageLocalStorage.bind(this);
    this.deleteElement = this.deleteElement.bind(this);

    this.state={
      visibleDetails: false,
      saveInStorage: (this.id in window.localStorage),
    };
  }
 
  handleVisible(e) {
    /*
      Не использую здесь делегирование, т.к.
      проще обработать, производительность не упадет, т.к.
      React под капотом все обработчки соединяет в один используя  делегирование 
    */
    this.setState((prevState)=>{
      return {"visibleDetails": !prevState.visibleDetails};
    });
  }

  manageLocalStorage() {
    this.setState(
      (prevState)=>{   
          return {"saveInStorage": !prevState.saveInStorage};
      },
      ()=>{
        switch(this.state.saveInStorage) {
          case true:
            let value = JSON.stringify(this.props.data);
            window.localStorage.setItem(this.id, value);
            break;
          case false:
            window.localStorage.removeItem(this.id);
            break;
        }
      }
    );
  }

  deleteElement() {
    this.props.handleDelete(`del:${this.id}`);
  }

  render() {
    let props = this.props;
    let data = props.data;
    let isVisible = this.state.visibleDetails;
    let saveInStorage = this.state.saveInStorage;
    return (
      <div className="album">
        <BasicInformation
            data={{title: data.title}}
            clickDetailsButton={this.handleVisible}
            clickAdd={this.manageLocalStorage}
            clickDelete={this.deleteElement}
            isVisible={isVisible}
            saveInStorage={saveInStorage}
        />
        <AlbumDetails
            data={data}
            isVisible={isVisible}
        />
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
    let isVisible=props.isVisible;
    let style = {
      transform: ((isVisible) ? null : "rotate(90deg)")
    };
    return (
      <div className="basic-information">
        <div className="name-album">{data.title}</div>
        <div className="buttons-block">
          <button 
              type="button"
              className="show-details" 
              onClick={props.clickDetailsButton}
              style={style}
          />
          <button
              type="button"
              className={`add-album${((props.saveInStorage) ? " complete": "")}`}
              onClick={props.clickAdd}
          />
          <button
              type="button"
              className={"delete-album"}
              onClick={props.clickDelete}
          />
        </div>
      </div>
    );
  }
}

class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let data = props.data;
    let isVisible=props.isVisible;
    let style = {
      display: ((isVisible) ? "block" : "none")
    };

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
      <div className="detals" style={style}>
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

/*function parseData(data) {
  let postfix = (data["artist-credit"].length>1) ? "; " : "";
  let artists = data["artist-credit"].map((item)=>{
    return item.artist.name
  }).join(postfix);
  
  return {
    id: data.id,
    artist: artists,
    title: data.title
  }
}*/