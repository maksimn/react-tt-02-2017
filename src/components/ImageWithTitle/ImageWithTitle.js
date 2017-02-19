import React from "react";

import style from "./ImageWithTitle.css";

export default class ImageWithTitle extends React.Component {
    render() {
        return (
            <div className={ style.imgAndTitle }>
                <img src={this.props.imageSrc} />
                <div className={ style.titleForImg }>
                    {this.props.title}
                </div>
            </div>
        );
    }
}
