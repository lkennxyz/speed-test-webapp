import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class LineGraph extends Component {
  render() {
    console.log(this.props.data);
    return (
      <ResponsiveContainer width={800} height={450}>
        <LineChart data={this.props.data}>
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
}

export default LineGraph;
