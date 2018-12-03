import React, {Component} from 'react';
import {grey} from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import {IconButton} from "@material-ui/core";

import PropTypes from 'prop-types';
import YesNoModalModul from "./YesNoModalModul";
import {Col, Row} from "react-bootstrap";
import FieldGroupModule from "./FieldGroupModule";

class OneSectionModule extends Component {
  state = {
    openModal: false,
    name: "",
    data:{
      En:{
        type: "OneSectionModule",
        widthCoe: 1,
        title: "",
        content: "",
        backgroundColor:"#",
        footer: "",
        link: ""
      },
      Fa:{
        type: "OneSectionModule",
        widthCoe: 1,
        title: "",
        content: "",
        backgroundColor:"#",
        footer: "",
        link: ""
      },
    },
      initial:false,
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
    this.state.bcolor = this.props.data.bcolor;
    this.props.onAccept({type:this.state.type,
      data:this.state.data
      ,bcolor:this.state.bcolor
    });
    this.setState({openModal: false});
  };
  handleNoClicked = (e) =>{
    if(e != null)
      e.stopPropagation();
    this.handleModalClose(e);
  };
  getContent = () => {
    const {classes} = this.props;
    const {data} = this.state;
    const handleChange = (lang)=>(type) =>(e)=>{
      data[lang][type] = e.target.value;
      this.setState(data);
    };
      if("title" in this.props.data.En){
          if(!this.state.initial){
              this.setState({data:this.props.data,initial:true})
          }
      }
    return (
      <Row className="show-grid">
        <form className="show-grid">
          <Row>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="title"
                placeholder="Enter text"
                value={data.En.title}
                onChange={handleChange("En")("title")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="عنوان"
                placeholder="Enter text"
                value={data.Fa.title}
                onChange={handleChange("Fa")("title")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="content"
                placeholder="Enter text"
                value={data.En.content}
                componentClass="textarea"
                onChange={handleChange("En")("content")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="محتوا"
                placeholder="Enter text"
                value={data.Fa.content}
                componentClass="textarea"
                onChange={handleChange("Fa")("content")}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="subtitle"
                placeholder="Enter text"
                value={data.En.footer}
                onChange={handleChange("En")("footer")}
              />
            </Col>
            <Col sm={12} md={6}>
              <FieldGroupModule
                id="formControlsText"
                type="text"
                label="زیر عنوان"
                placeholder="Enter text"
                value={data.Fa.footer}
                onChange={handleChange("Fa")("footer")}
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
        </form>
      </Row>
    );
  };

  render() {
    return (
      <div style={{display:"inline-block",width:"calc(25vw - 20px)",height:"calc(25vw - 20px)",float:"left"}} onClick={(e) => {
        this.setState({openModal: true})}}>


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

OneSectionModule.propTypes = {};

export default OneSectionModule;
