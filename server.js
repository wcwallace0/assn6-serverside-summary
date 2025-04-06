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

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

app.get("/query", async function(req, res) {
    try {
        const database = client.db('test');
        const col = database.collection('TEST');
        const query = { Name: req.query.Name };
        const doc = await col.findOne(query);
        res.send(doc);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});