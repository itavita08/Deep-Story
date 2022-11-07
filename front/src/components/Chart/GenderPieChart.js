import React, { useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import axios from 'axios';
import { styled } from 'styled-components';

export default function GenderPieChart () {

  const[gender,setGender]=useState([50,50]);

  const config = {
    series: gender,
    options: {  
      chart: {
        width: 380,
        type: 'pie',
      },
    labels: ['남자','여자'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
            }
          }
        }]
      }
  }

  const getGender = async() => {
    await axios.get("http://localhost:80/getGender")
      .then(
        data => {
          console.log(data.data); 
          setGender(data.data)

        }
      )  
    }; 

  useEffect(() => {
    getGender(); 
  },[] );

      return (
        <div style={{position:'absolute', top:"700px", right:"100px"}}>
          <h5 style={{position:'absolute', left:"75px", top:"-40px"}}>남녀 비율</h5>
        <ApexCharts
          options={config.options}
          series={config.series}
          type='pie'
          width={350}
          height={300}
          /></div>
      );
  }