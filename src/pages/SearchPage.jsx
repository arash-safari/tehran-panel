import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BasePage from "./BasePage";
import {changeSiteContent, setPageName} from "../actions/ModuleAction";
import {connect} from "react-redux";
import {getAllPageName, uploadData} from "../actions/DownloadUploadAction";
import {Col, Row} from "react-bootstrap";
import FieldGroupModule from "../module/FieldGroupModule";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import YesNoModalModul from "../module/YesNoModalModul";
import {Link} from "react-router-dom";

class SearchPage extends BasePage {
    state = {
        searched: "",
        pages: [],
        openDeleteModal: false,
        selectedPageId: -1,
    };
    handleDeleteModalClose = () => {
        this.setState({openDeleteModal: false})
    };
    handleDeleteYesClicked = () => {
        console.log(this.state.selectedPageId + " removed");
        this.handleDeleteModalClose();
    };
    handleDeleteNoClicked = () => {
        this.setState({openDeleteModal: false, selectedPageId: -1})
    };
    getDeleteModalContent = () => {
       return(<p> برای حذف این صفحه اطمینان دارید؟</p>);
    };
    handleChange = (e) => {
        const searched = e.target.value;
        this.setState({searched});
        let pages;
        if (searched !== "") {
            pages = this.props.siteContent.pages.filter
            ((page, index, pages) => {
                return (page.pageName.includes(searched))
            });
        } else {
            pages = this.props.siteContent.pages;
        }
        this.setState({pages});
        console.log(pages)
    };
    openDeleteModal = (page)=>() => {
        this.setState({openDeleteModal: true,selectedPageId:page.id})
    };

    componentWillMount() {
        this.props.getAllPageName(this.state.searched, (res) => {
            this.setState({pages: res.pages});
        });
    }

    getBodyPage = () => {
        const {searched} = this.state;
        const PageItem = (props) => {
            return (<React.Fragment>
                <Row>
                    <Col xs={4}>
                        <div>
                            <Link to={"/create-page/"+props.page.id}>
                                {props.page.pageName}</Link>
                        </div>
                    </Col>
                    <Col xs={4}>
                    </Col>
                    <Col xs={4}>
                        <IconButton
                            onClick={this.openDeleteModal(props.page)}
                            style={{marginTop: -10, marginBottom: -5}}
                        >
                            <DeleteIcon style={{fontSize: 20, fontWeight: "bold"}}/>
                        </IconButton>
                    </Col>
                </Row>
            </React.Fragment>);
        };
        return (
            <React.Fragment>
                <div style={{marginRight: 50, marginLeft: 100, marginTop: 30, marginBottom: 30}}>
                    <Row>
                        <form>
                            <Row>
                                <FieldGroupModule
                                    id="formControlsText"
                                    type="text"
                                    placeholder="...search"
                                    value={searched}
                                    onChange={this.handleChange}
                                />
                            </Row>
                        </form>
                    </Row>
                </div>
                {this.state.pages.map((page, index) =>
                    (<div key={index}><PageItem page={page}/></div>))}
                <YesNoModalModul open={this.state.openDeleteModal}
                            handleClose={this.handleDeleteModalClose}
                            handleYesClicked={this.handleDeleteYesClicked}
                            handleNoClicked={this.handleDeleteNoClicked}
                            getContent={this.getDeleteModalContent}
                            deletable={false}
                />
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => {
    return ({siteContent: state.siteContent})
};
SearchPage.propTypes = {
    getAllPageName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getAllPageName})(SearchPage);
