import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const greyColor = grey[500];
const styles = theme => ({
  root: {
    marginTop:4,
    width: 70,
    height: 70,
    marginRight:30,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: greyColor,
    display:"inline-block"
  },
  icon: {
    position:"relative",
    right:-10,
    top:-72,
    display:"block",
    color:greyColor,
  },

});

class AddIconButton extends Component {
  state={
    borderColor:"#FFF",
    visibility:"hidden",
  };
  onMouseOver = () => {
    this.setState({borderColor:greyColor,visibility:"visible"})
  };
  onMouseOut = () => {
    this.setState({borderColor:"#FFF",visibility:"hidden"})
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root} style={{borderColor:this.state.borderColor}} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.props.onClick}>
        <div style={{position:"relative",left:-15,top:-4,}}>
          {this.props.icon}
        </div>
        <IconButton className={classes.icon} style={{visibility:this.state.visibility}} aria-label="Add an alarm">
          <AddIcon/>
        </IconButton>
      </div>
    );
  }
}

AddIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddIconButton);
