## Automated API Testing (Bruno)

Automatické testování REST API je postaveno na nástroji [Bruno](https://www.usebruno.com/). Testovací kolekce je uložena přímo v repozitáři ve složce `apiTest/PotterAPI` a je verzována společně s kódovým základem.

### Lokální spuštění testů

Testy lze spouštět přímo z grafického rozhraní aplikace Bruno, nebo přes příkazovou řádku (CLI).

#### 1. Pomocí Bruno GUI
1. Otevřete aplikaci Bruno.
2. Zvolte **Open Collection** a vyberte složku `apiTest/PotterAPI` v tomto repozitáři.
3. Spusťte jednotlivé požadavky nebo celou kolekci přes **Runner**.

#### 2. Pomocí Bruno CLI
Ujistěte se, že běží lokální server (standardně na `http://127.0.0.1:3000`), a spusťte:

```bash
# Spuštění testů v terminálu
npx @usebruno/cli run apiTest/PotterAPI -r

# Spuštění testů s vygenerováním HTML reportu
npx @usebruno/cli run apiTest/PotterAPI -r --reporter-html report.html
