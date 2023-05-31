const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

let companies = [];

app.get('/company/:orgnr', async (req, res) => {
    const orgnr = req.params.orgnr;
  
    try {
      const [brregResponse, dataNorgeResponse] = await Promise.all([
        axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`),
        axios.get(`https://data.norge.no/organizations/${orgnr}`),
      ]);
  
      console.log('Brreg response:', brregResponse.data);
      console.log('Data Norge response:', dataNorgeResponse.data);

      const companyData = {
        organisasjonsnummer: brregResponse.data.organisasjonsnummer,
        navn: brregResponse.data.navn,
        organisasjonsform: brregResponse.data.organisasjonsform?.beskrivelse || '',
        adresse: brregResponse.data.forretningsadresse?.adresse.join(', ') || '',
        additionalData: {
          hjemmeside: dataNorgeResponse.data.hjemmeside || '',
          naeringskode1: brregResponse.data.naeringskode1?.beskrivelse || '',
          antallAnsatte: brregResponse.data.antallAnsatte || '',
          postnummer: brregResponse.data.forretningsadresse?.postnummer || '',
          poststed: brregResponse.data.forretningsadresse?.poststed || '',
        },
      };
  
      console.log('Brreg response:', brregResponse.data);
      console.log('Data Norge response:', dataNorgeResponse.data);

      res.json(companyData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  });
  

app.post('/company', (req, res) => {
  const companyData = req.body;
  const existingCompanyIndex = companies.findIndex(
    (company) => company.organisasjonsnummer === companyData.organisasjonsnummer
  );

  if (existingCompanyIndex >= 0) {
    companies[existingCompanyIndex] = {
      ...companies[existingCompanyIndex],
      additionalData: {
        ...companies[existingCompanyIndex].additionalData,
        note: companyData.additionalData.note,
      },
    };
  } else {
    companies.push(companyData);
  }

  res.status(200).json({ message: 'Company added/updated successfully.' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

