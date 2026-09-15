# 🧪 API Test Playground

**Monorepo pro testování různých API služeb pomocí [Bruno](https://www.usebruno.com/) a Vibe agentů.**

Tento projekt slouží jako **playground** pro vývoj, testování a výuku API testování. Obsahuje backendové služby, frontendové aplikace a komplexní testovací kolekce.

---

## 🗺️ Rozcestník

| Služba | Backend | Frontend | Testy | Dokumentace |
|--------|---------|----------|-------|--------------|
| **PotterAPI** | [`backends/potter-api`](./backends/potter-api) | [`backends/potter-api/frontend`](./backends/potter-api/frontend) | [`apiTest/PotterAPI`](./apiTest/PotterAPI) | [bruno_test_scenario.md](./backends/potter-api/bruno_test_scenario.md) |

---

## 🚀 Rychlý start

### 1️⃣ Inicializace projektu

```bash
# Klonování repozitáře
git clone <repo-url>
cd api_test

# Instalace všech závislostí (využívá npm workspaces)
npm run setup
```

### 2️⃣ Spuštění backendů

```bash
# Spuštění všech backendů
npm run start:backends

# Nebo jednotlivě
npm run start:potter-api
```

Backend PotterAPI bude dostupný na **`http://localhost:3000`**.

### 3️⃣ Spuštění frontendů

```bash
# Spuštění PotterAPI frontend (Vue.js)
npm run start:potter-fe
```

Frontend bude dostupný na **`http://localhost:8080`**.

### 4️⃣ Spuštění testů

```bash
# Spuštění všech testů
npm run test:all

# Spuštění pouze PotterAPI testů
npm run test:potter

# Spuštění testů s watch módem (automatické opakování)
npm run test:watch
```

---

## 📁 Struktura monorepa

```
api_test/
├── README.md                          # Tento soubor (rozcestník)
│
├── package.json                      # Root package.json (npm workspaces)
│
├── backends/                         # Backendové služby
│   └── potter-api/                   # PotterAPI
│       ├── app.js                    # Hlavní Express.js aplikace
│       ├── routes/                  # API routy
│       ├── controllers/              # Kontrolery
│       ├── frontend/                # Frontend (Vue.js)
│       │   ├── public/               # Statické soubory
│       │   ├── src/                 # Zdrojové kódy
│       │   └── package.json          # Frontend závislosti
│       ├── bruno_test_scenario.md    # Dokumentace pro Bruno
│       └── README.md                 # Dokumentace PotterAPI
│
├── apiTest/                          # Testovací kolekce (Bruno)
│   └── PotterAPI/                    # Testy pro PotterAPI
│       ├── GET/                     # GET požadavky
│       ├── POST/                    # POST požadavky
│       └── AI/                      # AI-specifické testy
│
├── .github/                          # GitHub konfigurace
│   └── workflows/                    # CI/CD pipeline
│       └── api-tests.yml             # Automativké testování
│
└── .vibe/                            # Vibe agenti (budoucí)
    └── agents/                       # AI asistenti
```

---

## 🔧 Nástroje

### Bruno
**Moderní alternativa k Postmanu** – Open-source nástroj pro testování API.

- **GUI**: Otevřete `apiTest/` v Bruno aplikaci
- **CLI**: Použijte `npx @usebruno/cli run <cesta> -r`
- **Dokumentace**: [usebruno.com](https://www.usebruno.com/)

### Vibe CLI
**AI asistent pro vývoj** – Pomáhá s psaním testů, dokumentací a delegací úkolů.

---

## 🤖 Vibe Agenti *(plánováno)*

| Agent | Účel | Vyvolání |
|-------|-------|----------|
| **API Test Assistant** | Pomoc s psaním a spouštěním API testů | `/api-tester` |
| **Bruno Expert** | Specialista na Bruno CLI a testovací scénáře | `/bruno-expert` |
| **Learning Guide** | Výuka API testování pro nováčky | `/learning-guide` |

---

## 📝 Pridávání nové API služby

Chcete přidat novou API službu? Postupujte takto:

### 1. Vytvořte backend
```bash
mkdir -p backends/<nova-sluzba>
cd backends/<nova-sluzba>
npm init -y
# Přidejte svůj backend kód
```

### 2. Vytvořte testy
```bash
mkdir -p apiTest/<nova-sluzba>
# Přidejte Bruno testovací kolekce (.yml soubory)
```

### 3. Aktualizujte dokumentaci
- Přidejte řádek do tabulky v tomto README
- Vytvořte `backends/<nova-sluzba>/README.md`
- Případně vytvořte `backends/<nova-sluzba>/bruno_test_scenario.md`

### 4. Testujte
```bash
npm run test:all  # Spustí všechny testy včetně nových
```

---

## 🔄 CI/CD Pipeline

**Automatické testování** při každém pushu na `main` nebo `master` větvi:

- ✅ Spuštění backendu
- ✅ Čekání na inicializaci serveru
- ✅ Spuštění všech Bruno testů
- ✅ Reportování výsledků

Soubor: [`.github/workflows/api-tests.yml`](./.github/workflows/api-tests.yml)

---

## 📄 Dokumentace

- [PotterAPI – Testovací scénáře](./backends/potter-api/bruno_test_scenario.md) – Detailní průvodce testováním PotterAPI

---

## 🤝 Přispívání

1. Forkněte repozitář
2. Vytvořte feature branch (`git checkout -b feature/nova-funkce`)
3. Commitněte změny (`git commit -m 'Přidána nová funkce'`)
4. Pushněte na větev (`git push origin feature/nova-funkce`)
5. Vytvořte Pull Request

---

## 📞 Kontakt & Podpora

- **Issues**: [GitHub Issues](https://github.com/kankys/api_test/issues)
- **Diskuse**: Použijte GitHub Discussions

---

## 🏆 Technologie

| Technologie | Účel |
|------------|-------|
| **Node.js** | Backend runtime |
| **Express.js** | Web framework pro PotterAPI |
| **Vue.js** | Frontend framework |
| **Bruno** | API testování |
| **npm Workspaces** | Správa monorepa |
| **GitHub Actions** | CI/CD |
