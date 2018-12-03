import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import YesNoModal from "./YesNoModalModul"
import {Col, Row} from "react-bootstrap";
import FieldGroupModule from "./FieldGroupModule";
const styles = theme=>({
  container:{
    verticalAlighn:"top",
  }
});

class PartModule extends Component {
  state={
    openModal:false,
    data :{
      En:{
        type: "PartModule",
        title:""
      },
      Fa:{
        type: "PartModule",
        title:""
      },
    },
      initial:"",
    bcolor:"",
    name:"",
  };
  constructor(props){
    super(props);
    const data={
      En:props.data.En
      ,Fa:props.data.Fa};
    this.setState({data:data,
      bcolor:props.data.bcolor})
  }
  handleModalClose=(e)=>{
    if(e != null)
    e.stopPropagation();
    this.setState({openModal:false});
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

  getContent=()=>{
    const handleChange = (lang) => (type) =>(e)=> {
      const {data} = this.state;
      data[lang][type] = e.target.value;
      this.setState(data);
    };
      if("title" in this.props.data.En){
          if(!this.state.initial){
              this.setState({data:this.props.data,initial:true})
          }
      }
    const {classes} = this.props;
    let {data} = this.state;
    return(
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
        </form>
      </Row>);
  };
  render() {
    return (
      <div style={{width:"100vw",height:200}} onClick={(e)=>{this.setState({openModal:true})}}>
        <YesNoModal open={this.state.openModal}
                    handleClose={this.handleModalClose}
                    handleYesClicked={this.handleYesClicked}
                    handleNoClicked={this.handleNoClicked}
                    getContent = {this.getContent}
                    deletable={true}
                    onDelete={this.props.onDelete}
        />
      </div>
    );
  }
}

PartModule.propTypes = {
  classes:PropTypes.object.isRequired,
};

export default withStyles(styles)(PartModule);
