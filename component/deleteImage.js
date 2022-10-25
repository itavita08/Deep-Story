/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const DeleteImage = ({onDelete, name}) => {
    return(
        <div>
            <img key={name} style={{
                height: -100,
                width: 500
            }} src={"/static/image/"+name+".png"}/>
            <a className='close' href='/' data={name} onClick={(e)=>{
            e.preventDefault();
                onDelete(name)
            }}>x</a>
        </div>
    )
}
export default DeleteImage;