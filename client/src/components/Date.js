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
        <Helmet>Speeds for {this.state.selectedDate}</Helmet>
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
    const selected = this.state.selectedDate.toString();
    console.log(selected);
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `{getDate(date:"${selected}"){mbps time}}`
      }),
    })
      .then(r => r.json())
      .then(data => this.createGraphData(data.data.getDate))
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
  async handleChange(selection) {
    console.log(selection);
    await this.setState({ selectedDate: selection });
    console.log(this.state.selectedDate);
    this.getData();
  }

}

export default Side;
