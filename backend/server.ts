import express, { Express } from "express";
import { Client, LatLngLiteral } from "@googlemaps/google-maps-services-js";
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import cors from 'cors';
import * as dotenv from 'dotenv';

const app: Express= express();
const port = process.env.PORT || 8080;
const client = new Client({});
const secretClient = new SecretManagerServiceClient();
const secretName = 'projects/865442466714/secrets/G_GEOCODING_API_KEY/versions/2';
dotenv.config();

app.use(cors())

const getSecret = async () => {
    try {
        const [secret] = await secretClient.accessSecretVersion({
            name: secretName
        })
        return secret.payload?.data?.toString();
    }
    catch(err) {
        console.log(err);
    }
}
app.get('/api/findPlace', async (req, res) => {
    let coordinates: LatLngLiteral;
    let G_GEOCODING_API_KEY = await getSecret() as string;
    try {
        let result = await client.geocode({
            params: {
                key: G_GEOCODING_API_KEY as string,
                address: req.query.location as string
            }
        })
        if (result.status === 200){
            coordinates = result.data.results[0]?.geometry.location;
            res.send(coordinates)
        }
    }
    catch (err) {
        res.send(err);
    }
})
app.get('/api/', (req, res) => {
    console.log('test');
    res.send("test");
})

app.listen(port, () => {
    console.log("Server Started on port", port)
})