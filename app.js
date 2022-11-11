const express = require('express')
const bodyParser = require("body-parser");

const printerRoute = require("./printer")

const app = express()
app.use(bodyParser.json());


app.use("/print", printerRoute);

app.listen(3000, () => {
    console.log(`Listening on port: ${3000}`);
});