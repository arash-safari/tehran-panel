import React, {Component} from 'react';
import {Link} from "react-router-dom";

class SideItem extends Component {
  state={
    sidebarItemHover:"",
    sidebarItemIconHover:"",
    sidebarItemTextHover:"",
    active:""
  };
  render() {
    this.state.active = this.props.active?"sidebar-item-active":"";
    return (
      <Link to={this.props.to} className={"sidebar-item " + this.state.sidebarItemHover + " " + this.state.active} onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave} >
        <i className={"material-icons sidebar-item-icon " +this.state.sidebarItemIconHover} >{this.props.icon}</i>
        {this.props.hover && <div className={"sidebar-item-text " + this.state.sidebarItemTextHover} >{this.props.text}</div>}
      </Link>
    );
  }
  handleMouseEnter = () => {
    this.setState({sidebarItemHover:"sidebar-item-hover"});
  };

  handleMouseLeave = () => {
    this.setState({sidebarItemHover:""});
  }

}


export default SideItem;
