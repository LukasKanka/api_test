# 🔗 CRUD Testovací Řetězec v Bruno – Kompletní průvodce

CRUD (Create, Read, Update, Delete) řetězení umožňuje **testovat celý životní cyklus** jednoho záznamu napříč více požadavky. V Bruno se to dělá pomocí **sdílených proměnných prostředí** a **post-response skriptů**.

---

## 🎯 Princip řetězení v Bruno

```
POST /spells       →  Vytvoří kouzlo    →  Uloží ID do proměnné
     ↓
GET /spells/:id    →  Získá kouzlo      →  Ověří vytvoření
     ↓
PUT /spells/:id    →  Upraví kouzlo     →  Ověří úpravu
     ↓
DELETE /spells/:id →  Smaže kouzlo      →  Ověří smazání
     ↓
GET /spells/:id    →  Získá kouzlo      →  Ověří 404 (smazáno)
```

**Klíčové prvky:**
- `bru.setEnvVar("variableName", value)` – Ukládá hodnotu do proměnných prostředí
- `{{variableName}}` – Používá uloženou hodnotu v dalších požadavcích
- **Pořadí (seq)** – Určuje, v jakém pořadí se testy spouštějí

---

## 📝 Krok za krokem: CRUD pro /spells

### Předpoklady
- Backend PotterAPI běží na `localhost:3000`
- Kolekce `PotterAPI` existuje

---

### Krok 1: Vytvoř složku pro CRUD testy
```bash
mkdir -p apiTest/PotterAPI/CRUD
```

---

### Krok 2: Vytvoř folder.yml
```yaml
# apiTest/PotterAPI/CRUD/folder.yml
info:
  name: CRUD - Spells
  type: folder
  seq: 10

request:
  auth: inherit
```

---

### Krok 3: Vytvoř test pro CREATE (POST)
```yaml
# apiTest/PotterAPI/CRUD/1-CREATE-spell.yml
info:
  name: CREATE - Create new spell
  type: http
  seq: 1

http:
  method: POST
  url: http://localhost:3000/spells
  auth: inherit
  headers:
    - name: Content-Type
      value: application/json
  body:
    raw: |-
      {
        "spell": "Lumos Maximus",
        "type": "Charm",
        "effect": "Creates bright light",
        "isUnforgivable": false
      }

runtime:
  scripts:
    # Uloží ID nově vytvořeného kouzla
    - type: post-response
      code: |-
        if (res.getStatus() === 201) {
          const body = res.getBody();
          bru.setEnvVar("createdSpellId", body.spell.id);
          bru.setEnvVar("createdSpellName", body.spell.spell);
        }

    # Testy pro vytvoření
    - type: tests
      code: |-
        test("Status code is 201 Created", function() {
          expect(res.getStatus()).to.equal(201);
        });

        test("Response contains spell with id", function() {
          const body = res.getBody();
          expect(body.spell).to.have.property("id");
          expect(body.spell.id).to.be.a("string");
        });

settings:
  encodeUrl: true
  timeout: 10000
```

---

### Krok 4: Vytvoř test pro READ (GET)
```yaml
# apiTest/PotterAPI/CRUD/2-READ-spell.yml
info:
  name: READ - Get created spell
  type: http
  seq: 2

http:
  method: GET
  url: http://localhost:3000/spells/{{createdSpellId}}
  auth: inherit

runtime:
  scripts:
    - type: tests
      code: |-
        test("Status code is 200 OK", function() {
          expect(res.getStatus()).to.equal(200);
        });

        test("Response contains the created spell", function() {
          const body = res.getBody();
          expect(body.spell).to.equal(bru.getEnvVar("createdSpellName"));
          expect(body.id).to.equal(bru.getEnvVar("createdSpellId"));
        });

settings:
  encodeUrl: true
  timeout: 10000
```

---

### Krok 5: Vytvoř test pro UPDATE (PUT)
```yaml
# apiTest/PotterAPI/CRUD/3-UPDATE-spell.yml
info:
  name: UPDATE - Update spell
  type: http
  seq: 3

http:
  method: PUT
  url: http://localhost:3000/spells/{{createdSpellId}}
  auth: inherit
  headers:
    - name: Content-Type
      value: application/json
  body:
    raw: |-
      {
        "spell": "Lumos Maximus Updated",
        "type": "Charm",
        "effect": "Creates very bright light",
        "isUnforgivable": false
      }

runtime:
  scripts:
    - type: post-response
      code: |-
        if (res.getStatus() === 201) {
          bru.setEnvVar("createdSpellName", "Lumos Maximus Updated");
        }

    - type: tests
      code: |-
        test("Status code is 201 Updated", function() {
          expect(res.getStatus()).to.equal(201);
        });

        test("Response contains updated spell", function() {
          const body = res.getBody();
          expect(body.spell).to.equal("Lumos Maximus Updated");
        });

settings:
  encodeUrl: true
  timeout: 10000
```

---

### Krok 6: Vytvoř test pro DELETE
```yaml
# apiTest/PotterAPI/CRUD/4-DELETE-spell.yml
info:
  name: DELETE - Delete spell
  type: http
  seq: 4

http:
  method: DELETE
  url: http://localhost:3000/spells/{{createdSpellId}}
  auth: inherit

runtime:
  scripts:
    - type: tests
      code: |-
        test("Status code is 200 OK", function() {
          expect(res.getStatus()).to.equal(200);
        });

        test("Response contains delete message", function() {
          const body = res.getBody();
          expect(body.message).to.equal("spell deleted");
        });

settings:
  encodeUrl: true
  timeout: 10000
```

---

### Krok 7: Vytvoř test pro ověření smazání
```yaml
# apiTest/PotterAPI/CRUD/5-VERIFY-deleted.yml
info:
  name: VERIFY - Check spell is deleted
  type: http
  seq: 5

http:
  method: GET
  url: http://localhost:3000/spells/{{createdSpellId}}
  auth: inherit

runtime:
  scripts:
    - type: tests
      code: |-
        test("Status code is 404 Not Found", function() {
          expect(res.getStatus()).to.equal(404);
        });

settings:
  encodeUrl: true
  timeout: 10000
```

---

## 🚀 Jak to spustit

### Spuštění celého CRUD řetězce
```bash
cd apiTest/PotterAPI
npx @usebruno/cli run CRUD -r
```

---

## 💡 Pokročilé techniky

### 1. Více řetězců v jedné kolekci
Můžeš vytvořit několik nezávislých CRUD řetězců (např. pro různé typy kouzel).

### 2. Sdílené proměnné napříč kolekcemi
Proměnné prostředí (`bru.setEnvVar`) jsou **globální** pro celou kolekci.

### 3. Čištění po testu
Pro idempotentní testy (které lze opakovat):
```javascript
// V poslední fázi řetězce
bru.setEnvVar("createdSpellId", null);
bru.setEnvVar("createdSpellName", null);
```

---

## 📌 Kompletní příklad pro /characters

**⚠️ Důležité:** `/characters` endpoint vyžaduje **Basic Auth**!

```yaml
# 1-CREATE-character.yml
http:
  method: POST
  url: http://localhost:3000/characters
  auth: inherit
  headers:
    - name: Content-Type
      value: application/json
  body:
    raw: |-
      {
        "name": "Test Character",
        "role": "student",
        "house": "Gryffindor",
        "school": "Hogwarts"
      }

runtime:
  scripts:
    - type: post-response
      code: |-
        if (res.getStatus() === 201) {
          const body = res.getBody();
          bru.setEnvVar("createdCharacterId", body.character.id);
        }
```

---

## 🔧 Řešení problémů

| Problém | Příčina | Řešení |
|---------|---------|--------|
| Proměnná je `undefined` | Špatné pořadí `seq` | Zkontroluj, že CREATE má `seq: 1` |
| 404 na CREATE | Špatná URL | Zkontroluj, že URL je `http://localhost:3000/spells` |
| 400 na CREATE | Duplicitní data | Použij unikátní názvy |
| Testy selhávají | Backend neběží | Spusť `npm run start:potter-api` |
| "You can run only..." | Špatný adresář | Spusť z `apiTest/PotterAPI/` |

---

## 📚 Dokumentace

### Bruno
- [Bruno - Environment Variables](https://www.usebruno.com/docs/collections/environments) – Práce s proměnnými
- [Bruno - Scripting](https://www.usebruno.com/docs/scripting) – Skriptování v Bruno
- [Bruno Dokumentace](https://www.usebruno.com/docs) – Kompletní dokumentace
- [Bruno GitHub](https://github.com/usebruno/bruno) – Open-source repozitář

### Testovací knihovny
- [Chai Assertions](https://www.chaijs.com/api/bdd/) – Asertace v testech

### Vibe & Mistral AI
- [Mistral AI](https://mistral.ai/) – Hlavní web společnosti
- [Mistral AI Dokumentace](https://docs.mistral.ai/) – Oficiální dokumentace
- [Vibe Code](https://mistral.ai/products/vibe/code) – AI asistent pro vývoj
- [Vibe CLI GitHub](https://github.com/mistralai/vibe) – Repozitář Vibe CLI