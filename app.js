const express = require('express')
const printerRoute = require("./printer")

const app = express()

app.use("/print", printerRoute);

app.listen(3000, () => {
    console.log(`Listening on port: ${3000}`);
});