# 🤖 Využití Vibe agentů v tomto monorepu

Tento návod vysvětluje, jak **používat Vibe agenty** pro efektivnější práci s tímto monorepo. Agenti jsou navrženi tak, aby vám pomohli s vývojem, testováním a výukou API.

---

## ⚙️ Instalace a nastavení

### 1. Instalace Vibe CLI

Před použitím agentů se ujistěte, že máte nainstalovaný **Vibe CLI**:

```bash
# Nainstaluj Vibe CLI globálně
npm install -g @vibe-cli/vibe

# Nebo použij npx pro jednorázové použití
npx @vibe-cli/vibe
```

### 2. Nastavení v tomto repozitáři

Vibe agenti jsou **předkonfigurování** pro použití v tomto monorepu.

```bash
# Přejdi do kořenové složky repozitáře
cd /cesta/k/tvemu/api_test

# Nyní můžeš přímo vyvolat agenty
/api-tester
```

> **⚠️ Důležité:** Agenti fungují nejlépe, když jsi **v kořenové složce** tohoto repozitáře (`api_test/`). Zde mají přístup ke struktuře repozitáře, konfiguraci a dokumentaci.

---

## 🎯 Dostupní agenti

| Agent | Účel | Vyvolání | Kdy použít |
|-------|-------|----------|------------|
| **API Test Assistant** | Pomoc s vytvářením, úpravou a spouštěním API testů | `/api-tester` | Potřebuji vytvořit nové testy, opravit selhávající testy, spustit testy |
| **Bruno Expert** | Specialista na Bruno CLI a pokročilé funkce | `/bruno-expert` | Potřebuji pomoci s Bruno syntaxí, řetězením testů, sdílenými proměnnými |
| **Learning Guide** | Výuka API testování krok za krokem | `/learning-guide` | Jsem nováček, chci se naučit základy API testování |

---

## 🚀 Jak agenty vyvolat

### V rozhovoru s Vibe CLI
Jednoduše napište příslušný příkaz:

```
/api-tester
```

nebo

```
/bruno-expert
```

Vibe automaticky aktivuje příslušného agenta a poskytne mu kontext tohoto repozitáře.

---

## 📝 Příklady použití

### Příklad 1: Vytvoření nového testu
**Situace:** Chcete vytvořit test pro nový endpoint v JsonPlaceholder API.

```
/api-tester
Vytvoř nový test pro endpoint POST /posts v JsonPlaceholder kolekci
```

**Očekávaná odpověď:**
- Agent navrhne strukturu nového testu
- Ukáže, kam soubor uložit
- Poskytne ukázkový YAML kód

---

### Příklad 2: Oprava selhávajícího testu
**Situace:** Test vrací chybu "You can run only at the root of a collection"

```
/api-tester
Můj test selhává s chybou "You can run only at the root of a collection"
```

**Očekávaná odpověď:**
- Agent vysvětlí příčinu chyby
- Ukáže, jak spustit test ze správného adresáře
- Poskytne příklad příkazu

---

### Příklad 3: Pokročilé Bruno funkce
**Situace:** Potřebujete vytvořit řetězec testů (CREATE → READ → UPDATE → DELETE)

```
/bruno-expert
Jak vytvořím CRUD testovací řetězec v Bruno?
```

**Očekávaná odpověď:**
- Vysvětlení principu řetězení
- Ukázka použití `bru.setEnvVar()`
- Kompletní příklad YAML souborů

---

### Příklad 4: Výuka základů
**Situace:** Jste nováček a chcete se naučit, co je to API

```
/learning-guide
Co je to REST API?
```

**Očekávaná odpověď:**
- Vysvětlení pojmu API
- Rozdíl mezi REST, SOAP, GraphQL
- Příklady použitelnosti

---

## 🎓 Výukové cesty s Learning Guide

### Úroveň 1: Základy (pro úplné začátečníky)
```
/learning-guide
Chci se naučit základy API testování
```

**Obsah:**
- Co je API
- HTTP metody (GET, POST, PUT, DELETE)
- Stavové kódy (200, 201, 400, 404, 500)
- Instalace a nastavení Bruno

---

### Úroveň 2: Práce s tímto monorepo
```
/learning-guide
Jak přidám novou API službu do tohoto monorepa?
```

**Obsah:**
- Struktura repozitáře
- Vytváření nové kolekce
- Spouštění testů
- Úprava existujících testů

---

### Úroveň 3: Pokročilé techniky
```
/learning-guide
Jak používat sdílené proměnné a řetězení testů?
```

**Obsah:**
- Autentikace (Basic Auth, Bearer Token)
- Řetězení testů (Chaining)
- Sdílené proměnné prostředí
- Testování různých typů API

---

### Úroveň 4: CI/CD a automatizace
```
/learning-guide
Jak funguje CI/CD pipeline v tomto repozitáři?
```

**Obsah:**
- GitHub Actions workflow
- Spouštění testů v CI/CD
- Ladění selhávajících testů
- Integrace s dalšími nástroji

---

## 💡 Tipy pro efektivní použití agentů

### 1. **Buďte specifický**
❌ Špatně: "Pomoc s testy"
✅ Dobře: "Potřebuji vytvořit test pro GET /users endpoint v JsonPlaceholder"

### 2. **Poskytujte kontext**
```
/api-tester
Právě jsem vytvořil nový endpoint /api/v2/users a potřebuji pro něj vytvořit test.
Endpoint vrací array uživatelů s poli id, name, email.
```

### 3. **Kladte konkrétní otázky**
```
/bruno-expert
Jak mohu v Bruno testu zkontrolovat, že pole 'id' je unikatní napříč všemi položkami?
```

### 4. **Žádejte příklady**
```
/learning-guide
Můžeš mi ukázat příklad testu pro POST požadavek s JSON tělem?
```

---

## ⚙️ Technické detaily

### Jak agenti vědí o tomto monorepu
Každý agent má přístup k:
- **Struktuře repozitáře** - Zná cesty k backendum a testům
- **Konfiguraci** - Ví, kde jsou jednotlivé soubory
- **Dokumentaci** - Odkazuje na existující návody

### Co agenti umí automaticky
- **API Test Assistant:**
  - Generovat YAML strukturu pro nové testy
  - Analyzovat existující testy
  - Navrhovat opravení chyb
  
- **Bruno Expert:**
  - Vysvětlovat pokročilé funkce Bruno
  - Řešit specifické chyby
  - Optimalizovat testovací scénáře
  
- **Learning Guide:**
  - Vysvětlovat koncepty krok za krokem
  - Poskytovat příklady
  - Navrhovat výukové cesty

---

## 🔧 Řešení běžných problémů

### Problém: Agent nerozumí mé otázce
**Řešení:**
- Zopakuji otázku s více detaily
- Specifikuj, kterou část repozitáře se týká
- Ukáž příklad toho, co chci dosáhnout

### Problém: Agent poskytuje obecné odpovědi
**Řešení:**
- Žádej konkrétní příklady
- Specifikuj, že chceš odpověď pro tento repozitář
- Vyzvi agenta k použití konkrétních cest

### Problém: Agent navrhuje něco, co již existuje
**Řešení:**
- Upozorněte agenta, že soubor již existuje
- Žádej úpravu existujícího souboru
- Požádej o verifikaci, zda soubor existuje

---

## 📚 Příklady konverzací

### Konverzace 1: Vytvoření nové kolekce
```
Uživatel: /api-tester
        Chci vytvořit novou kolekci pro testování OpenWeather API

Agent:   Dobře! Zde je návod:
        1. Vytvoř: mkdir -p apiTest/OpenWeather/Current
        2. Přidej opencollection.yml s obsahem: [ukázka YAML]
        3. Vytvoř folder.yml: [ukázka]
        4. Vytvoř test: [ukázka]
        
        Chceš, abych ti vygeneroval konkrétní soubory?
```

### Konverzace 2: Oprava chyby
```
Uživatel: /api-tester
        Můj test pro POST /spells selhává s kódem 400

Agent:   Zkontroluj následující:
        1. Má test správný Content-Type header?
        2. Je tělo požadavku validní JSON?
        3. Neexistuje již kouzlo se stejným jménem?
        
        Ukáž mi svůj testovací soubor a pomohu ti ho opravit.
```

### Konverzace 3: Výuka
```
Uživatel: /learning-guide
        Jak funguje autentikace v API?

Agent:   Autentikace slouží k ověření identity klienta. Zde jsou hlavní typy:
        
        1. Basic Auth: Uživatelské jméno + heslo
        2. Bearer Token: JWT token v Authorization header
        3. API Key: Klíč v hlavičce nebo query parametru
        
        V PotterAPI se používá Basic Auth pro /characters endpoint.
        Chceš vidět příklad?
```

---

## 📊 Kdy použít který agenta

| Situace | Doporučený agent | Důvod |
|---------|------------------|--------|
| Vytváření nových testů | API Test Assistant | Specializovaný na vytváření testů |
| Oprava selhávajících testů | API Test Assistant | Zná běžné chyby a jejich řešení |
| Pokročilé Bruno funkce | Bruno Expert | Hluboké znalosti Bruno CLI |
| Řetězení testů | Bruno Expert | Zkušenosti s komplexními scénáři |
| Základy API | Learning Guide | Vzdělávací přístup |
| Nováček v repozitáři | Learning Guide | Provází krok za krokem |
| Optimalizace testů | Bruno Expert | Zkušenosti s výkonem |

---

## 🎯 Best Practices

1. **Začněte s Learning Guide** - Pokud jste nováček
2. **Používejte API Test Assistant** - Pro každodenní práci s testy
3. **Konultujte Bruno Expert** - Pro složité problémy
4. **Kombinujte agenty** - Například: Learning Guide → API Test Assistant → Bruno Expert

---

## 📞 Podpora

Pokud agenti neposkytují očekávané odpovědi:
1. Zkontrolujte, zda je otázka jasná a specifická
2. Přidejte více kontextu
3. Ověřte, že používáte správného agenta
4. Podívejte se do dokumentace v `docs/`

---

*Poslední aktualizace: 15. září 2026*