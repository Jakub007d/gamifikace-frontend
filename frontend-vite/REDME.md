Pre lokálne spustenie frontendu je potrebné :

1. Mať nainštalované Node.js a správcu systému balíčkov npm to je zvyčajne nainštalované spolu s Node.js https://nodejs.org/en

2.Následne je nutné v adresári projektu pomocou príkatu `npm install vite` nainštalovať nástroj pre building typescriptových projektov vite

3. V súbore `/src/constants.tsx` je potrebné zmeniť adresu endpointov pokiaľ je nutné mať spustený backend lokálne.

4. Frontendový sever je spustiteľný príkazom `npm run dev`