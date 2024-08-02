// Package name is express
const express = require("express");

// Create a new instance of express
const app = express("express");

// Setup a route for the home page, "/"
app.get("/", (req, res) => {
  res.send(`<h1>Hello! Welcome?</h1>`);
});

// Listen at port 3000
app.listen(3000);
