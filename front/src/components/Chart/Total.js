import React, { useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import axios from 'axios';

export default function Total () {

  const[totalUser,setTotalUser]=useState([]);
  const[totalPost,setTotalPost]=useState([]);


//   const config = {
//     series: totalUser,
//     options: {  
//       chart: {
//         height: 280
//       },
//       colors: ["#20E647"],
//       plotOptions: {
//         radialBar: {
//           hollow: {
//             margin: 0,
//             size:"70%",
//             background: "#293450"
//           },
//           track: {
//             dropShadow: {
//               enabled: true,
//               top: 2,
//               left: 0,
//               blur: 4,
//               opacity: 0.15
//             }
//           },
//           dataLabels: {
//             name: {
//               offsetY: -10,
//               color: "#fff",
//               fontSize: "13px"
//             },
//             value: {
//               color: "#fff",
//               fontSize: "30px",
//               show: true
//             }
//           }
//         }
//       },
//       fill: {
//         type: "gradient",
//         gradient: {
//           shade: "dark",
//           type: "vertical",
//           gradientToColors: ["#87D4F9"],
//           stops: [0, 100]
//         }
//       },
//       stroke: {
//         lineCap: "round",
//       },
//       labels: ["Total User"]
//   }
//   }

//   const config2 = {
//     series: totalPost,
//     options: {  
//       chart: {
//         height: 280
//       },
//       colors: ["#20E647"],
//       plotOptions: {
//         radialBar: {
//           hollow: {
//             margin: 0,
//             size:"70%",
//             background: "#293450"
//           },
//           track: {
//             dropShadow: {
//               enabled: true,
//               top: 2,
//               left: 0,
//               blur: 4,
//               opacity: 0.15
//             }
//           },
//           dataLabels: {
//             name: {
//               offsetY: -10,
//               color: "#fff",
//               fontSize: "13px"
//             },
//             value: {
//               color: "#fff",
//               fontSize: "30px",
//               show: true
//             }
//           }
//         }
//       },
//       fill: {
//         type: "gradient",
//         gradient: {
//           shade: "dark",
//           type: "vertical",
//           gradientToColors: ["#87D4F9"],
//           stops: [0, 100]
//         }
//       },
//       stroke: {
//         lineCap: "round",
//       },
//       labels: ["Total Post"]
//   }
//   }

  const getTotal = async() => {
    await axios.get("http://localhost:80/getTotal")
      .then(
        data => {
          console.log(data.data); 
          setTotalUser(data.data[1])
          setTotalPost(data.data[0])

        }
      )  
    }; 

  useEffect(() => {
    getTotal(); 
  },[] );

      return (
        <div>
        {/* <ApexCharts
          options={config.options}
          series={config.series}
          type='radialBar'
          width={500}
          /><br></br>
          <ApexCharts
          options={config2.options}
          series={config2.series}
          type='radialBar'
          width={500}
          /> */}
          <div className="totalUser" style={{textAlign:"center"}}>
          <h2>Total Users</h2>
          <h4>{totalUser}</h4>
          </div>
          <br></br>
          <div className="totalPost" style={{textAlign:"center"}}>
          <h2>Total Posts</h2>
          <h4>{totalPost}</h4>
          </div>
        </div>

      );
  }