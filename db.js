const MongoClient = require('mongodb').MongoClient;

const state = {
  client: null,
  collection: null,
};

exports.connect = async function () {
if (state.db) return 0;
  const uri = process.env.MONGO_URI;
  const db = process.env.MONGO_DB;
  const dbCollection = process.env.MONGO_COLLECTION
  const client = await new MongoClient(uri, { useNewUrlParser: true });
  state.client = client;
  try {
    await client.connect();
    const collection = await client.db(db).collection(dbCollection);
    state.collection = collection;
    console.log('Connected to DB');
    return 1;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

exports.get = function () {
  return state.collection;
}

exports.close = async function (done) {
  if (state.client) {
    await state.client.close();
    state.client = null;
    state.collection = null;
    done();
  }
}