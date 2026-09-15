# Globální pokyny pro Vibe agenty v tomto monorepu

## 📌 Základní informace

Toto je **API Test Playground** monorepo pro testování různých API služeb pomocí Bruno a Vibe.

### Struktura repozitáře
```
api_test/
├── backends/              # Backendové služby (PotterAPI, atd.)
│   └── <služba>/
│       ├── app.js         # Backend server
│       └── frontend/       # Frontend aplikace (volitelné)
│
├── apiTest/               # Bruno testovací kolekce
│   └── <kolekce>/
│       ├── opencollection.yml  # Povinné
│       ├── GET/          # Endpoint složky
│       │   ├── folder.yml
│       │   └── test.yml
│       └── POST/         # Další endpointy
│
├── docs/                  # Dokumentace
│   └── COLECTION_GUIDE.md
│
├── .github/workflows/     # CI/CD pipeline
│   └── api-tests.yml
│
└── package.json           # Root package.json (npm workspaces)
```

## 🎯 Zásady pro všechny agenty

### 1. Kontext
- Vždy zvažuj, že uživatel pracuje v tomto monorepu
- Odkazuj na konkrétní cesty v tomto repozitáři
- Uváděj příklady z existujících kolekcí (PotterAPI, JsonPlaceholder)

### 2. Testování
- Testy se spouštějí z kořenové složky každé kolekce
- Používej `npx @usebruno/cli run -r`
- `test:all` spouští všechny kolekce
- `test:all:with-backend` spouští backend + všechny testy

### 3. Backend závislosti
- **PotterAPI** vyžaduje backend na `localhost:3000`
- **JsonPlaceholder** nepotřebuje backend (veřejné API)
- Nové lokální API vyžadují svůj vlastní backend

### 4. Větve a PR
- ❌ **ZAKÁZÁNO:** Přímý push do `main` nebo `master`
- ✅ **POVINNÉ:** Vytvoř novou větev a udělej Pull Request

## 🤖 Dostupní agenti

| Agent | Účel | Vyvolání |
|-------|-------|----------|
| **API Test Assistant** | Pomoc s psaním a spouštěním API testů | `/api-tester` |
| **Bruno Expert** | Specialista na Bruno CLI a testovací scénáře | `/bruno-expert` |
| **Learning Guide** | Výuka API testování pro nováčky | `/learning-guide` |

## 🔧 Technické detaily

### NPM Workspaces
- Repozitář používá npm workspaces
- Backendy a testy jsou samostatné workspaces
- `npm install` v rootu nainstaluje všechny závislosti

### CI/CD Pipeline
- `.github/workflows/api-tests.yml`
- Automaticky spouští všechny testy při pushu na main
- Spouští backend před testováním

### Bruno CLI
- `npx @usebruno/cli run -r` - Spustí všechny testy v kolekci
- `npx @usebruno/cli run <cesta> -r` - Spustí specifický test

## 💡 Typické pracovní postupy

### Přidání nové API služby
1. Vytvoř `backends/<služba>/` s backendovým kódem
2. Vytvoř `apiTest/<služba>/` s testy
3. Přidej kolekci do README.md rozcestníku

### Spouštění testů
```bash
# Všechny testy (vyžaduje běžící backends)
npm run test:all

# Všechny testy + spuštění backendu
npm run test:all:with-backend

# Specifická kolekce
cd apiTest/<kolekce>
npx @usebruno/cli run -r
```

## 📚 Dokumentace

- [README.md](../README.md) - Hlavní rozcestník
- [COLECTION_GUIDE.md](../docs/COLECTION_GUIDE.md) - Průvodce vytvářením kolekcí
- [bruno_test_scenario.md](../backends/potter-api/bruno_test_scenario.md) - Detailní scénáře pro PotterAPI

---

*Poslední aktualizace: 15. září 2026*