document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('submit').addEventListener('click', async function(event) {
        event.preventDefault();
        
        let orgnr = document.getElementById('orgnr').value;

        // Sjekk om orgnr er definert
        if (!orgnr) {
            console.error("Orgnr must be provided.");
            return;
        }

        try {
        // Hent og vis informasjon om bedriften
        const response = await fetch(`http://localhost:3000/company/${orgnr}`);
        const companyInfo = await response.json();

        // Logg hele responsen til konsollen
        console.log('API Response:', companyInfo);

        let navn = companyInfo.navn || '';
        let organisasjonsform = companyInfo.organisasjonsform ? companyInfo.organisasjonsform.beskrivelse : '';
        let adresse = companyInfo.forretningsadresse ? companyInfo.forretningsadresse.adresse.join(', ') : '';

            const companyInfoDiv = document.getElementById('company-info');
            companyInfoDiv.textContent = `Company name: ${navn}, Orgnr: ${orgnr}, Organisasjonsform: ${organisasjonsform}, Adresse: ${adresse}`;
        } catch(err) {
            console.log('Fetch error: ', err);
        }
    });

    document.getElementById('save-info').addEventListener('click', async function(event) {
        event.preventDefault();

        const orgnr = document.getElementById('orgnr').value;
        const additionalInfo = document.getElementById('additional-info').value;

        // Sjekk om orgnr og additionalInfo er definert
        if (!orgnr || !additionalInfo) {
            console.error("Orgnr and additional info must be provided.");
            return;
        }

        try {
            // Send en POST forespørsel for å lagre informasjonen og notatet om bedriften
            const response = await fetch('http://localhost:3000/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orgnr, additionalInfo })
            });
            const data = await response.json();
            console.log('Additional info saved:', data);
            alert('Info saved!');
        
            // Sjekk om forespørselen var suksessfull
            if (response.ok) {
                console.log('Company info saved successfully');
            } else {
                console.log('Error saving company info: ', await response.text());
            }
        } catch(err) {
            console.log('Fetch error: ', err);
        }
    });
});

