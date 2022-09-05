import express from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import * as dotenv from 'dotenv';

const app= express();
const port = process.env.PORT || 8080;
const client = new Client({});
dotenv.config();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://miki-photobook.wl.r.appspot.com/") ;
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const G_MAPS_API_KEY = process.env.G_GEOCODING_API_KEY

app.get('/api/findPlace', async (req, res) => {
    let coordinates;
    try {
        let result = await client.geocode({
            params: {
                key: G_MAPS_API_KEY,
                address: req.query.location
            }
        })
        if (result.status === 200){
            coordinates = result.data.results[0]?.geometry.location;
            res.send(coordinates);
        }
    }
    catch (err) {
        console.log(`Error of ${err}`)
        next(err);
    }
});

app.get('/api/', (req, res) => {
    console.log("This is a test");
    res.send(G_MAPS_API_KEY);
})

app.listen(port, () => {
    console.log("Server Started on port", port)
})