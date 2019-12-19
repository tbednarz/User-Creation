const express = require("express");
const userRouter = require("./routers/user");

require("./db/mongoose");
// const db = client.db

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

// catch 404 and forward to error handler
app.listen(port, () => {
  console.log("server running on port: " + port);
});
// error handler
