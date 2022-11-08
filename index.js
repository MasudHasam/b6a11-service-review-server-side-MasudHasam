const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


//mongo bd connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d0ctt95.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const collection = client.db("test").collection("devices");
async function run() {

    try {
        const foodCollection = client.db("hungry-chef").collection("foods");


        //get all food items.
        app.get('/foods', async (req, res) => {
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.limit(3).toArray();
            console.log(result);
            res.send(result)
        })

    }
    finally {

    }

}
run().catch(error => console.log(error));




//basic api test
app.get('/', (req, res) => {
    res.send('server is running')
});

//final code line for this server.
app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
})