const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
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
        const reviewsCollection = client.db("hungry-chef").collection("reviews");
        const topCollection = client.db("hungry-chef").collection("fan-favorite");

        //red food items using condition
        app.post('/foods', async (req, res) => {
            const limit = req.body.limit;
            const numLimit = parseFloat(limit)
            const query = {};
            const cursor = foodCollection.find(query);
            const result = await cursor.limit(numLimit).toArray();
            // console.log(limit, numLimit);
            res.send(result)
        });


        //load data according to id;
        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cursor = foodCollection.findOne(query);
            const result = await cursor;
            res.send(result);
        });

        // get review according to food items.
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const querry = { fid: id };
            const cursor = reviewsCollection.find(querry);
            const result = await cursor.toArray();
            res.send(result)
        })


        // //get review according to user id.
        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const querry = { userMail: id };
            const cursor = reviewsCollection.find(querry);
            const result = await cursor.toArray();
            res.send(result)
        })


        //post review in server.
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.send(result)
        })


        //this api is for delete
        app.delete('/reviewItems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewsCollection.deleteOne(query)
            res.send(result);
        })

        // top food get api
        app.get('/topfood', async (req, res) => {
            const querry = {};
            const cursor = topCollection.find(querry);
            let result = await cursor.toArray()
            result.reverse()
            result.sort((a, b) => {
                const nameA = a.index;
                const nameB = b.index;
                if (nameA > nameB) {
                    return -1;
                }
            });
            const count = (result.length);
            console.log(count);
            // result.slice(0, 2)
            res.send({ result, count });
        })

        //top food post api
        app.post('/topfood', async (req, res) => {
            const items = req.body;
            const result = await topCollection.insertOne(items);
            res.send(result);
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