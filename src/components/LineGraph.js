import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const LineGraph = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="Mbps" name="Mbps" stroke="#2196F3" />
        <Line type="monotone" dataKey="AvgMbps" name="Average Mbps" stroke="#3F51B5" />
        <Line type="monotone" dataKey="HighMbps" name="Max Mbps" stroke="#8BC34A" />
        <Line type="monotone" dataKey="LowMbps" name="Min Mbps" stroke="#f44336" />
        <XAxis dataKey="Time"/>
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
