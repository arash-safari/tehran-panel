import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {blue} from '@material-ui/core/colors'
import {IconButton} from '@material-ui/core'
import YesNoModal from "../module/YesNoModalModul"
import {withStyles} from "@material-ui/core/styles/index";
import DeleteIcon from "@material-ui/icons/Clear";
import FieldGroup from "./FieldGroupModule";
import {Button, Col, Grid, Row} from "react-bootstrap";
import {grey} from '@material-ui/core/colors'

const styles = theme => ({
  button: {
    position: "relative",
    top: "20px",
    right: "-25px",
  }
});

class SidebarModule extends Component {
  state = {
    openModal: false,
    name: "",
    bcolor:"",
    data:{
      En:{
        type:"SidebarModule",
        labels:[{name: "", address: ""}]
      },
      Fa:{
        type:"SidebarModule",
        labels:[{name: "", address: ""}]
      }
    }
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
  handleYesClicked = (e) => {
    if(e != null)
      e.stopPropagation();
    this.props.onAccept({type:"SidebarModule",data:this.state.data});
    this.setState({openModal: false});
  };
  handleNoClicked = (e) => {
    this.handleModalClose(e);
  };
  getContent = () => {
    const {classes} = this.props;
    const {data} = this.state;
    return (
      <Row className="show-grid">
        <form className="show-grid">
          {data.En.labels.map((label, index) => (
            <div key={index}>
              <IconButton aria-label="Delete" className={classes.button} onClick={()=>this.removeClick(index)}>
                <DeleteIcon fontSize="small"/>
              </IconButton>
              <div style={{marginRight: 16, marginLeft: 16}}>
              <Row>
                <Col sm={12} md={6}>
                  <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="menu label"
                    placeholder="Enter text"
                    value={data.En.labels[index].name}
                    onChange={this.handleChangeLabel("En")("name",index)}
                  />
                </Col>
                <Col sm={12} md={6}>
                  <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="عنوان منو"
                    placeholder="Enter text"
                    value={data.Fa.labels[index].name}
                    onChange={this.handleChangeLabel("Fa")("name",index)}
                  />
                </Col>
              </Row>
              </div>
              <div style={{marginRight: 16, marginLeft: 16}}>
                <FieldGroup
                  id="formControlsText"
                  type="text"
                  label="address"
                  placeholder="Enter text"
                  value={data.En.labels[index].address}
                  onChange={(e)=>{this.handleChangeLabel("En")("address",index)(e);this.handleChangeLabel("Fa")("address",index)(e);}}
                />
              </div>
              <hr style={{border: "1px solid " + grey[400], marginRight: 16, marginLeft: 16}}/>
            </div>
          ))}
          <div style={{marginRight: 16, marginLeft: 16}}>
            <Button bsStyle="primary" block onClick={this.addClicked}> + افزودن منو</Button>
          </div>
        </form>


      </Row>
    );
  };

  render() {
    return (
      <div style={{width: "calc(25vw - 15px)", height: "600px", backgroundColor: blue[300]}} onClick={(e) => {
        this.setState({openModal: true})
      }}>
        <YesNoModal open={this.state.openModal}
                    handleClose={this.handleModalClose}
                    handleYesClicked={this.handleYesClicked}
                    handleNoClicked={this.handleNoClicked}
                    getContent={this.getContent}
        />
      </div>
    );
  }

  addClicked = () => {
    this.state.data.En.labels.push({name: "",address: ""});
    this.state.data.Fa.labels.push({name: "",address: ""});
  };

  removeClick = (index)=>{
    this.state.data.En.labels.splice(index,1);
    this.state.data.Fa.labels.splice(index,1);
  };

  handleChangeLabel = (lang)=>(type,index)=> (e)=>{
    const lbs = this.state.data[lang].labels;
    this.state.data[lang].labels[index][type]=
      e.target.value;
    this.setState({labels: lbs});
  }
}

SidebarModule.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  modules: state.modules
});

export default (withStyles(styles)(SidebarModule));
