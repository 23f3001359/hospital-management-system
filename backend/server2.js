const express = require('express');
const morgan = require('morgan');

const app = express();

const port = 3000;

app.use(morgan('tiny'));
app.use(express.json())

app.get("/", (req, res)=>{
    console.log(req.body);
    res.send("Hello");
})

app.get("/error", (req, res)=>{
    console.log(req.body);
    res.status(500).json({
        message: "Internal Server Error"
    });
})

app.listen(port, ()=>{
    console.log("Test server is running")
})