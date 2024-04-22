const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://mrmabdullah2024:bXD6VM9ZLJn55sAn@cluster0.okzu8ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    const database = client.db("usersDB");
    const userColection = database.collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userColection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) };
      const user = await userColection.findOne(query);
      res.send(user)
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userColection.insertOne(user);
      res.send(result);
    })

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id
      const user = req.body;
      console.log(user);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email
        },
      };
      const result = await userColection.updateOne(query, updateUser,options);
      res.send(result);
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id
      console.log('delerrrr', id);
      const query = { _id: new ObjectId(id) };
      const result = await userColection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})