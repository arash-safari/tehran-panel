import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import AddIcon from '@material-ui/icons/Add';
import {href} from "../const";
import {Card, CardActions, CardMedia, Button, LinearProgress} from "@material-ui/core";

const styles = theme => ({
  card: {
    position: "relative",
    top: 40,
    width: "calc(100% - 16px)",
    height: "300px",
    margin: 8,
    marginBottom:28,
    textAlign: "center"
  },
  addIcon: {
    top: "40%",
    right: "40%",
    position: "absolute",
  }, media: {
    width: "100%",
    height: "300px",
  }, progress: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 0,
    margin: 0,
    zIndex: 1000,
  }, hiddenFile: {
    position: "absolute",
    top: -100,
  }
});

class FileUploader extends Component {

  state = {
    progressValue: 0,
    progressVisibility: "hidden",
    componentType: "image",
    fileName: "",
    progressColor:"primary"
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  getExtension = (filename) => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  };

  isImage = (filename) => {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'JPG':
      case 'PNG':
      case 'BMP':
      case 'GIF':
        return true;
      default:
        return false;
    }
  };

  addClick = () => {
    const that = this;
    document.getElementById("file-input").click();
    document.querySelector('#file-input')
      .addEventListener('change', function (e) {
        const file = this.files[0];
        that.setState({image: window.URL.createObjectURL(file)});
        const fd = new FormData();
        fd.append("file", file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST',
          href + 'containers/files/upload',
          true);
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            that.setState({
              progressVisibility: "visible",
              progressValue: percentComplete
            });
          }
        };

        xhr.onload = function () {
          if (this.status === 200) {
            const resp = JSON.parse(this.response);
            console.log(resp);
            const fileName = resp.result.files.file[0].name;
            that.props.onLoad(fileName);
            that.setState({fileName: fileName});
            that.setState({componentType: that.isImage(fileName) ? "image" : "video"});
          }
          else{
            that.setState({progressColor:"secondary"})
          }
        };
        xhr.send(fd);
      }, false);
  };

  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardActions>
          <CardMedia
            component={this.state.componentType}
            className={classes.media}
            image={this.props.fileName?href+"containers/files/download/"+this.props.fileName:"upload-icon-3.png"}
            src={href+"containers/files/download/"+this.props.fileName}
            title="select an image">

            <div className={classes.hiddenFile}>
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <input name="upload" type="file" id="file-input" accept="video/*,image/*"/>
                <input type="submit" id="file-submit"/>
              </form>
            </div>

          </CardMedia>
          <Button variant="fab" mini color="primary"
                  className={classes.addIcon} onClick={this.addClick}>
            <AddIcon/>
          </Button>
          {this.state.fileName === "" ?
            <p style={{position: "absolute", top: "55%", right: "30%", width: "40%"}}></p> : <p/>}
          <LinearProgress variant="determinate" color="primary"
                          value={this.state.progressValue} className={classes.progress}
                          color={this.state.progressColor}
                          style={{
                            visibility: this.state.progressVisibility,
                          }}/>
        </CardActions>

      </Card>);
  }
}

FileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileUploader);
