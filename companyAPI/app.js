document.getElementById('company-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const orgnr = document.getElementById('orgnr').value;

    // Hent informasjon om bedriften og vis den på siden.
    fetch(`http://localhost:3000/company/${orgnr}`)
        .then(response => response.json())
        .then(data => {
            // Vis data på siden.
        });
});
fetch(`http://localhost:3000/company/${orgnr}`)
    .then(response => response.json())
    .then(data => {
        const companyInfoDiv = document.getElementById('company-info');
        companyInfoDiv.textContent = `Company name: ${data.name}`;
    });
