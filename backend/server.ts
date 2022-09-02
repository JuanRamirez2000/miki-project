import express, { Express, Request, Response } from "express";
import { Client, LatLngLiteral } from "@googlemaps/google-maps-services-js";
import * as dotenv from 'dotenv';
import path from 'path';

const app: Express = express();
const port = process.env.PORT || 8080;
const client = new Client({});
dotenv.config();

app.use(express.static(path.join(__dirname, 'client', 'build')));

const G_MAPS_API_KEY: string = process.env.G_GEOCODING_API_KEY as string

app.get('/api/findPlace', async (req: Request, res: Response) => {
    let coordinates: LatLngLiteral | undefined;
    let result = await client.geocode({
        params: {
            key: G_MAPS_API_KEY,
            address: req.query.location as string
        }
    })
    if (result.status === 200){
        coordinates = result.data.results[0]?.geometry.location;
        res.send(coordinates);
    }
    else {
        res.end();
    }
});

app.get('/api', (req, res) => {
    res.send("testing");
});

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
)

app.listen(port, () => {
    console.log("Server Started on port", port)
})