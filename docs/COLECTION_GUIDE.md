# 📚 Průvodce vytvářením nové testovací kolekce

Tento návod vysvětluje, jak přidat **novou testovací kolekci** do `apiTest/` tak, aby byla **automaticky detekována** jak lokálně (`npm run test:all`), tak v CI/CD pipeline.

---

## 🎯 Rychlý start

### 1. Vytvoř základní strukturu
```bash
# Nahraď <název-kolekce> názvem své nové kolekce
mkdir -p apiTest/<název-kolekce>/Endpoint1
mkdir -p apiTest/<název-kolekce>/Endpoint2
```

### 2. Přidej konfigurační soubor kolekce
Vytvoř `apiTest/<název-kolekce>/opencollection.yml`:
```yaml
opencollection: 1.0.0

info:
  name: <Název Tvé Kolekce>
  type: collection

request:
  auth: inherit

bundled: false

extensions:
  bruno:
    ignore:
      - node_modules
      - .git
```

### 3. Vytvoř složky pro endpointy
Pro každý typ požadavků vytvoř složku s `folder.yml`:
```yaml
# apiTest/<název-kolekce>/Endpoint1/folder.yml
info:
  name: Endpoint1
  type: folder
  seq: 1

request:
  auth: inherit
```

### 4. Přidej testovací soubory
Vytvoř `.yml` soubor pro každý test:
```yaml
# apiTest/<název-kolekce>/Endpoint1/Název-testu.yml
info:
  name: Název testu
  type: http
  seq: 1

http:
  method: GET  # nebo POST, PUT, DELETE
  url: https://api.example.com/endpoint
  auth: inherit
  headers:
    - name: Content-Type
      value: application/json

runtime:
  scripts:
    - type: tests
      code: |-
        const status = res.getStatus();
        const body = res.getBody();
        
        test("Status code is 200", function() {
          expect(status).to.equal(200);
        });
        
        test("Response is valid", function() {
          expect(body).to.not.be.empty;
        });

settings:
  encodeUrl: true
  timeout: 10000
  followRedirects: true
  maxRedirects: 5
```

---

## 📁 Příklady struktury

### Příklad 1: Veřejné API (bez backendu)
```
apiTest/JsonPlaceholder/
├── opencollection.yml
├── Users/
│   ├── folder.yml
│   └── Get-all-users.yml
└── Posts/
    ├── folder.yml
    ├── Get-post-by-ID.yml
    └── Create-new-post.yml
```

### Příklad 2: Lokální API (s backendem)
```
apiTest/MyLocalAPI/
├── opencollection.yml
├── GET/
│   ├── folder.yml
│   ├── Get-all-items.yml
│   └── Get-item-by-ID.yml
└── POST/
    ├── folder.yml
    └── Create-new-item.yml
```

---

## 🚀 Automatická detekce

### Lokálně
Skript `npm run test:all` **automaticky najde všechny kolekce** v `apiTest/` a spustí jejich testy.

### V CI/CD (GitHub Actions)
Pipeline používá stejný princip a spustí testy pro všechny kolekce.

---

## ⚙️ Důležité poznámky

### 1. Bruno CLI požadavky
- **Kořenová složka kolekce** musí obsahovat `opencollection.yml`
- **Každá kolekce** musí být ve své vlastní složce v `apiTest/`
- **Bruno CLI** musí být spuštěn **z kořenové složky kolekce**

### 2. Typy API

| Typ | Příklad | Vyžaduje backend? | URL příklad |
|-----|---------|-------------------|-------------|
| **Veřejné API** | JSONPlaceholder, OpenWeather | ❌ Ne | `https://api.example.com` |
| **Lokální API** | PotterAPI | ✅ Ano | `http://localhost:3000` |
| **Mock API** | json-server, MSW | ✅/❌ | `http://localhost:3001` |

### 3. Backend závislosti
Pokud testy vyžadují místní backend:
- Ujistěte se, že backend běží před spuštěním testů
- Použijte `npm run test:all:with-backend` pro automatické spuštění
- Nebo spusťte backend ručně: `cd backends/<služba> && npm start`

---

## 📝 Kompletní příklad: OpenWeather API

### 1. Vytvoř strukturu
```bash
mkdir -p apiTest/OpenWeather/Current
```

### 2. Vytvoř opencollection.yml
```yaml
opencollection: 1.0.0
info:
  name: OpenWeather
request:
  auth: inherit
bundled: false
```

### 3. Vytvoř složku pro endpoint
```yaml
# apiTest/OpenWeather/Current/folder.yml
info:
  name: Current Weather
  type: folder
  seq: 1
request:
  auth: inherit
```

### 4. Vytvoř test
```yaml
# apiTest/OpenWeather/Current/Get-current-weather.yml
info:
  name: Get current weather by city
  type: http
  seq: 1

http:
  method: GET
  url: https://api.openweathermap.org/data/2.5/weather
  params:
    - name: q
      value: London
      type: query
    - name: appid
      value: YOUR_API_KEY
      type: query
  auth: inherit

runtime:
  scripts:
    - type: tests
      code: |-
        test("Status code is 200", function() {
          expect(res.getStatus()).to.equal(200);
        });
        
        test("Response has weather data", function() {
          expect(res.getBody()).to.have.property('weather');
        });

settings:
  encodeUrl: true
  timeout: 10000
```

---

## 🔧 Řešení problémů

### ❌ Problém: "You can run only at the root of a collection"
**Příčina:** Bruno CLI je spuštěn z nesprávného adresáře.

**Řešení:** Spouštěj vždy z kořenové složky kolekce (kde je `opencollection.yml`)

### ❌ Problém: Testy pro lokální API selhávají
**Příčina:** Backend není spuštěn.

**Řešení:** Použij `npm run test:all:with-backend` nebo spusť backend ručně

### ❌ Problém: "Path not found"
**Příčina:** Špatná cesta k testu.

**Řešení:** Zkontroluj cesty a existenci všech souborů

---

## 💡 Tipy

1. **Nazví složky konvenčně:** Používej `-` místo mezer
2. **Sekvence testů:** Používej `seq:` pro určení pořadí
3. **Dokumentace:** Přidej `README.md` do každé nové kolekce
4. **Testuj postupně:** Začni s jednoduchými testy a přidávej komplexnější

---

## 📚 Další zdroje

### Bruno
- [Bruno Dokumentace](https://www.usebruno.com/docs) – Oficiální dokumentace
- [Bruno GitHub](https://github.com/usebruno/bruno) – Open-source repozitář

### Testování
- [Chai Assertion Library](https://www.chaijs.com/) – Dokumentace testovací knihovny

### Vibe & Mistral AI
- [Mistral AI](https://mistral.ai/) – Hlavní web společnosti
- [Mistral AI Dokumentace](https://docs.mistral.ai/) – Oficiální dokumentace
- [Vibe Code](https://mistral.ai/products/vibe/code) – AI asistent pro vývoj

---

*Poslední aktualizace: 15. září 2026*