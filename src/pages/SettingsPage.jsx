import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasePage from "./BasePage";

class SettingsPage extends BasePage {
  getBodyPage=()=> {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  };
}

SettingsPage.propTypes = {};

export default SettingsPage;
