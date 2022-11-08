const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


//basic api.
app.get('/', (req, res) => {
    res.send('your server is running')
})



//last part listen to the port.
app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
})
