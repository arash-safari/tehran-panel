import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

class FieldGroupModule extends Component {
  render() {
    return (
      <FormGroup controlId={this.props.id}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl {... this.props.props}
                     value={this.props.value}
                     onChange={this.props.onChange}
                     componentClass={this.props.componentClass}
        />
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
      </FormGroup>
    );
  }
}

FieldGroupModule.propTypes = {};

export default FieldGroupModule;
