import React from 'react';
import GenderPieChart from './GenderPieChart';
import Total from './Total';
import AgeChart from './AgeChart';
import LoginChart from './LoginChart';


function DashBoard(){
    return(
        <div>
            <Total></Total><br></br>
            <GenderPieChart></GenderPieChart><br></br>
            <AgeChart></AgeChart><br></br>
            <LoginChart></LoginChart><br></br>
        </div>
    )
}

export default DashBoard;