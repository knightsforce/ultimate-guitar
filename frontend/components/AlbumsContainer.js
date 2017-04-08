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

        let albums = storeAlbums.list.map((item, i)=>{
          return (<Album key={item.id} data={item}/>)
        });
        visibleElements.push(
          <HeadContainer
            className="head"
            count={storeAlbums.list.length}
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
        <SearchField style={styleSearch} queryAlbums={props.queryOneAlbum}/>
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
  
    this.handleVisible = this.handleVisible.bind(this);
    this.state={
      visibleDetails: false,
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

  render() {
    let props = this.props;
    let data = props.data;
    let isVisible = this.state.visibleDetails;
    return (
      <div className="album">
        <BasicInformation data={{title: data.title}} clickDetailsButton={this.handleVisible} isVisible={isVisible}/>
        <AlbumDetails data={data} isVisible={isVisible} />
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
          <button type="button" className="show-details" 
              onClick={props.clickDetailsButton}
              style={style}
          />
          <button type="button" className="add-album"/>
          <button type="button" className="delete-album"/>
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