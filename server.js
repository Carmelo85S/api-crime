import express from "express";
import axios from "axios";
import cors from 'cors';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = 3000;
app.use(cors());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Crime API",
            version: "1.0.0",
            description: "Crime API that returns latest crime data from Brottsplatskartan",
        },
        components: {
            schemas: {
            CrimeEvent: {
                type: "object",
                properties: {
                id: { type: "integer" },
                title: { type: "string" },
                location: { type: "string" },
                headline: { type: "string" },
                description: { type: "string" },
                published: { type: "string" },
                image: { type: "string" },
                link: { type: "string" },
                },
            },
            },
        },
    },
    apis: ["server.js"],
};
  

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /crime:
 *   get:
 *     summary: Retrieve a list of crimes
 *     description: A list of crimes from Helsingborg
 *     responses:
 *       200:
 *         description: A list of crimes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CrimeEvent'
 */

// Return all the crimes
app.get('/crime', async (req, res) => {
  try {
    const response = await axios.get("https://brottsplatskartan.se/api/events/?location=helsingborg&limit=5");
    res.json(response.data.data);
    console.log(response.data.data)
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching crime data.");
  }
});

/**
 * @swagger
 * /crimes/locations:
 *   get:
 *     summary: Retrieve crime headlines
 *     description: Returns an array of crime headlines from Helsingborg.
 *     responses:
 *       200:
 *         description: An array of crime headlines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */


// Return only headlines
app.get('/crimes/locations', async (req, res) => {
  try {
    const response = await axios.get("https://brottsplatskartan.se/api/events/?location=helsingborg&limit=5");
    const headlines = response.data.data.map(crime => crime.headline);
    res.json(headlines);
    console.log(response.data.data.map(crime => crime.headline));
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching crime locations data.");
  }
});

/**
 * @swagger
 * /crimes/search:
 *   get:
 *     summary: Get crimes by city
 *     description: Returns a list of crime events for the specified city.
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the city to search crimes for
 *     responses:
 *       200:
 *         description: A list of crime events from the selected city
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CrimeEvent'
 *       400:
 *         description: Missing city query parameter
 *       500:
 *         description: Server error while fetching crime data.
 */

// Return crimes data depending on city params
app.get('/crimes/search', async (req, res) => {
    try {
        const city = req.query.city;
    
        if (!city) {
            console.log("Ops...something is wrong, no city parameter");
            return res.status(400).send("City query parameter is required");
        }
  
        const response = await axios.get(`https://brottsplatskartan.se/api/events/?location=${city}&limit=5`);
        res.json(response.data.data);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching crime data.");
    }
});

/**
 * @swagger
 * /crimes/latest:
 *   get:
 *     summary: Get latest crimes by city
 *     description: Returns most recent crime events for the specified city.
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the city to search crimes for
 *     responses:
 *       200:
 *         description: Latest crime events from the selected city
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/CrimeEvent'
 *       400:
 *         description: Missing city query parameter
 *       500:
 *         description: Server error while fetching crime data.
 */

//Return only the latest crime event 
app.get('/crimes/latest', async (req, res) => {
    try {
        const city = req.query.city;
    
        if (!city) {
            console.log("Ops...something is wrong, city parameter is required");
            return res.status(400).send("City query parameter is required");
        }
  
        const response = await axios.get(`https://brottsplatskartan.se/api/events/?location=${city}&limit=5`);
        res.json(response.data.data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching crime data.");
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
