# 🧪 API Test Playground

**Monorepo pro testování různých API služeb pomocí [Bruno](https://www.usebruno.com/) a Vibe agentů.**

Tento projekt slouží jako **playground** pro vývoj, testování a výuku API testování. Obsahuje backendové služby, frontendové aplikace a komplexní testovací kolekce.

---

## ⚠️ Důležité informace

> **🔒 Toto repozitář má jediného vlastníka (maintainera):** @LukasKanka

- **Testy v `main`/`master` větvi** jsou pouze **ukázkové** a slouží pro demonstraci funkčnosti
- **Repo je určeno pro lokální použití** – klonujte si ho, experimentujte, učte se
- **Pokud chcete přispět:** Postupujte podle [sekce Přispívání](#🤝-přispívání) – **nepushujte přímo do `main`/`master`**
- **Fork a vlastní větev:** Pokud chcete experimentovat bez přispívání, vytvořte si **fork** a pracujte ve své vlastní větvi

---

## 🗺️ Rozcestník

| Služba | Backend | Frontend | Testy | Dokumentace |
|--------|---------|----------|-------|--------------|
| **PotterAPI** | [`backends/potter-api`](./backends/potter-api) | [`backends/potter-api/frontend`](./backends/potter-api/frontend) | [`apiTest/PotterAPI`](./apiTest/PotterAPI) | [bruno_test_scenario.md](./backends/potter-api/bruno_test_scenario.md) |
| **JsonPlaceholder** | ❌ Veřejné API | ❌ | [`apiTest/JsonPlaceholder`](./apiTest/JsonPlaceholder) | - |

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
# Spuštění všech testů (vyžaduje běžící backend pro PotterAPI)
npm run test:all

# Spuštění všech testů + spuštění backendu (automaticky)
npm run test:all:with-backend

# Spuštění pouze PotterAPI testů
npm run test:potter

# Spuštění testů s watch módem (automatické opakování)
npm run test:watch
```

> ⚠️ **Poznámka:** Testy pro **PotterAPI** vyžadují běžící backend na `localhost:3000`. 
> Testy pro **JsonPlaceholder** fungují bez backendu (používají veřejné API).
> Použij `npm run test:all:with-backend` pro automatické spuštění backendu i testů.

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

## 🤖 Vibe Agenti

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

- [🤖 Využití Vibe agentů v tomto monorepu](./docs/USING_VIBE_AGENTS.md) - Popis jak vám Vibe agenti mohou pomoci. [Mistral Vibe Code](https://mistral.ai/products/vibe/code/) nabízí po registraci velmi vstřícný free tarif s podporou vibe-cli nebo plán PRO za cca 450kč či nákup samotných tokenů.
- [PotterAPI – Testovací scénáře](./backends/potter-api/bruno_test_scenario.md) – Detailní průvodce testováním PotterAPI
- [Průvodce vytvářením kolekcí](./docs/COLECTION_GUIDE.md) – Jak přidat novou testovací kolekci
- [Architektura monorepa](./docs/) – Další dokumentace

---

## 🤝 Přispívání

Chcete přispět do tohoto monorepa? Dodržujte následující postup:

### 📌 Zásady
- **❌ Zakázáno:** Přímý push do `main` nebo `master` větve
- **✅ Povoleno:** Vytváření nových větví a Pull Requestů

### 🚀 Postup
1. Forkněte repozitář
2. Vytvořte novou větev pro svou změnu:
   ```bash
   git checkout -b feature/nova-funkce
   # nebo
   git checkout -b fix/oprava-chyby
   ```
3. Proveďte své změny a commitněte je:
   ```bash
   git commit -m 'Přidána nová funkce'
   ```
4. Pushněte změny na svou větev:
   ```bash
   git push origin feature/nova-funkce
   ```
5. Vytvořte **Pull Request** z vaší větve do `main`
6. Počkejte na review a schválení

### 📝 Pokyny pro Pull Request
- Napište jasný název a popis změny
- Odkazujte na příslušné issues (pokud existují)
- Udržujte commit zprávy čisté a popisné

---

## 📞 Podpora

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

---

## ⚖️ Licence a autorská práva

- **Zdrojový kód:** Tento projekt staví na open-source základech. Původní licence zachováváme v příslušných složkách.
- **Obsah a ochranné známky:** Veškerá práva k tématice, postavám a názvům ze světa Harryho Pottera patří J. K. Rowling a Warner Bros. Projekt slouží výhradně pro nekomerční vzdělávací účely.
