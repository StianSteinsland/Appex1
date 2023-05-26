document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();

    const orgnr = document.getElementById('orgnr').value;
    if (!orgnr) {
        console.error("Orgnr must be provided.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/company/${orgnr}`);
        if (response.ok) {
            const data = await response.json();
            const companyInfoDiv = document.getElementById('company-info');
            companyInfoDiv.textContent = `Company name: ${data.navn}, Organisasjonsform: ${data.organisasjonsform}, Postadresse: ${data.postadresse}`;
        } else {
            console.log('Error fetching company info: ', await response.text());
        }
    } catch(err) {
        console.log('Fetch error: ', err);
    }
});

document.getElementById('save-info').addEventListener('click', async function(event) {
    event.preventDefault();

    const orgnr = document.getElementById('orgnr').value;
    const additionalInfo = document.getElementById('additional-info').value;

    if (!orgnr || !additionalInfo) {
        console.error("Orgnr and additional info must be provided.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orgnr, additionalInfo })
        });

        if (response.ok) {
            console.log('Company info saved successfully.');
        } else {
            console.log('Error saving company info: ', await response.text());
        }
    } catch(err) {
        console.log('Fetch error: ', err);
    }
});
