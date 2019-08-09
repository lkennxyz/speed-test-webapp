const getData = async (date) => {
  const query = `query GetDate($date: String) {
    getDate(date:$date){
      mbps
      time
    }
  }`;
  try {
    const r = await fetch('/graphql', {
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
    const json = await r.json();
    return json.data;
  } catch(err) {
    console.error(err);
  }
};
const getAverages = async () => {
  const query = `{
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
  try {
    const r = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    });
    const json = await r.json();
    return json.data;
  } catch (err) {
    console.error(err);
  }
};
const createGraphData = async ({ data, avg, hi, lo }) => {
  const ret = await avg.map((el, i) => ({
    Mbps: (data[i]) ? data[i].mbps : null,
    AvgMbps: el.mbps,
    HighMbps: hi[i].mbps,
    LowMbps: lo[i].mbps,
    Time: `${el._id}:00`,
  }));
  return ret;
};

export { getData, getAverages, createGraphData };
