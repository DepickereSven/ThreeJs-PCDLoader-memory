const express = require("express");
const indexRouter = require("./routes");

// Set up the express app
const app = express();


app.use('/', indexRouter);

const PORT = 9561;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});