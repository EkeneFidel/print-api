const express = require("express");
const escpos = require("escpos");
escpos.Network = require("escpos-network");

const printerRoute = express.Router();

printerRoute.post("/", (req, res) => {
    try {
        const device = new escpos.Network("192.168.20.191", 9100);
        const options = { encoding: "GB18030" /* default */ };
        const printer = new escpos.Printer(device, options);

        device.open(function (error) {
            printer
                .font("a")
                .align("ct")
                .style("bu")
                .size(1, 1)
                .text("The quick brown fox jumps over the lazy dog")
                .text("敏捷的棕色狐狸跳过懒狗")
                .barcode("1234567", "EAN8")
                .table(["One", "Two", "Three"])
                .tableCustom(
                    [
                        {
                            text: "Left",
                            align: "LEFT",
                            width: 0.33,
                            style: "B",
                        },
                        { text: "Center", align: "CENTER", width: 0.33 },
                        { text: "Right", align: "RIGHT", width: 0.33 },
                    ],
                    { encoding: "cp857", size: [1, 1] } // Optional
                )
                .qrimage(
                    "https://github.com/song940/node-escpos",
                    function (err) {
                        this.cut();
                        this.close();
                    }
                );
        });
        res.status(200).send("Printed kot");
    } catch (error) {
        console.log(error);
        res.status(400).json({
            Message: error,
        });
    }
});

module.exports = printerRoute;
