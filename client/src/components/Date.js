import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Helmet from 'react-helmet';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import LineGraph from './LineGraph';
import Head from './Head';
import Content from './Content';

class SelectedDate extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      data: null,
    }
  }
  render() {
    const graph = (this.state.data) ? <LineGraph data={this.state.data}/> : 'No Data';
    return (
      <div className='Date'>
        <Head>
          <DatePicker
            selected={this.state.selected}
            onChange={this.handleChange.bind(this)}
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
    const data = results.getDate;
    const avgdata = results.avgAll;
    const highs = results.highs;
    const lows = results.lows;
    const ret = await avgdata.map((el, i) => ({
      Mbps: (data[i]) ? data[i].mbps : null,
      AvgMbps: el.mbps,
      HighMbps: highs[i].mbps,
      LowMbps: lows[i].mbps,
      Time: `${el._id}:00`,
    }));
    return ret;
  }
  async handleChange(selection) {
    await this.setState({ selected: selection });
    this.getData();
  }
}

export default SelectedDate;
