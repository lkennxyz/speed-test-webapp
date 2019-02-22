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
        <Helmet>Today's Speeds</Helmet>
        <Head />
        <Content>
          {graph}
        </Content>
      </div>
    );
  }
  async getData() {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: "{ getToday { mbps time } }"
      }),
    })
      .then(r => r.json())
      .then(data => this.createGraphData(data.data.getToday))
      .then(data => this.setState({ data: data}))
      .catch (err => console.error(err));
  }
  async createGraphData(results) {
    const data = await results.map(el => {
      const date = new Date(Number(el.time));
      return { Time: `${date.getHours()}:00`, Mbps: el.mbps };
    });
    return data;
  }
}

export default Today;
