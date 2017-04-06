import React, { Component } from 'react';
import * as actions from '../lib/actions';
import flags from "../lib/flags";

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput(e) {
    this.value=e.target.value;
  }

  handleClick(e) {
    this.props.queryAlbums();
  }

  render() {

    return (
      <div className="search-field">
        <div className="search-input">
          <input onChange={this.handleInput} placeholder="Введите название"/>
        </div>
        <div className="button-search" onClick={this.handleClick}></div>
        
      </div>
    );
  }
}