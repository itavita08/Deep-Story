/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import DeleteImage from './deleteImage'
import Carousel from 'react-material-ui-carousel'
import HorizontalRule from '@mui/icons-material/HorizontalRule';

const ImageList = ({data,onDelete}) =>{
    return(
      <Carousel className='carousel' IndicatorIcon={<HorizontalRule/>} autoPlay='false'>{
        data.map((it, idx) => {
          return <DeleteImage key={idx} {...it} onDelete={onDelete}/>;
        })}
        </Carousel>
    )
  }

  export default ImageList;