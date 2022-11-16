import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

export default function GenderPieChart() {

  const [loginTime, setLoginTime] = useState({});
  const [month, setMonth] = useState([
    "Total number of users per hour",
    "January",
    "February",
  ]);

  const [selectMonth, setSelectMonth] = useState({
    key: "0",
    month: "Total number of users per hour",
  });

  const changeMonth = (e) => {
    setSelectMonth({
      ...selectMonth,
      key: e.target.value,
      month: month[parseInt(e.target.value)],
    });
  };

  const config = {
    series: [
      {
        name: "Desktops",
        data: loginTime[parseInt(selectMonth.key)],
      },
    ],
    options: {
      chart: {
        height: 200,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: selectMonth.month,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
        },
      },
      xaxis: {
        categories: [
          "08H",
          "09H",
          "10H",
          "11H",
          "12H",
          "13H",
          "14H",
          "15H",
          "16H",
          "17H",
          "18H",
          "19H",
          "20H",
          "21H",
          "22H",
          "23H",
        ],
      },
    },
  };

  const getLoginTime = async () => {
    await axios.get("/api/v1/admin/login-time-chart").then((data) => {
      setLoginTime(data.data);
    });
  };

  useEffect(() => {
    getLoginTime();
  }, [setSelectMonth]);

  return (
    <div style={{ position: "absolute", left: "350px", top: "270px" }}>
      <div>
        <select id="lang" value={selectMonth.key} onChange={changeMonth}>
          <option value="0">총합</option>
          <option value="1">1월</option>
          <option value="2">2월</option>
        </select>
        <ApexCharts
          options={config.options}
          series={config.series}
          type="line"
          width={1200}
          height={300}
        />
      </div>
    </div>
  );
}
