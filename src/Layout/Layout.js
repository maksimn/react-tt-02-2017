import React from "react";
import { connect } from "react-redux";

import { numImgsOnPage } from "../constants";
import styles from "./Layout.css";
import ImageSetView from "../components/ImageSetView";
import Pagination from "../components/Pagination";

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
                type: "PAGINGATION_LINK_CLICK",
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
                    type: "FILTER_DATA",
                    payload: filteredData
                });
            } else {
                this.props.dispatch({
                    type: "FILTER_DATA",
                    payload: this.props.allData
                });                
            }
        }
    }

    render() {
        const numLinks = this.props.filteredData.length === 0 ? 
                         Math.ceil(this.props.allData.length / numImgsOnPage) :
                         Math.ceil(this.props.filteredData.length / numImgsOnPage);
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
