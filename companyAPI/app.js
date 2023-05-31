document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('submit').addEventListener('click', async function (event) {
      event.preventDefault();
  
      let orgnr = document.getElementById('orgnr').value;
  
      // Check if orgnr is provided
      if (!orgnr) {
        console.error('Orgnr must be provided.');
        return;
      }
  
      try {
        // Fetch and display company information
        const response = await fetch(`http://localhost:3000/company/${orgnr}`);
        console.log('HTTP Response:', response);
        const companyInfo = await response.json();
  
        // Log the entire response to the console
        console.log('API Response:', companyInfo);
  
        let navn = companyInfo.navn || '';
        let organisasjonsform = companyInfo.organisasjonsform || '';
        let adresse = companyInfo.adresse || '';
        let hjemmeside = companyInfo.additionalData.hjemmeside || '';
        let naeringskode1 = companyInfo.additionalData.naeringskode1 || '';
        let antallAnsatte = companyInfo.additionalData.antallAnsatte || '';
        let postnummer = companyInfo.additionalData.postnummer || '';
        let poststed = companyInfo.additionalData.poststed || '';
  
        const companyInfoDiv = document.getElementById('company-info');
        companyInfoDiv.innerHTML = `
          <p>Bedrift navn: ${navn}</p>
          <p>Orgnr: ${orgnr}</p>
          <p>Organisasjonsform: ${organisasjonsform}</p>
          <p>Adresse: ${adresse}</p>
          <p>Hjemmeside: ${hjemmeside}</p>
          <p>Naeringskode: ${naeringskode1}</p>
          <p>Antall Ansatte: ${antallAnsatte}</p>
          <p>Postnummer: ${postnummer}</p>
          <p>Poststed: ${poststed}</p>
        `;
      } catch (err) {
        console.log('Fetch error: ', err);
      }
    });
  
    document.getElementById('save-info').addEventListener('click', async function (event) {
      event.preventDefault();
  
      const orgnr = document.getElementById('orgnr').value;
      const additionalInfo = document.getElementById('additional-info').value;
  
      // Check if orgnr and additionalInfo are provided
      if (!orgnr || !additionalInfo) {
        console.error('Orgnr and additional info must be provided.');
        return;
      }
  
      try {
        // Send a POST request to save the information and note about the company
        const response = await fetch('http://localhost:3000/company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orgnr, additionalData: { note: additionalInfo } }),
        });
        const data = await response.json();
        console.log('Additional info saved:', data);
        alert('Info saved!');
  
        // Check if the request was successful
        if (response.ok) {
          console.log('Company info saved successfully');
        } else {
          console.log('Error saving company info: ', await response.text());
        }
      } catch (err) {
        console.log('Fetch error: ', err);
      }
    });
  });
  