import React, { useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import axios from 'axios';

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
        <ApexCharts
          options={config.options}
          series={config.series}
          type='pie'
          width={500}
          />
      );
  }