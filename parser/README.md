# PARSER DEL BANDO DELLA POLIZIA DI STATO

* Posizionare il bando in PDF nella cartella assets, seguendo le indicazioni nel README.md lì presente.
* Eseguire lo script index.js tramite NodeJS.
* Verificare che venga stampato in console il numero corretto di domande presenti nel bando.
* Saranno creati due file TXT nella cartella assets per facilitare il debug in caso di errore.
* Lo script genererà un file JSON nella cartella ui/src/assets.

---

## Il file JSON di output ha la seguente struttura:

    BANCA_DATI = [
      {
        section: string; // Nome sezione, eg "Codice Penale"
        qa: [
          {
            question: string; // Domanda, eg "1234. come ti chiami?"
            answers: [
              {
                label: string; // Risposta, eg "Mi chiamo Vito."
                isCorrect: boolean; // True se la risposta è quella corretta.
              }
            ]
          }
        ]
      }
    ]

