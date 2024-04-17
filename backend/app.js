const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const episodesRouter = require("./routes/episodes.route");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }));

app.use("/episodes", episodesRouter);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

app.use((req, res, next)=>{
    res.status(404).json({message:"route not found"});
})

app.use((err, req, res, next)=>{
    res.status(500).json({message:"something broke"});
})


module.exports = app;