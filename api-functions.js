const db = require('./db.js'); 

exports.today = async function () {
  const collection = db.get();
  let today = new Date();
  today.setHours(0,0,0,0);
  const td = today.getTime();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1)
  tomorrow.setHours(0,0,0,0);
  const tm = tomorrow.getTime();
  const results = await collection
    .find({
      $and: [
        { "time": { $gte: today } },
        { "time": { $lt: tomorrow } }
      ]
    })
    .project({ "mbps": 1, "time": 1, _id: 0})
    .toArray();
  return results;
};