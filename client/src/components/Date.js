import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Helmet from 'react-helmet';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import LineGraph from './LineGraph';
import Head from './Head';
import Content from './Content';

class Side extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: null,
      data: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const graph = (this.state.data) ? <LineGraph data={this.state.data}/> : 'No Data';
    return (
      <div className='Date'>
        <Head>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleChange}
            popperPlacement='top-end'
            dateFormat='dd/MM/yyyy'
          />
        </Head>
        <Content>
          {graph}
        </Content>
      </div>
    );
  }
  async getData() {
    const date = this.state.selectedDate;
    const query = `query GetDateAndAverage($date: String) {
      getDate(date:$date){
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
        query,
        variables: { date }
      }),
    })
      .then(r => r.json())
      .then(data => this.createGraphData(data.data))
      .then(data => this.setState({ data: data }))
      .catch (err => console.error(err));
  }
  async createGraphData(results) {
    const data = await results.getDate.map(el => {
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
  async handleChange(selection) {
    await this.setState({ selectedDate: selection });
    this.getData();
  }

}

export default Side;
