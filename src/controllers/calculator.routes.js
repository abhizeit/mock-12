app.post("/", (req, res) => {
  try {
    const { amount, rate, years } = req.body;
    amount = parseInt(amount);
    rate = parseInt(rate);
    years = parseInt(years);
    let total = amount * years;
    let maturity = amount * (((1 + rate / 100) ** years - 1) / (rate / 100));
    let gain = maturity - total;
    res.send({
      error: false,
      total,
      maturity,
      gain,
      message: "Calculation successful.",
    });
  } catch (error) {
    res.send({ error: true, message: "Something went wrong." });
  }
});
