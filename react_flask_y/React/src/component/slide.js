import './slick.css'
import './slick-theme.css'
import React from "react";
import Slider from "react-slick";
import DeleteImage from './deleteImage'


const ImageSlider = ({data,onDelete}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows : true,
        centerPadding: '0px'
      };
      return(
        <Slider {...settings}>
        {data.map((it, idx) => {
            return <DeleteImage key={idx} {...it} onDelete={onDelete}/>;
          })}
          </Slider>
      );
}

export default ImageSlider;
