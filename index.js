const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const connectionString = process.env.MONGODB_CONNECTION_STRING;
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/products", productRouter);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(port, () => {
    console.log(`The server started at port ${port}`);
});
