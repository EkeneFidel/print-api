const express = require("express");
const escpos = require('escpos');
escpos.Network = require('escpos-network');




const printerRoute = express.Router()

printerRoute.post("/", (req, res) => {
  try {
    const printType = req.body.printType
    const params = {}
    if( printType === "kot"){
      params.ipAddress = req.body.ipAddress
      params.kotId = req.body.kotId
      params.customer = req.body.customer
      params.waiter = req.body.waiter
      params.table = req.body.table
      params.area = req.body.area
      params.items = req.body.items
    }

    const device  = new escpos.Network(params.ipAddress, 9100);
    const options = { encoding: "GB18030" /* default */ }

    const printer = new escpos.Printer(device, options);

    device.open(function(error){
      printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text(`KOT ID: ${params.kotId}`)
      .drawLine()
      .text(`Customer: ${params.customer}`)
      .drawLine()
      .text(`Waiter: ${params.waiter}`)
      .drawLine()
      .text(`Print Area: ${params.area}`)
      .drawLine()
      .text(`Table: ${params.table}`)
      .text(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
      .cut()
      .close()

    });
    res.status(200).send("Printed kot")
  } catch (error) {
    console.log(error)
    res.status(400).json({
      Message: error
    })
  }
  





})

module.exports = printerRoute

