const express = require("express");

const app = express.Router();

app.post("/", (req, res) => {
  try {
    const { amount, rate, year } = req.body;
    console.log(amount, rate, year);
    let total = amount * year;
    let maturity = amount * (((1 + rate / 100) ** year - 1) / (rate / 100));
    let gain = maturity - total;
    res.send({
      error: false,
      total,
      maturity,
      gain,
      message: "Calculation successful.",
    });
  } catch (error) {
    console.log(erro.message);
    res.send({ error: true, message: "Something went wrong." });
  }
});

module.exports = app;
