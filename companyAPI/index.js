const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// For enkelhetens skyld lagrer vi bedriftsinformasjonen i minnet.
// I en produksjonsapplikasjon ville du sannsynligvis bruke en database.
let companies = [];

app.get('/company/:orgnr', async (req, res) => {
    const orgnr = req.params.orgnr;

    // Her skal du kalle Brønnøysundregisterets API med axios, og sende dataene tilbake til klienten.
    // Dette er bare et eksempel, du må erstatte URL og parametere med de riktige for Brønnøysundregisterets API.
    try {
        const response = await axios.get(`https://api.brreg.no/some-endpoint?orgnr=${orgnr}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data from Brønnøysundregisteret.' });
    }
});

app.post('/company', (req, res) => {
    const companyData = req.body;
    companies.push(companyData);
    res.status(200).json({ message: 'Company added successfully.' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
