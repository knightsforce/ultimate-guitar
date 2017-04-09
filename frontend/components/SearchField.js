import React, { Component } from 'react';
import * as actions from '../lib/actions';
import flags from "../lib/flags";

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handleInput = this.handleInput.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.value="";
  }

  handleInput(e) {
    this.value=e.target.value.trim();
  }

  handlePress(e) {
    if(e.key=="Enter") {
      this.props.queryAlbums(this.value);
    }
    console.log(this.value)
  }

  handleClick(e) {
    this.props.queryAlbums(this.value);
  }

  render() {
    let props = this.props;
    return (
      <div className="search-field" style={props.style || null}>
        <div className="search-input">
          <input
            onInput={this.handleInput}
            onKeyPress={this.handlePress}
            placeholder={props.placeholder || null}
          />
        </div>
        <div className="button-search" onClick={this.handleClick}></div>
      </div>
    );
  }
}