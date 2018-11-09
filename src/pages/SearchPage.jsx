import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasePage from "./BasePage";
import {changeSiteContent, setPageName} from "../actions/ModuleAction";
import {connect} from "react-redux";
import {getAllPageName, uploadData} from "../actions/DownloadUploadAction";

class SearchPage extends BasePage {

  getBodyPage=()=> {
    this.props.getAllPageName(()=>{});
    return (
      <React.Fragment>
        {this.props.siteContent.pages.map(page=>(<p>{page.pageName}</p>))}
      </React.Fragment>
    );
  };
}
const mapStateToProps = state => {
  return({siteContent: state.siteContent})
};
SearchPage.propTypes = {
  getAllPageName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,{getAllPageName})(SearchPage);
