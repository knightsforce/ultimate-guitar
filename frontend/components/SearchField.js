import React, { Component } from 'react';
import * as actions from '../lib/actions';
import flags from "../lib/flags";

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleCut = this.handleCut.bind(this);
  }

  handleInput(e) {
    this.value=e.target.value;
    if(e.key=="Enter") {
      this.props.queryAlbums(this.value);
    }
  }

  handlePaste(e) {
    this.value=e.clipboardData.getData('Text');
  }

  handleCut(e) {
    this.value=e.clipboardData.getData('Text');
  }

  handleClick(e) {
    this.props.queryAlbums(this.value);
  }

  render() {

    return (
      <div className="search-field" style={this.props.style || null}>
        <div className="search-input">
          <input
            onKeyPress={this.handleInput}
            onPaste={this.handlePaste}
            onCut={this.handleCut}
            placeholder="Введите название"
          />
        </div>
        <div className="button-search" onClick={this.handleClick}></div>
      </div>
    );
  }
}