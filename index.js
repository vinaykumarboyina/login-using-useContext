const express = require('express');
const app = express();
const connectDB  = require('./database/connection');
const dotenv = require("dotenv");
dotenv.config();
const bp = require("body-parser");

const cors = require('cors');
app.use(express.json());
app.use(bp.json({}));
app.use(bp.urlencoded({extended:true}))

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionsSuccessStatus: 200
// }

app.use(cors());

//load assets
app.use('/', require('./routes/router'));

//calling database
connectDB();
app.use(express.urlencoded({ extended: false }))

app.use('/uploads',express.static('./uploads'))

app.listen(process.env.PORT, () => {
  console.log("server running....");
});
