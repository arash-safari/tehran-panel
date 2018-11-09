import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from "react-dropzone";

class UploadFileModule extends Component {
  state = { files: [] };
  onDrop(files) {
    this.setState({
      files
    });
  };
  render() {
    return (
        <section>
          <div style={{width:200,height:200,display:"inline-block"}}>
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
    );
  }
}

UploadFileModule.propTypes = {};

export default UploadFileModule;
