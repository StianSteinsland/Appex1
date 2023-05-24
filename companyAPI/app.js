document.getElementById('company-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const orgnr = document.getElementById('orgnr').value;

    try {
        const response = await fetch(`http://localhost:3000/company/${orgnr}`);
        const data = await response.json();
        const companyInfoDiv = document.getElementById('company-info');
        companyInfoDiv.textContent = `Company name: ${data.name}`;
    } catch(err) {
        console.log('Fetch error: ', err);
    }
});
