import React, {Component} from 'react';
import SideItem from "./SideItem";
import TweenMax from 'gsap';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  sidebar:{
    backgroundColor:theme.palette.primary.main
  }
});
class SideBarSection extends Component {
  state={
    hover:false,
    mouse:"leave"
  };
  render() {
    const { classes } = this.props;
    const sidebaritems=[{to:"../create-page", icon:"add" ,text:"ساختن صفحه جدید"},
      {to:"../find" ,icon:"search" ,text:"جستجو"},
      {to:"../settings" ,icon:"settings" ,text:"تنظیمات"},
      {to:"../help", icon:"help" ,text:"راهنما"},
      {to:"../exit", icon:"exit_to_app" ,text:"خروج"}
    ];

    return (<div className={classes.sidebar+ " sidebar"} onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
        {sidebaritems.map(sidebaritem =>(<SideItem key={sidebaritem.to} hover={this.state.hover}
         to={sidebaritem.to} icon={sidebaritem.icon} text={sidebaritem.text}
          active={this.props.pathname===sidebaritem.to.substr(2)}/>))}
      </div>);
  }
  handleMouseEnter = ()=> {
    this.setState({mouse:"enter"});
    TweenMax.to(".sidebar", 0.1, {width: "200px"});
    window.setTimeout(()=>{if(this.state.mouse==="enter"){this.setState({hover:true})}}, 100);
  };

  handleMouseLeave = ()=>{
    this.setState({mouse:"leave"});
    this.setState({hover:false});
    TweenMax.to(".sidebar", 0.1, {width: "50px"});
  };
}

SideBarSection.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SideBarSection);
