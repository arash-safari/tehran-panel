import React, {Component} from 'react';
import PropTypes from 'prop-types';
import YesNoModalModul from "./YesNoModalModul";
import {ButtonToolbar, Col, Dropdown, DropdownButton, MenuItem, Row} from "react-bootstrap";
import {Divider, IconButton} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import FieldGroupModule from "./FieldGroupModule";
import FileUploader from "./FileUploader";

class PostModule extends Component {
  state = {
    openModal: false,
    name: "",
    data :{
      En:{
        type: "PostModule",
        dataArray: [],
      },
      Fa:{
        type: "PostModule",
        dataArray: [],
      },
    },
      initial:false,
    bcolor:""
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
  handleYesClicked = (e)=>{
    if(e != null)
      e.stopPropagation();
    this.handleModalClose(e);
    this.state.bcolor = this.props.data.bcolor;
    this.props.onAccept({type:this.state.type,
      data:this.state.data
      ,bcolor:this.state.bcolor});
  };
  handleNoClicked = (e) =>{
    if(e != null)
      e.stopPropagation();
    this.handleModalClose(e);
  };

  getContent = () => {
    const {classes} = this.props;
    let EndataArray = this.state.data.En.dataArray;
    let FadataArray = this.state.data.Fa.dataArray;
    let data = this.state.data;
      if("dataArray" in this.props.data.En){
          if(!this.state.initial){
              this.setState({data:this.props.data,initial:true})
          }
      }
    const onSelectContext = () => {
      EndataArray.push({
        key: EndataArray ? EndataArray.length + 1 : 0,
        type: "PostModule",
        postType: "string",
        title: "",
        subtitle: "",
        content: "",
      });
      FadataArray.push({
        key: FadataArray ? FadataArray.length + 1 : 0,
        type: "PostModule",
        postType: "string",
        title: "",
        subtitle: "",
        content: "",
      });
      data.En.dataArray = EndataArray;
      data.Fa.dataArray = FadataArray;
      this.setState({data});
    };
    const onSelectImage = () => {
      EndataArray.push({
        key: EndataArray ? EndataArray.length + 1 : 0,
        type: "PostModule",
        postType: "image",
        src: ""
      });
      FadataArray.push({
        key: FadataArray ? FadataArray.length + 1 : 0,
        type: "PostModule",
        postType: "image",
        src: ""
      });
      data.En.dataArray = EndataArray;
      data.Fa.dataArray = FadataArray;
      this.setState({data});
    };

    const onSelectButton = () => {
      EndataArray.push({
        key: EndataArray ? EndataArray.length + 1 : 0,
        type: "PostModule",
        postType: "button",
        link: "",
        buttonText: "",
      });
      FadataArray.push({
        key: FadataArray ? FadataArray.length + 1 : 0,
        type: "PostModule",
        postType: "button",
        link: "",
        buttonText: "",
      });
      data.En.dataArray = EndataArray;
      data.Fa.dataArray = FadataArray;
      this.setState({data});
    };

    return (
      <Row className="show-grid">
        <form className="show-grid">
          {EndataArray.map((data, index) => {
              let element = null;
              if (data.postType === "string") {
                element = this.getStringType(index);
              }
              if (data.postType === "image") {
                element = this.getImageType(index);
              }
              if (data.postType === "button") {
                element = this.getButtonType(index);
              }
              const handleRemove = () => {
                const {EndataArray} = this.state.data.En;
                const {FadataArray} = this.state.data.Fa;
                EndataArray.splice(index,1);
                FadataArray.splice(index,1);
                data.En.dataArray = EndataArray;
                data.Fa.dataArray = FadataArray;
                this.setState({data});
              };
              return (
                <React.Fragment>
                  <IconButton
                    onClick={handleRemove}
                    style={{marginTop: -10, marginBottom: -5}}
                  >
                    <ClearIcon style={{fontSize: 20, fontWeight: "bold"}}/>
                  </IconButton>
                  {element}
                  <Divider style={{margin:4}}/>
                </React.Fragment>
              );
            }
          )}
          <Row style={{margin:30}}>
            <Col sm={12} md={12}>
            {/*<Button bsStyle="primary" block onClick={this.addClicked}> + افزودن منو</Button>*/}
              <DropdownButton
                // bsStyle={title.toLowerCase()}
                bsSize="large"
                block
                title={"+افزودن"}
                key={3}
                noCaret
                id={`dropdown-basic-${3}`}
              >

                <MenuItem eventKey="1" onSelect={onSelectContext}>متن</MenuItem>
                <MenuItem eventKey="2" onSelect={onSelectImage}>عکس و ویدئو</MenuItem>
                <MenuItem eventKey="3" onSelect={onSelectButton}>دکمه</MenuItem>
              </DropdownButton>

            </Col>
          </Row>
        </form>
      </Row>
    );
  };

  render() {
    return (
      <div style={{display: "block", width: "calc(50vw - 40px)", height: "500px", marginRight: "calc(25vw - 15px)"}} onClick={(e) => {
        this.setState({openModal: true})
      }}>
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

  getStringType = (index) => {
    const En = this.state.data.En;
    const Fa = this.state.data.Fa;
    const handleChange = (lang)=>(part) => (e) => {
      const stateData = this.state.data;
      stateData[lang]
        .dataArray[index][part] = e.target.value;
      this.setState({data:stateData});
    };
    return (
      <React.Fragment>
        <Row>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              label="title"
              componentClass="textarea"
              placeholder="Enter text"
              value={En.dataArray[index].title}
              onChange={handleChange("En")("title")}
            />
          </Col>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              label="عنوان"
              componentClass="textarea"
              placeholder="Enter text"
              value={Fa.dataArray[index].title}
              onChange={handleChange("Fa")("title")}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              componentClass="textarea"
              label="subtitle"
              placeholder="Enter text"
              value={En.dataArray[index].subtitle}
              onChange={handleChange("En")("subtitle")}
            />
          </Col>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              componentClass="textarea"
              label="زیر عنوان"
              placeholder="Enter text"
              value={Fa.dataArray[index].subtitle}
              onChange={handleChange("Fa")("subtitle")}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              label="content"
              componentClass="textarea"
              placeholder="Enter text"
              value={En.dataArray[index].content}
              onChange={handleChange("En")("content")}
            />
          </Col>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              componentClass="textarea"
              label="متن"
              placeholder="Enter text"
              value={Fa.dataArray[index].content}
              onChange={handleChange("Fa")("content")}
            />
          </Col>
        </Row>
      </React.Fragment>);
  };
  getImageType = (index) => {
    const onLoad = (fileName) => {
      const stateData = this.state.data;
      stateData.En
        .dataArray[index].src = fileName;
      stateData.Fa
        .dataArray[index].src = fileName;
      this.setState({data:stateData});
    };

    return (
      <React.Fragment>
        <Row >
          <Col sm={12} md={12}>
            <FileUploader onLoad={(fileName)=>onLoad(fileName)}
                          fileName={this.state.data.En.dataArray[index].src}/>
          </Col>
        </Row>
      </React.Fragment>);
  };


  getButtonType = (index) => {
    const En = this.state.data.En;
    const Fa = this.state.data.Fa;
    const handleChange = (lang)=>(part) => (e) => {
      const stateData = this.state.data;
      stateData[lang]
        .dataArray[index][part] = e.target.value;
      this.setState({data:stateData});
    };
    return (
      <React.Fragment>
        <Row>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              label="text"
              placeholder="Enter text"
              componentClass="textarea"
              value={En.dataArray[index].buttonText}
              onChange={handleChange("En")("buttonText")}
            />
          </Col>
          <Col sm={12} md={6}>
            <FieldGroupModule
              id="formControlsText"
              type="text"
              label="عنوان"
              componentClass="textarea"
              placeholder="Enter text"
              value={Fa.dataArray[index].buttonText}
              onChange={handleChange("Fa")("buttonText")}
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
              value={En.dataArray[index].link}
              onChange={(e)=>{handleChange("En")("link")(e);
                handleChange("Fa")("link")(e);}}
            />
          </Col>
        </Row>
      </React.Fragment>);

  }
}

PostModule.propTypes = {};

export default PostModule;
