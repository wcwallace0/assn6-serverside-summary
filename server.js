const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require('dotenv').config();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))

app.set("views", "views");
app.set("view engine", "pug");

app.get("/", function(req, res) {
    res.render("home");
});

app.listen(3018, function() {
    console.log("Listening on port 3018...");
});

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.get("/query", async function(req, res) {
    let query = {};
    if(req.query.country) {
        query.country = req.query.country;
    }
    if(req.query.rank) {
        query.rank = parseInt(req.query.rank);
    }
    console.log(query);
    try {
        await client.connect();
        const database = client.db('countries');
        const countries = database.collection('COUNTRIES');
        const result = await countries.findOne(query, {projection: { _id: 0, country: 1, rank: 1, pop2023: 1, area: 1 }});
        console.log(result);
        res.send(result);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});