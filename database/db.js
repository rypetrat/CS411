const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rypetrat:0D5wd0qshCTVlug8@healthdiagnositctool.udl2fof.mongodb.net/?retryWrites=true&w=majority&appName=HealthDiagnositcTool";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function insertData(data) {
    try {
      const database = client.db('main');
      const collection = database.collection('dataCollection');
      const result = await collection.insertOne(data);
      console.log('Inserted document:', result.insertedId);
    } catch (err) {
      console.error('Error inserting document:', err);
    }
  }
  
// testing insertion into db
const data = { user: 'ryan', data: "test test test", day: "March 4th" };
insertData(data);
