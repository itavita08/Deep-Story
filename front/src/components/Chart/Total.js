import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Total() {
  const [totalUser, setTotalUser] = useState([]);
  const [totalPost, setTotalPost] = useState([]);

  const getTotal = async () => {
    await axios.get("/api/v1/admin/total-chart").then((data) => {
      setTotalUser(data.data[1]);
      setTotalPost(data.data[0]);
    });
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div>
      <div
        className="totalUser"
        style={{
          textAlign: "center",
          position: "absolute",
          top: "130px",
          left: "620px",
        }}
      >
        <h2>Total Users</h2>
        <h4>{totalUser}</h4>
      </div>
      <br></br>
      <div
        className="totalPost"
        style={{
          textAlign: "center",
          position: "absolute",
          top: "130px",
          right: "500px",
        }}
      >
        <h2>Total Posts</h2>
        <h4>{totalPost}</h4>
      </div>
    </div>
  );
}
