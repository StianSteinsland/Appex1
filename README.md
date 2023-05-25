# Appex1
Bedriftsinformasjons App
Dette er en webapplikasjon som lar deg lagre potensielle kunder basert på oppslag/data om bedrifter fra Brønnøysundregisteret. Du kan også registrere/lagre ekstra informasjon om hver bedrift, som for eksempel et notat.

Oppsett
For å kjøre dette prosjektet lokalt, følg disse stegene:

Klone dette repository til din lokale maskin.
Gå inn i prosjektmappe og installer avhengigheter ved å kjøre npm install.
Kjør serveren ved å bruke kommandoen node index.js.
Åpne nettleseren og gå til http://localhost:3000 for å se applikasjonen.
Bruk
Du kan søke etter en bedrift ved å bruke organisasjonsnummeret. Skriv inn organisasjonsnummeret i input-feltet og klikk på "Submit"-knappen. Informasjon om bedriften vil deretter bli vist under.

Du kan også skrive inn et notat om bedriften i input-feltet merket "Enter a note" før du sender inn skjemaet. Dette notatet vil da bli lagret og vist sammen med bedriftsinformasjonen.

API
Denne appen bruker data fra Brønnøysundregisteret og andre åpne APIer for å hente informasjon om bedrifter. Se data.norge.no for mer informasjon.