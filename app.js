const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const printerRoute = require("./printer");

const app = express();
app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
    })
);
app.use("/print", printerRoute);

app.get("/", (req, res) => {
    res.send("Printer Api");
});

app.listen(3000, () => {
    console.log(`Listening on port: ${3000}`);
});
