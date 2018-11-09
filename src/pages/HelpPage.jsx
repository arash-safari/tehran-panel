import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasePage from "./BasePage";

class HelpPage extends BasePage {
  getBodyPage=()=> {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  };
}

HelpPage.propTypes = {};

export default HelpPage;
