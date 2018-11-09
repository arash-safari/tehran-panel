import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {grey} from "@material-ui/core/colors/index";
import {getRandomColor} from "./Color";
import DeleteIcon from "@material-ui/icons/Delete";
import {IconButton} from "@material-ui/core";

class BaseComponent extends Component {
  state ={
    style:{border:"1px solid "+grey[400],display:"inline-block",float:'left',backgroundColor:this.props.bcolor,position:"relative"}
  };
  onMouseOut=()=>{
    this.setState({style:{border:"1px solid "+grey[400],display:"inline-block",float:'left',backgroundColor:this.props.bcolor,position:"relative"}});
  };
  onMouseOver=()=>{
    this.setState({style:{backgroundColor:this.props.bcolor, opacity: 0.8,border:"1px solid #3b5998 ",display:"inline-block",float:'left',position:"relative"}});
  };
  render() {
    return (
      <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={this.state.style} >
        {this.props.children}
      </div>
    );
  }
}

BaseComponent.propTypes = {};

export default BaseComponent;
