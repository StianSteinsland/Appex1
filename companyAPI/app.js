document.getElementById('save-info').addEventListener('click', function(event) {
    event.preventDefault();

    const orgnr = document.getElementById('orgnr').value;
    const additionalInfo = document.getElementById('additional-info').value;
    // Hent informasjon om bedriften og vis den på siden.
    fetch(`http://localhost:3000/company`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orgnr, additionalInfo }),
    })
    .then(response => response.json())
    .then(data => { // Vis data på siden.
        console.log('Company info saved: ', data);
    });
});
