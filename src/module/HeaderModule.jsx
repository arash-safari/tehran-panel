import React, {Component} from 'react';
import {teal} from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import {grey} from "@material-ui/core/colors/index";
import {Col, Row} from "react-bootstrap";
import YesNoModal from '../module/YesNoModalModul'
import FieldGroupModule from "./FieldGroupModule";
import UploadFileModule from "./UploadFileModule";
import FileUploader from "./FileUploader";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import {changeSiteContent} from "../actions/ModuleAction";

class HeaderModule extends Component {
  state = {
    openModal: false,
    bcolor:"",
    data: {
      En:{
        type:"HeaderModule",
        footer:"",
        mainMenu:"",
        src:"",
      },
      Fa:{
        type:"HeaderModule",
        footer:"",
        mainMenu:"",
        src:"",
      },
    },
  };
  constructor(props){
    super(props);
    const data={
      En:props.data.En
      ,Fa:props.data.Fa};
    this.setState({data:data,
      bcolor:props.data.bcolor})
  }
  handleModalClose = (e) => {
    if (e != null)
      e.stopPropagation();
    this.setState({openModal: false});
  };
  handleYesClicked = (e) => {
    if(e != null)
      e.stopPropagation();
    this.props.onAccept({data:this.state.data,
      bcolor:this.state.bcolor,
      type:this.state.data.En.type});
    this.setState({openModal: false});
  };
  handleNoClicked = (e) => {
    this.handleModalClose(e);
  };
  handleChange = (lang) =>(type)=> (e) => {
    const {data} = this.state;
    data[lang][type]= e.target.value;
    this.setState({data});
  };
  getContent = () => {
    const {classes} = this.props;
    const {data} = this.state;
    const onLoad = (fileName) => {
      const {data} = this.state;
      data["En"]["src"] = fileName;
      data["Fa"]["src"] = fileName;
      this.setState({data});
    };
    return (
      <Row className="show-grid">
        <form className="show-grid">
          <Row>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="main title"
                placeholder="Enter text"
                value={data.En.mainMenu}
                onChange={this.handleChange("En")("mainMenu")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="عنوان اصلی"
                placeholder="Enter text"
                value={data.Fa.mainMenu}
                onChange={this.handleChange("Fa")("mainMenu")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="footer title"
                componentClass="textarea"
                placeholder="Enter text"
                value={data.En.footer}
                onChange={this.handleChange("En")("footer")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="زیرعنوان"
                componentClass="textarea"
                placeholder="Enter text"
                value={data.Fa.footer}
                onChange={this.handleChange("Fa")("footer")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <FileUploader onLoad={(fileName) => onLoad(fileName)} fileName={this.state.data.En.src}/>
            </Col>
          </Row>
        </form>
      </Row>
    );
  };

  render() {
    return (
      <div style={{width: "100vw", height: "300px", backgroundColor: teal[300]}} onClick={(e) => {
        this.setState({openModal: true})
      }}>
        <YesNoModal open={this.state.openModal}
                    handleClose={this.handleModalClose}
                    handleYesClicked={this.handleYesClicked}
                    handleNoClicked={this.handleNoClicked}
                    getContent={this.getContent}
                    deletable={false}
        />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return({siteContent: state.siteContent})
};
HeaderModule.propTypes = {
  changeSiteContent: PropTypes.func.isRequired,
};
export default connect(mapStateToProps,{changeSiteContent})
(HeaderModule);
