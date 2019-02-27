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
        <Helmet><title>{ 'Today' }</title></Helmet>
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
      highs{
        mbps
        _id
      }
      lows{
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
    const data = results.getToday;
    const avgdata = results.avgAll;
    const highs = results.highs;
    const lows = results.lows;
    const ret = await avgdata.map((el, i) => ({
      Mbps: (data[i]) ? data[i].mbps : null,
      AvgMbps: el.mbps,
      HighMbps: highs[i].mbps,
      LowMbps: lows[i].mbps,
      Time: el._id,
    }));
    return ret;
  }
}

export default Today;
