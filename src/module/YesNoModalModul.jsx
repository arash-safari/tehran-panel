import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Button, Grid, IconButton } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from '@material-ui/core/styles';
import AcceptIcon from "@material-ui/icons/Done";
import { Row } from "react-bootstrap";

const styles = theme => ({
  paper: {
    position: 'absolute',
    maxHeight: 550,
    overflowY:"auto",
    overflowX:"hidden",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.main.white,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  textField: {
    flexBasis: 150,
    minWidth: 150,
    fontSize: 18
  }, avatar: {
    marginTop: "40px !important",
    marginRight: 20
  },
  rightButton: {
    marginTop: 20,
    float: "right",
    width: "50%",
  }, leftButton: {
    marginTop: 20,
    float: "left",
    width: "50%",
  },modal:{
    height:"90%",
    width:500,
    position: 'absolute',
  }
});

class YesNoModalModul extends Component {
  state = {
    openDelete:false,
  };
  handleCloseDelete = ()=>{
    this.setState({openDelete:false})
  };
  getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
      top: `50px`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${0}%)`,
    };
  };
  render() {
    const { classes } = this.props;
    const openDeleteModal = ()=>{
      this.setState({openDelete:true});
    };
    return (
      <React.Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick
        open={this.props.open}
        onClose={this.props.handleClose}

      >
        <div  style={this.getModalStyle()} className={classes.paper}>
          <Grid container wapr="nowrap" spacing={16} style={{ marginBottom: 10 }}>
            <Grid item xs zeroMinWidth variant="title" id="modal-title" >
              <div style={{ float: "left" }}>
              </div>
            </Grid>
            <Grid item variant="subheading" id="simple-modal-description">
              {this.props.deletable?
                <IconButton
                  onClick={openDeleteModal}
                  style={{ marginTop: -10, marginBottom: -5 }}
                >
                  <DeleteIcon style={{ fontSize: 20, fontWeight: "bold" }} />
                </IconButton>
                : <div></div>}
              <IconButton
                onClick={this.props.handleClose}
                style={{ marginTop: -10, marginBottom: -5 }}
              >
                <ClearIcon style={{ fontSize: 20, fontWeight: "bold" }} />
              </IconButton>
            </Grid>
          </Grid>
          <Row style={{ position: "relative" ,direction: "rtl",paddingRight:20}}>
            {this.props.getContent()}
          </Row>
          <Button color="secondary" className={classes.leftButton} onClick={this.props.handleNoClicked}>
            <Typography variant="title" color="inherit">
              لغو
          </Typography>
            <ClearIcon style={{ fontSize: 18 }} />
          </Button>
          <Button color="primary" className={classes.rightButton} onClick={this.props.handleYesClicked}>
            <Typography variant="title" color="inherit">
              پذیرش
          </Typography>
            <AcceptIcon style={{ fontSize: 18 }} />
          </Button>
        </div>
      </Modal>
        <Modal
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
          disableBackdropClick
          open={this.state.openDelete}
          onClose={this.handleCloseDelete}
        >
          <div style={this.getModalStyle()} className={classes.paper}>
          <Grid item variant="subheading" id="delete-modal-description">
            <div style={{direction:"rtl"}}>
            <Typography variant="title" color="inherit">
              آیا برای حذف این بخش مطمعن هستید؟
            </Typography>
            </div>
          <Button color="secondary" className={classes.leftButton} onClick={this.handleCloseDelete}>
            <Typography variant="title" color="inherit">
              لغو
            </Typography>
            <ClearIcon style={{ fontSize: 18 }} />
          </Button>
          <Button color="primary" className={classes.rightButton} onClick={()=>{this.handleCloseDelete();this.props.onDelete();}}>
            <Typography variant="title" color="inherit">
              پذیرش
            </Typography>
            <AcceptIcon style={{ fontSize: 18 }} />
          </Button>
        </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

YesNoModalModul.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YesNoModalModul);
