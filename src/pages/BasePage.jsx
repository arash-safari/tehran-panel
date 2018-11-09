import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SideBarSection from "../module/SideBarSection";

class BasePage extends Component {
  state={
    sidebarWidth:50,
  };
  onExitMenu =()=>{

  };

  render() {
    return (
      <div>
        <div style={{width: this.state.sidebarWidth + "px"}}>
          <SideBarSection onExitMenu={this.onExitMenu} pathname="localhost:3000" />
        </div>
        <div className="page-body" style={{marginLeft:50}}>
          {this.getBodyPage()}
        </div>
      </div>
    );
  }
  getBodyPage=()=> {

  }
}

BasePage.propTypes = {};

export default BasePage;
