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
    if(e.key=="Enter" && this.value.length) {
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
    if(!this.value.length) return;
    this.props.queryAlbums(this.value);
  }

  render() {
    let props = this.props;
    return (
      <div className="search-field" style={props.style || null}>
        <div className="search-input">
          <input
            onKeyPress={this.handleInput}
            onPaste={this.handlePaste}
            onCut={this.handleCut}
            placeholder={props.placeholder || null}
          />
        </div>
        <div className="button-search" onClick={this.handleClick}></div>
      </div>
    );
  }
}