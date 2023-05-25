document.getElementById('company-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const orgnr = document.getElementById('orgnr').value;
    const note = document.getElementById('note').value;

    try {
        // Send a POST request to save the company info and the note
        const response = await fetch('http://localhost:3000/company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orgnr, note })
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();

            // Fetch and display the company info
            const companyInfo = await fetch(`http://localhost:3000/company/${orgnr}`).then(res => res.json());
            const companyInfoDiv = document.getElementById('company-info');
            companyInfoDiv.textContent = `Company name: ${companyInfo.name}, Note: ${note}`;
        } else {
            console.log('Error saving company info: ', await response.text());
        }
    } catch(err) {
        console.log('Fetch error: ', err);
    }
});
