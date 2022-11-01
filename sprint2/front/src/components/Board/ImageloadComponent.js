import React from 'react';
import DeleteImage from './DeletelmageComponent';

const ImageLoad = ({data, onDelete}) =>{
    return(
      // <Carousel className='carousel' IndicatorIcon={<HorizontalRule/>} autoPlay='false'>{
        data.map((it, idx) => {
          return <DeleteImage key={idx} {...it} onDelete={onDelete}/>;
        })
        // </Carousel>
    )
  }

  export default ImageLoad;