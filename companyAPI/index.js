const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// For enkelhetens skyld lagrer vi bedriftsinformasjonen i minnet.
// I en produksjonsapplikasjon ville jeg sannsynligvis brukt en database.
let companies = [];

app.get('/company/:orgnr', async (req, res) => {
    const orgnr = req.params.orgnr;

    // Her skal du kalle Brønnøysundregisterets API med axios, og sende dataene tilbake til klienten.
    try {
        const [brregResponse, dataNorgeResponse] = await Promise.all([
            axios.get(`https://data.brreg.no/enhetsregisteret/oppslag/enheter/974761076`),
            axios.get(`https://data.norge.no/organizations/974761076`),        

        ]);

        const companyData = {
            ...brregResponse.data,
            additionalData: dataNorgeResponse.data
        };

        res.json(companyData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.post('/company', (req, res) => {
    const companyData = req.body;
    const existingCompanyIndex = companies.findIndex(company => company.orgnr === companyData.orgnr);
    
    if (existingCompanyIndex >= 0) {
        companies[existingCompanyIndex].additionalInfo = companyData.additionalInfo;
    } else {
        companies.push(companyData);
    }
    
    res.status(200).json({ message: 'Company added/updated successfully.' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
