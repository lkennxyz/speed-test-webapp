import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LineGraph from './components/LineGraph';
import { getData, getAverages, createGraphData } from './components/Data';
//import './App.css';
import './styles/App.scss';

const App = () => {
  const [date, setDate] = useState(null);
  const [avgData, setAvg] = useState(null);
  const [data, setData] = useState(null);
  const saveAvgs = async () => {
    const avg = await getAverages();
    setAvg(avg);
    setDate(new Date());
  }
  const saveData = async (date) => {
    const timeData = await getData(date)
    const svData = await createGraphData({
      data: (timeData.getDate) ? timeData.getDate: [],
      avg: (avgData) ? avgData.avgAll : [],
      hi: (avgData) ? avgData.highs : [],
      lo: (avgData) ? avgData.lows : []
    });
    setData(svData);
  }
  useEffect(() => {
    saveAvgs();
  }, []);
  useEffect(() => {
    saveData(date);
  }, [date]);


  const graph = (data) ? <LineGraph data={data}/> : 'No Data';
  return (
    <Layout
      date={ date }
      setDate={ setDate }
    >
      <div>
        {graph}
      </div>
    </Layout>
  );
}

export default App;
