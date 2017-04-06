import React, { Component } from 'react';
import * as actions from '../lib/actions';
import flags from "../lib/flags";

export default class AlbumsContainer extends Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    let props = this.props;
    let storeAlbums = props.storeAlbums;
    return (
      <div className={props.className}>
        <HeadContainer className="head" nameArtist="Результат Поиска" />
        <listAlbum className="listAlbum"/>
      </div>
    );
  }
}
//Проверить с маленькой буквы
function HeadContainer(props) {//функция - т.к. нчиего сложного не делает
  //props.countAlbums - это не count, а ralese-group
  return(
    <div className={props.className}>
      <div className="name">{props.nameArtist}</div>
      <div className="countAlbums">
        <span>count of all albums</span>
        <span className="value">{props.countAlbums}</span>
      </div>
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
    return (
      <div className={props.className}>
        <Album/>
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
    let data = "";
    return (
      <div className="album">
        <BasicInformation />
        <AlbumDetals />
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
    return (
      <div className="basic-information">
        <div className="name-album">{props.name}</div>
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
    return (
      <div className="detals">
        
      </div>
    );
  }
}