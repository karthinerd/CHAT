const express = require("express");
const cors = require("cors");
const { connectDB } = require("./DataBase/db");
const  userRouter  = require("./Routes/UserRoutes");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

connectDB(process.env.MONGO_URL);

app.use('/api/auth',userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server Started On ${process.env.PORT}`);
});
