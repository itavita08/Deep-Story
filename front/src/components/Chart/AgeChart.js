import React, { useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import axios from 'axios';

export default function AgeChart(){

    const[maleAge,setMaleAge]=useState([])
    const[femaleAge,setFemaleAge]=useState([])

    const state = {
        series: [{
            name: '남자',
            data: maleAge
          }, {
            name: '여자',
            data: femaleAge
          }],

        options:{
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                  show: true
                },
                zoom: {
                    enabled: true
                  }
                },
                
                responsive: [{
                    breakpoint: 480,
                    options: {
                      legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                      }
                    }
                  }],
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 10,
                      dataLabels: {
                        total: {
                          enabled: true,
                          style: {
                            fontSize: '13px',
                            fontWeight: 900
                          }
                        }
                      }
                    },
                  },
                  xaxis: {
                    type: 'category',
                    categories: ['10대', '20대', '30대', '40대',
                      '50대', '60대'
                    ],
                  },
                  legend: {
                    position: 'right',
                    offsetY: 40
                  },
                  fill: {
                    opacity: 1
                  }
        }
    }

    const getAge = async() => {
        await axios.get("http://localhost:80/getAge")
          .then(
            data => {
              console.log(data.data); 
              setMaleAge(data.data.M)
              setFemaleAge(data.data.F)
    
            }
          )  
        }; 
    
      useEffect(() => {
        getAge(); 
      },[] );
      
      return (
        <div style={{position:"absolute", top:"700px", left:"350px"}}>
          <h5>연령대별 성비</h5>
        <ApexCharts
          options={state.options}
          series={state.series}
          type='bar'
          width={800}
          height={200}
          />
          </div>
      );
}