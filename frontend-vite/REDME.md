Pre lokálne spustenie frontendu je potrebné :

1. Mať nainštalované Node.js a správcu systému balíčkov npm to je zvyčajne nainštalované spolu s Node.js https://nodejs.org/en

2. Následne je nutné v adresári projektu pomocou príkatu `npm install vite` nainštalovať nástroj pre building typescriptových projektov vite

3. V súbore `/src/constants.tsx` je možné zmeniť adresu endpointov ak bude treba. V základe je nastavená lokálna adresa s defaultným portom ktorý django priradzuje k lokalnej inštancii servera v tvare : `http://127.0.0.1:8000`.

4. Frontendový sever je spustiteľný príkazom `npm run dev`
---------------------------------------
Aplikáciu bude takito možné spustiť po dobu 3 mesiacov aj z webovej lokality https://gamifikace.online/

Aplikáciu je taktiež možno nainštalovať na mobil alebo počítač ako PWA aplikáciu. Príklad ako takúto aplikáciu inštalovať je na stránke https://www.cdc.gov/niosh/mining/content/hearingloss/installPWA.html

V súčastnom stave je možné v aplikácii vytvárať otázky, pridávať si navštevované predmety, študovať pomocov študijneho módu, komentovať otázky a účastniť sa výzvy za účelom bodového zisku.

Pridanie nových okruhov, kurzov a účtov je možné pomocou backendu

Uživateľské údaje na testovanie aplikácie:

- Uživateľské meno: testovací_uživatel
- Heslo: Heslo123123!

Všetky zdrojové kódy sa nachádzajú v adresári src
