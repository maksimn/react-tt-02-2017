import React from "react";
import { connect } from "react-redux";

import { numImgsOnPage } from "../constants";
import styles from "./Layout.css";
import ImageSetView from "../components/ImageSetView";
import Pagination from "../components/Pagination";
import { PAGINATION_LINK_CLICK_ACTION, FILTER_DATA_ACTION } from "../actions";

class Layout extends React.Component {
    constructor() {
        super();
        this.selectedPgnLink = null;
    }

    paginationLinkClickHandler(e) {
        const href = e.target.href;
        if (href) {
            this.selectedPgnLink = e.target;
            const ind = href.lastIndexOf("/") + 1;
            this.props.dispatch({
                type: PAGINATION_LINK_CLICK_ACTION,
                payload: { 
                    pageNum: parseInt(href.substring(ind)), 
                    allData: this.props.allData,
                    filteredData: this.props.filteredData
                }
            });
        }
    }

    searchHandler(e) {
        if(e.keyCode == 13) {
            if (this.selectedPgnLink) {
                this.selectedPgnLink.className = "";
            }
            if(e.target.value.length > 0) {
                const searchStr = e.target.value;
                const allData = this.props.allData;
                const filteredData = 
                    allData.filter(x => { return x.title.indexOf(searchStr) !== -1; });
                this.props.dispatch({
                    type: FILTER_DATA_ACTION,
                    payload: filteredData
                });
            } else {
                this.props.dispatch({
                    type: FILTER_DATA_ACTION,
                    payload: this.props.allData
                });                
            }
        }
    }

    render() {
        let numLinks = Math.ceil(this.props.filteredData.length / numImgsOnPage);
        if (numLinks === 0) { numLinks = 1; }
        return (
            <div>
                <div style={ { margin: "10px 0 5px 20px "} }>
                    Поиск: 
                    <input onKeyUp= { this.searchHandler.bind(this) }  type="text" />
                </div>
                <ImageSetView data={ this.props.viewData } />
                <Pagination linkClick={ this.paginationLinkClickHandler.bind(this) }
                            numLinks={ numLinks } 
                            pageNum={this.props.pageNum} />
                <div style={ { height: "100px"}}></div>
            </div>
        );
    }
}

export default connect((store) => {
    return {
        viewData: store.viewData,
        allData: store.allData,
        pageNum: store.pageNum,
        filteredData: store.filteredData
    };
})(Layout);
