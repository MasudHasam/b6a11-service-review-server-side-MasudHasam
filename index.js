const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


//basic api test
app.get('/', (req, res) => {
    res.send('server is running')
});


//final code line for this server.
app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
})