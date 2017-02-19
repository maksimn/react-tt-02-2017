import React from "react";
import { Link } from "react-router";
import styles from "./Pagination.css";

export default class Pagination extends React.Component {
    paginationLinkClick(e) {
        document.querySelector(`.${styles.selectedPgnLink}`).className = "";
        e.target.className = styles.selectedPgnLink;
        e.persist();
    }
    pgnnAreaClick(e) {
        this.props.linkClick(e);
    }
    render() {
        if (this.props.numLinks == 1) {
            return (<div id="pgn" className={ styles.paginationLinks }><a href="javascript: void(0)">1</a>
                    </div>)
        }
        let links = new Array(this.props.numLinks);
        for(let i = 0; i < links.length; i++) {
            links[i] = <Link key={i} onClick={ this.paginationLinkClick } to={(i + 1).toString()}>{i + 1}</Link>;
        }
        const ind = this.props.pageNum - 1;
        links[ind] = <Link className={ styles.selectedPgnLink} key={ind} onClick={ this.paginationLinkClick } to={(ind + 1).toString()}>{ind + 1}</Link>;
        return (
            <div id="pgn" onClick={this.pgnnAreaClick.bind(this)} className={ styles.paginationLinks }> 
                {links}
            </div>
        );
    }
}