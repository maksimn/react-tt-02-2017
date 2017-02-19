import React from "react";
import ImageWithTitle from "../ImageWithTitle";
import styles from "./ImageSetView.css";

export default class ImageSetView extends React.Component {
    render() {
        const data = this.props.data;
        let imgAndTitles = [];
        for (var i = 0; i < data.length; i++) {
            imgAndTitles.push(
                <ImageWithTitle 
                    key={i}
                    title={ data[i].title }
                    imageSrc={ data[i].thumbnailUrl }
                />
            );
        }
        return (
            <div className={ styles.imageSetView }>
                {imgAndTitles}
            </div>
        );
    }
}
