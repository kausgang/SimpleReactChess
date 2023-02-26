import React, { useState, useEffect } from "react";
// import { BarChart, Bar } from "recharts";
// import { LineChart, Line } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

//props.cp_value holds the centipoint value

function Status(props) {
  const [data, setData] = useState([{}]);

  let data1 = [];

  //   useEffect(() => {
  //     console.log(data);

  //     // delete first two elements of data array
  //     let data1 = [];
  //     for (let i = 0; i < data.length; i++) {
  //       if (i > 1) data1.push(data[i]);
  //     }
  //     console.log("data1=", data1);
  //     setData(data1);

  //   }, []);

  useEffect(() => {
    // console.log(data);

    // for (let i = 0; i < data.length; i++) {
    //   if (i > 1) data1.push(data[i]);
    // }

    data1 = [...data];

    // setData([...data1, { cp: props.cp_value }]);
    setData([
      ...data1,
      {
        cp: props.cp_value,
        move: props.game.history().pop(),
        move_number: props.game.history().length,
      },
    ]);
  }, [props.cp_value]);

  return (
    // <BarChart width={400} height={80} data={data}>
    //   <Bar dataKey="uv" fill="#8884d8" />
    // </BarChart>

    // <LineChart width={400} height={100} data={data}>
    //   <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
    // </LineChart>

    // <ResponsiveContainer width={500} height={350} aspect={1}>
    <LineChart
      width={500}
      height={200}
      data={data}
      margin={{
        top: 40,
        right: 50,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="move_number" />
      <YAxis axisLine={false} />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0.5} stroke="red" label="Score=0.5" />
      {/* <ReferenceLine y={9800} label="Max" stroke="red" /> */}
      <Line type="monotone" dataKey="cp" stroke="#8884d8" />
      <Line type="monotone" dataKey="move" stroke="#82ca9d" />
    </LineChart>
    // </ResponsiveContainer>
  );
}

export default Status;
