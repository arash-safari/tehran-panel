import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {yellow} from "@material-ui/core/colors";
import {Col, Row} from "react-bootstrap";
import YesNoModalModul from "./YesNoModalModul";
import FieldGroupModule from "./FieldGroupModule";
import FileUploader from "./FileUploader";

class PeopleModule extends Component {
  state = {
    openModal: false,
    bcolor:"",
    data:{
      En:{
        type: 'PeopleModule',
        name:"",
        info:"",
        link:"",
        src:"",
      },
      Fa:{
        type: 'PeopleModule',
        name:"",
        info:"",
        link:"",
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
    if(e != null)
    e.stopPropagation();
    this.setState({openModal: false});
  };
  handleYesClicked = (e)=>{
    if(e != null)
      e.stopPropagation();
    this.handleModalClose(e);
    this.state.bcolor = this.props.data.bcolor;
    this.props.onAccept(
      {type:this.state.type,data:this.state.data,bcolor:this.state.bcolor});
  };
  handleNoClicked = (e) =>{
    if(e != null)
      e.stopPropagation();
    this.handleModalClose(e);
  };
  getContent = () => {
    const {classes} = this.props;
    const {data} = this.state;
    const handleChange = (lang)=>(type)=>(e)=>{
      data[lang][type] = e.target.value;
      this.setState(data);
    };

    const onLoad = (fileName)=>{
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
                label="name"
                placeholder="Enter text"
                value={data.En.name}
                onChange={handleChange("En")("name")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="نام"
                placeholder="Enter text"
                value={data.Fa.name}
                onChange={handleChange("Fa")("name")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="info"
                componentClass="textarea"
                placeholder="Enter text"
                value={data.En.info}
                onChange={handleChange("En")("info")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="اطلاعات"
                componentClass="textarea"
                placeholder="Enter text"
                value={data.Fa.info}
                onChange={handleChange("Fa")("info")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="link"
                placeholder="Enter text"
                value={data.En.link}
                onChange={(e)=>{handleChange("En")("link")(e);
                handleChange("Fa")("link")(e);}}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12}>
              <FileUploader onLoad={(fileName)=>onLoad(fileName)} fileName={this.state.data.En.src}/>
            </Col>
          </Row>
        </form>
      </Row>
    );
  };

  render() {
    return (
      <div style={{width:"calc(25vw - 20px)" , height:"calc(25vw - 20px)",float:"left"}} onClick={(e) => {
        this.setState({openModal: true})}}>
        <div style={{width:"calc(12.5vw - 10px)",height:"calc(12.5vw - 10px)",float:"right",border:"1px solid " + yellow[400]}}/>
        <YesNoModalModul open={this.state.openModal}
                    handleClose={this.handleModalClose}
                    handleYesClicked={this.handleYesClicked}
                    handleNoClicked={this.handleNoClicked}
                    getContent={this.getContent}
                    deletable={true}
                    onDelete={this.props.onDelete}
        />
      </div>
    );
  }
}

PeopleModule.propTypes = {};

export default PeopleModule;
