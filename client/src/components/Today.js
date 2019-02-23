import React, { Component } from 'react';
import Helmet from 'react-helmet';
import LineGraph from './LineGraph';
import Head from './Head';
import Content from './Content';

class Today extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const graph = (this.state.data) ? <LineGraph data={this.state.data}/> : 'No Data';
    return (
      <div className="Today">
        <Helmet><title>Today's Speeds</title></Helmet>
        <Head />
        <Content>
          {graph}
        </Content>
      </div>
    );
  }
  async getData() {
    const query = `query GetTodayAndAverage {
      getToday{
        mbps
        time
      }
      avgAll{
        mbps
        _id
      }
    }`;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
    })
      .then(r => r.json())
      .then(data => this.createGraphData(data.data))
      .then(data => this.setState({ data: data}))
      .catch (err => console.error(err));
  }
  async createGraphData(results) {
    const data = await results.getToday.map(el => {
      const date = new Date(Number(el.time));
      return { Time: `${date.getHours()}:00`, Mbps: el.mbps };
    });
    const avgdata = await results.avgAll.map(el => ({ Time: `${el._id}:00`, MbpsAvg: el.mbps }));
    avgdata.forEach((el, i) => {
      if (data[i]) {
        Object.assign(el, data[i]);
      }
    });
    return avgdata;
  }
}

export default Today;
