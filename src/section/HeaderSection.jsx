import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import AddIconButton from "../module/AddIconButton";
import {Paper, Grid, Button} from "@material-ui/core";
import {changeSiteContent} from './../actions/ModuleAction'
import {connect} from 'react-redux';
import {Image} from "react-bootstrap";
import Tooltip from '@material-ui/core/Tooltip';

import {getRandomColor} from "../module/Color";

const styles = theme => ({
  root: {
    width: 'calc(100% - 20px)',
      marginRight:20,
    height: "80px !important",
  },
  grow: {
    flexGrow: 1,
  },
  tooltip:{
    fontSize:14,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    }, appbar: {}, toolbar: {
      height: 80,
    }
  }, button: {
    marginTop: 20,
  }

});

class HeaderSection extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }
  addPart = () => {
    this.addToSiteContent({type: "PartModule"});
  };
  addOneSection = () => {
    this.addToSiteContent({type: "OneSectionModule"});
  };
  addPeople = () => {
    this.addToSiteContent({type: "PeopleModule"});
  };
  addPost = () => {
    this.addToSiteContent({type: "PostModule"});
  };
  addTwoSectionBig = () => {
    this.addToSiteContent({type: "TwoSectionBigModule"});
  };
  addTwoSection = () => {
    this.addToSiteContent({type: "TwoSectionModule"});
  };

  addToSiteContent = (params) => {
    const siteContent = this.props.siteContent.all;
    siteContent.En.push(params);
    siteContent.Fa.push(params);
    siteContent.bcolor.push(getRandomColor());
    this.props.changeSiteContent(siteContent);
  };
  saveData = ()=>{
    this.props.onSaveData();
  };

  render() {
    const {anchorEl, mobileMoreAnchorEl} = this.state;
    const {classes} = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const sectionIcon = <Image src="/icons/section.svg" style={{width: 60, height: 60, margin: "10px 20px"}}
                               responsive></Image>;
    const postIcon = <Image src="/icons/post.svg" style={{width: 60, height: 60, margin: "10px 0px 10px 20px"}}
                            responsive/>;
    const profileIcon = <Image src="/icons/profile.svg" style={{width: 60, height: 60, margin: "10px 20px"}}
                               responsive/>;
    const oneElementIcon = <Image src="/icons/One_element.svg" style={{width: 60, height: 60, margin: "10px 20px"}}
                                  responsive/>;
    const twoElementIcon = <Image src="/icons/Two_element.svg" style={{width: 60, height: 60, margin: "10px 20px"}}
                                  responsive/>;
    const twoElementBigIcon = <Image src="/icons/Two_element_big.svg"
                                     style={{width: 60, height: 60, margin: "10px 20px"}} responsive/>;
    return (
      <Paper className="header">
        <Grid container>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.saveData}>
              ذخیره سازی
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Tooltip title="new part"  placement="right" classes={{ tooltip: classes.tooltip }}>
              <Grid item xs={2}>
                <AddIconButton icon={sectionIcon} onClick={this.addPart}/>
              </Grid>
              </Tooltip>
              <Grid item xs={2}>
                <AddIconButton icon={postIcon} onClick={this.addPost}/>
              </Grid>
              <Grid item xs={2}>
                <AddIconButton icon={profileIcon} onClick={this.addPeople}/>
              </Grid>
              <Grid item xs={2}>
                <AddIconButton icon={oneElementIcon} onClick={this.addOneSection}/>
              </Grid>
              <Grid item xs={2}>
                <AddIconButton icon={twoElementBigIcon} onClick={this.addTwoSectionBig}/>
              </Grid>
              <Grid item xs={2}>
                <AddIconButton icon={twoElementIcon} onClick={this.addTwoSection}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

HeaderSection.propTypes = {
  classes: PropTypes.object.isRequired,
  changeSiteContent: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  siteContent: state.siteContent
});

export default connect(mapStateToProps, {
  changeSiteContent,
})(withStyles(styles)(HeaderSection));
