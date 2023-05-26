import 'whatwg-fetch';

document.getElementById('company-form').addEventListener('submit', async function(event) {
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

        // Sjekk om forespørselen var suksessfull
        if (response.ok) {
            const data = await response.json();

            // Hent og vis informasjon om bedriften
            const companyInfo = await fetch(`http://localhost:3000/company/${orgnr}`).then(res => res.json());

            // Logg bedriftsinformasjonen til konsollen
            console.log(companyInfo);

            const companyInfoDiv = document.getElementById('company-info');
            companyInfoDiv.textContent = `Company name: ${companyInfo.name}, additionalInfo: ${companyInfo.additionalInfo}`;
        } else {
            console.log('Error saving company info: ', await response.text());
        }
    } catch(err) {
        console.log('Fetch error: ', err);
    }
});

