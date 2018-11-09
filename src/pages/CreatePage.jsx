import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderSection from "../section/HeaderSection";
import FooterSection from "../section/FooterSection";
import BasePage from "./BasePage";
import {Grid} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import BaseComponent from "../module/BaseComponent";
import SidebarModule from "../module/SidebarModule";
import PartModule from "../module/PartModule";
import OneSectionModule from "../module/OneSectionModule";
import {connect} from "react-redux";
import PostModule from "../module/PostModule";
import PeopleModule from "../module/PeopleModule";
import TwoSectionModule from "../module/TwoSectionModule";
import TwoSectionModuleBig from "../module/TwoSectionModuleBig";
import YesNoModal from '../module/YesNoModalModul'
import {withStyles} from "@material-ui/core/styles";
import HeaderModule from "../module/HeaderModule";
import {changeSiteContent,setPageName} from "../actions/ModuleAction";
import {uploadData} from "../actions/DownloadUploadAction";
import {Col, Row} from "react-bootstrap";
import FieldGroupModule from "../module/FieldGroupModule";
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  module: {
    verticalAlighn: "top",
  }
});


class CreatePage extends BasePage {
    state={
        moduleProps:{
            w: 300,
            h: 300,
        },
        displayWidth:800,
      sidebarWidth: 50,
      openModal:false,
      pageName:"",
    };
    onChangeDisplay = () => {
        let mp = this.state.moduleProps;
        let psw = 300;
        let displayWidth = document.body.clientWidth;
        mp.mobileView = false;
        if (displayWidth > 1000) {
          mp.w = displayWidth / 4;
          psw = displayWidth / 2 - 10;
        } else if (displayWidth > 750) {
          mp.w = displayWidth / 3;
          psw = displayWidth / 3;
        } else if (displayWidth > 500) {
          mp.w = displayWidth / 2;
          psw = displayWidth / 2 - 40;
        } else {
          mp.w = displayWidth;
          psw = displayWidth - 1;
          mp.mobileView = true;
        }
        mp.h = 2 * mp.w;
        this.setState({psw: psw, moduleProps: mp, displayWidth: displayWidth});
        // this.setDisplaySize();
      };
  onSaveData = ()=>{
    this.setState({openModal:true})
  };
  onExitMenu = () => {

  };
  handleDeleteModule = (index)=>()=>{
    const siteContent = this.props.siteContent.all;
    siteContent.splice(index,1);
    this.props.changeSiteContent(siteContent);
  };

  getBodyPage=()=> {
    window.onresize = this.onChangeDisplay;
    const {classes} = this.props;
    return (
      <React.Fragment>
        <HeaderSection onSaveData ={this.onSaveData}/>
        <div style={{
          width: "100%", minHeight: "calc(100vh)",
          paddingTop: 80, backgroundColor: grey[100]
        }} className="column-scrollable">
          <div>
            <HeaderModule index={0} onAccept={this.handleAccept(0)}
                          data={{
              En:this.props.siteContent.all.En[0],
              Fa:this.props.siteContent.all.Fa[0],
              bcolor:this.props.siteContent.all.bcolor[0],
            }}/>
          </div>


          <Grid container style={{height: "100%"}}>

            <Grid item xs={3}>
              <div style={{position:"relative",left:0,top:-200}}>
                <BaseComponent>
                  <SidebarModule index={1} onAccept={this.handleAccept(1)} data={{
                    En:this.props.siteContent.all.En[1],
                    Fa:this.props.siteContent.all.Fa[1],
                    bcolor:this.props.siteContent.all.bcolor[1],
                  }}/>
                </BaseComponent>
              </div>
            </Grid>

            <Grid item xs={9}>
              <div style={{verticalAlign: "top"}}>
                {this.props.siteContent.all.En.map((content,index) => {
                  let insideModule = null;
                  const data = {En:this.props.siteContent.all.En[index],
                    Fa:this.props.siteContent.all.Fa[index],
                    bcolor:this.props.siteContent.all.bcolor[index]};
                  switch (content.type) {
                    case "PartModule":
                      insideModule = <PartModule data={data} key={index} onDelete={this.handleDeleteModule(index)} onAccept={this.handleAccept(index)} index={index}/>
                      break;
                    case "OneSectionModule":
                      insideModule = <OneSectionModule data={data} onAccept={this.handleAccept(index)} index={index}/>
                      break;
                    case "PostModule":
                      insideModule = <PostModule data={data} key={index} onDelete={this.handleDeleteModule(index)} onAccept={this.handleAccept(index)} index={index}/>
                      break;
                    case "PeopleModule":
                      insideModule = <PeopleModule data={data} key={index} onDelete={this.handleDeleteModule(index)} onAccept={this.handleAccept(index)} index={index}/>
                      break;
                    case "TwoSectionModule":
                      insideModule = <TwoSectionModule data={data} key={index} onDelete={this.handleDeleteModule(index)} onAccept={this.handleAccept(index)} index={index}/>
                      break;
                    case "TwoSectionBigModule":
                      insideModule = <TwoSectionModuleBig data={data} key={index} content={content} onDelete={this.handleDeleteModule(index)} onAccept={this.handleAccept(index)} index={index}/>
                      break;
                  }
                  return (<BaseComponent bcolor={data.bcolor} key={index}>
                    {insideModule}
                  </BaseComponent>);
                })}
              </div>
            </Grid>
          </Grid>
        </div>
        <FooterSection/>
        <YesNoModal open={this.state.openModal}
                    handleClose={this.handleModalClose}
                    handleYesClicked={this.handleYesClicked}
                    handleNoClicked={this.handleNoClicked}
                    getContent={this.getContent}
                    deletable={false}
        />
      </React.Fragment>
    );
  };
  handleModalClose = (e)=>{
    this.setState({openModal:false});
    if (e != null)
      e.stopPropagation();
  };
  handleYesClicked = (e)=>{
    this.handleModalClose(e);
    this.props.setPageName(this.state.pageName);
    this.props.uploadData(this.props.siteContent,
      ()=>{this.props.history.push('/find')});
  };
  handleNoClicked = (e)=>{
    this.handleModalClose(e);
  };
  getContent = ()=>(
    <form className="show-grid">
    <Row>
      <Col sm={12} md={12}>
        <FieldGroupModule
          id="formControlsText"
          type="text"
          label="نام صفحه را وارد نمایید"
          placeholder="Enter text"
          value={this.state.pageName}
          onChange={(e)=>{this.setState({pageName:e.target.value})}}
        />
      </Col>
    </Row>
  </form>);
  handleAccept = (index)=>(data)=> {
    const siteContent = this.props.siteContent.all;
    siteContent.En[index] = {type:data.type,...data.data.En};
    siteContent.Fa[index] = {type:data.type,...data.data.Fa};
    siteContent.bcolor[index] = data.bcolor;
    this.props.changeSiteContent(siteContent);
  }

}
const mapStateToProps = state => {
  return({siteContent: state.siteContent})
};
CreatePage.propTypes = {
  classes: PropTypes.object.isRequired,
  changeSiteContent: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  uploadData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,{changeSiteContent,setPageName,uploadData})
(withStyles(styles)(CreatePage));
