# 🚀 Calisto Vault - Android + Cloudflare + AI

**Nowoczesny, w 100% darmowy projekt łączący aplikację Android z Cloudflare (Pages + Workers + R2 Storage) i integracją z AI.**

---

## 📋 **Podsumowanie Projektu**

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALISTO VAULT (v2.0)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📱 ANDROID APP (Kotlin + Jetpack Compose)                        │
│     ├── Room Database (lokalne dane, offline-first)               │
│     ├── Retrofit (API calls do Cloudflare Workers)                 │
│     ├── Coil (ładowanie obrazów)                                   │
│     └── Coroutines (asynchroniczność)                              │
│                                                                     │
│  ☁️ CLOUDFLARE (Wszystko DARMOWE)                                   │
│     ├── Pages (statyczna strona WWW, CDN)                         │
│     ├── Workers (backend API, edge computing)                      │
│     ├── KV Storage (1GB, metadane, ustawienia)                     │
│     └── R2 Storage (10GB, pliki: zdjęcia, filmy, PDF)              │
│                                                                     │
│  🤖 AI INTEGRATION (Darmowe API)                                   │
│     ├── Mistral AI (32K token/dzień, tekst, tłumaczenia)           │
│     ├── Hugging Face (10K req/miesiąc, analiza sentymentu)          │
│     └── Replicate (Stable Diffusion, generowanie obrazów)          │
│                                                                     │
│  💾 STORAGE                                                       │
│     ├── Lokalnie: Room Database (SQLite)                           │
│     ├── Chmura: R2 Storage (10GB, CDN)                            │
│     └── Synchronizacja: Automatic (opcjonalnie)                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 **Funkcje**

### ✅ **Aplikacja Android**
- [x] **Offline-first** - Wszystkie dane lokalnie (Room Database)
- [x] **Synchronizacja** - Z Cloudflare Workers (opcjonalnie)
- [x] **Przechowywanie plików** - Zdjęcia, filmy, PDF w R2 Storage (10GB)
- [x] **AI Asystent** - Generowanie tekstu, tłumaczenia, analiza sentymentu
- [x] **Generowanie obrazów** - Stable Diffusion via Replicate
- [x] **Nowoczesny UI** - Jetpack Compose, ciemny motyw
- [x] **Autentykacja** - Token-based (z KV Storage)

### ✅ **Cloudflare Workers API**
| Endpoint | Metoda | Opis |
|----------|--------|------|
| `/api/ping` | GET | Sprawdź połączenie |
| `/api/data` | GET/POST/DELETE | Operacje na danych (KV Storage) |
| `/api/files/upload` | POST | Upload pliku do R2 |
| `/api/files/download` | GET | Pobierz plik z R2 |
| `/api/files/delete` | DELETE | Usuń plik z R2 |
| `/api/files/list` | GET | Lista plików (z paginacją) |
| `/api/files/exists` | GET | Sprawdź czy plik istnieje |
| `/api/ai/generate` | POST | Generuj tekst (Mistral AI) |
| `/api/ai/analyze` | POST | Analiza tekstu (Hugging Face) |
| `/api/ai/image` | POST | Generuj obraz (Stable Diffusion) |
| `/api/ai/translate` | POST | Tłumaczenie tekstu |
| `/api/ai/summarize` | POST | Podsumowanie tekstu |
| `/api/ai/sentiment` | POST | Analiza sentymentu |
| `/api/auth` | POST | Autentykacja |
| `/api/auth/validate` | GET | Walidacja tokenu |
| `/api/stats` | GET | Statystyki systemu |

### ✅ **Cloudflare Pages**
- Statyczna strona landing page
- Responsywny design (mobile/desktop)
- Ciemny motyw z fioletowo-złotymi akcentami
- Dokumentacja API
- Demo aplikacji

---

## 💰 **Koszty (Wszystko DARMOWE!)**

| Usługa | Limit | Twoje zużycie | Koszt |
|--------|-------|---------------|-------|
| **Cloudflare Pages** | 100K req/dzień | ~100 | ✅ $0 |
| **Cloudflare Workers** | 100K req/dzień | ~1,000 | ✅ $0 |
| **KV Storage** | 1GB / 100K operacji | ~10MB | ✅ $0 |
| **R2 Storage** | 10GB / 1M operacji | ~1GB | ✅ $0 |
| **Mistral AI** | 32K token/dzień | ~1,000 | ✅ $0 |
| **Hugging Face** | 10K req/miesiąc | ~100 | ✅ $0 |
| **Replicate** | $5 kredytów | ~10 obrazów | ✅ $0 |
| **GitHub Actions** | 2K min/miesiąc | ~50 min | ✅ $0 |

**💡 Wszystko mieści się w darmowych limitach!**

---

## 📁 **Struktura Projektu**

```
CalistoVault/
├── android/                          # Aplikacja Android
│   └── app/
│       ├── src/main/java/com/example/calistovault/
│       │   ├── CalistoVaultApp.kt       # Aplikacja (Application)
│       │   ├── MainActivity.kt          # Główna aktywność
│       │   ├── data/
│       │   │   ├── AppDatabase.kt       # Baza Room
│       │   │   ├── entity/
│       │   │   │   ├── DataEntity.kt     # Encja danych
│       │   │   │   └── FileEntity.kt     # Encja plików
│       │   │   ├── dao/
│       │   │   │   ├── DataDao.kt        # DAO danych
│       │   │   │   └── FileDao.kt        # DAO plików
│       │   │   └── repository/
│       │   │       ├── DataRepository.kt # Repozytorium danych
│       │   │       ├── FileRepository.kt # Repozytorium plików
│       │   │       └── AIRepository.kt   # Repozytorium AI
│       │   ├── network/
│       │   │   ├── ApiService.kt         # Interfejs API
│       │   │   └── RetrofitClient.kt     # Klient Retrofit
│       │   └── ui/
│       │       ├── CalistoVaultApp.kt    # Główna aplikacja UI
│       │       └── theme/
│       │           ├── Color.kt          # Kolory
│       │           ├── Theme.kt          # Motyw
│       │           └── Type.kt           # Typografia
│       └── build.gradle                  # Konfiguracja Gradle
│
├── cloudflare/                       # Cloudflare
│   ├── pages/                         # Statyczna strona
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   └── workers/                       # Cloudflare Workers
│       ├── api.js                     # Główne API
│       ├── r2-utils.js                # Narzędzia R2 Storage
│       ├── ai-utils.js                # Narzędzia AI
│       ├── wrangler.toml              # Konfiguracja
│       └── package.json
│
├── .github/                          # GitHub Actions
│   └── workflows/
│       ├── build-android.yml         # Budowanie APK
│       ├── deploy-pages.yml          # Wdrażanie Pages
│       └── deploy-workers.yml         # Wdrażanie Workers
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 **Szybki Start**

### 1️⃣ **Konfiguracja Cloudflare**

#### KV Namespace (Metadane)
```bash
1. Wejdź na: https://dash.cloudflare.com/
2. Workers & Pages → KV → "Create namespace"
3. Nazwij: DATA
4. Skopiuj ID
5. Wklej do: cloudflare/workers/wrangler.toml
```

#### R2 Bucket (Pliki)
```bash
1. Workers & Pages → R2 → "Create bucket"
2. Nazwij: CALISTO_DATA
3. Włącz "Public Access" w ustawieniach
4. Skopiuj publiczną domenę
5. Dodaj do wrangler.toml:
   [r2_buckets]
   binding = "CALISTO_DATA"
   bucket_name = "CALISTO_DATA"
   
   [vars]
   R2_PUBLIC_DOMAIN = "YOUR_PUBLIC_DOMAIN"
```

#### Cloudflare Pages
```bash
1. Workers & Pages → Pages → "Create project"
2. Connect GitHub: ElinaXproject/CalistoVault
3. Project name: calisto-vault
4. Production branch: main
5. Build output: cloudflare/pages
```

### 2️⃣ **Konfiguracja API Keys (AI)**

Dodaj API klucze do KV Storage (przez Wrangler CLI lub Dashboard):

```bash
# Mistral AI (32K token/dzień darmowo)
wrangler kv:key put MISTRAL_API_KEY "twój_klucz_mistral"

# Hugging Face (10K req/miesiąc darmowo)
wrangler kv:key put HUGGINGFACE_API_KEY "twój_klucz_huggingface"

# Replicate ($5 kredytów darmowo)
wrangler kv:key put REPLICATE_API_KEY "twój_klucz_replicate"
```

**Jak zdobyć klucze:**
- [Mistral AI](https://console.mistral.ai/api-keys/) - Zarejestruj się i utwórz klucz
- [Hugging Face](https://huggingface.co/settings/tokens) - Zarejestruj się i utwórz token
- [Replicate](https://replicate.com/account/api-tokens) - Zarejestruj się i utwórz token

### 3️⃣ **Wdrażanie Cloudflare Workers**

```bash
# Zainstaluj Wrangler CLI
npm install -g wrangler

# Zaloguj się do Cloudflare
wrangler login

# Wdróż Worker
cd cloudflare/workers
wrangler deploy
```

### 4️⃣ **Budowanie Aplikacji Android**

```bash
# Otwórz w Android Studio
# lub buduj z linii komend:
cd android
./gradlew assembleDebug
```

### 5️⃣ **Konfiguracja GitHub Secrets (CI/CD)**

```bash
1. GitHub → Repo → Settings → Secrets → Actions
2. Dodaj:
   - CLOUDFLARE_API_TOKEN: (z Cloudflare Dashboard → My Profile → API Tokens)
   - CLOUDFLARE_ACCOUNT_ID: (z URL: https://dash.cloudflare.com/ACCOUNT_ID/)
```

---

## 📱 **Funkcje Aplikacji Android**

### 🔐 **Hasła i Dane**
- Przechowywanie haseł w zaszyfrowanej bazie (do zaimplementowania AES-256)
- Kategorie i tagi
- Wyszukiwanie
- Eksport/Import
- Generowanie haseł (z AI)

### 📁 **Pliki (R2 Storage)**
- Upload zdjęć, filmów, PDF
- Podgląd plików
- Udostępnianie (linki publiczne)
- Synchronizacja między urządzeniami
- 10GB darmowej pamięci

### 🤖 **AI Asystent**
- **Generowanie tekstu** - Pomysły, treści, kody
- **Tłumaczenia** - 100+ języków
- **Podsumowania** - Artykuły, dokumenty
- **Analiza sentymentu** - Pozytywny/Negatywny/Neutralny
- **Generowanie obrazów** - Stable Diffusion (512x512)
- **Poprawianie tekstu** - Gramatyka, styl
- **Wyjaśnianie pojęć** - Proste wyjaśnienia
- **Pomoc kodowa** - Wyjaśnianie i poprawianie kodu

### ☁️ **Synchronizacja**
- **Automatyczna** - W tle (opcjonalnie)
- **Manualna** - Przycisk "Synchronizuj"
- **P2P** - Bezpośrednio między urządzeniami (do zaimplementowania)
- **Offline** - Wszystko działa bez internetu

---

## 🎨 **UI / UX**

### **Motyw**
- **Ciemny** - #0a0a0f (tło)
- **Akcenty**
  - Fioletowy: #8b5cf6 (główny)
  - Fioletowy (jasny): #a78bfa
  - Złoty: #f59e0b (dodatkowy)
- **Tekst**
  - Biały: #ffffff (główny)
  - Szary: #b0b0c0 (wtórny)

### **Komponenty**
- **Jetpack Compose** - Nowoczesny UI
- **Navigation Component** - Nawigacja między ekranami
- **Coil** - Ładowanie obrazów z CDN
- **Room** - Lokalna baza danych

---

## 🔧 **Technologie**

| Komponent | Technologia | Wersja |
|-----------|------------|--------|
| **Android** | Kotlin | 1.9.0 |
| **UI** | Jetpack Compose | 1.5.4 |
| **Baza danych** | Room | 2.6.0 |
| **HTTP Client** | Retrofit + OkHttp | 2.9.0 / 4.12.0 |
| **Image Loading** | Coil | 2.4.0 |
| **Navigation** | Navigation Compose | 2.7.5 |
| **Coroutines** | KotlinX Coroutines | 1.7.3 |
| **Cloudflare Workers** | JavaScript | ES2022 |
| **Cloudflare Pages** | HTML/CSS/JS | - |
| **R2 Storage** | S3-compatible | - |
| **KV Storage** | Key-Value | - |

---

## 📊 **Limity i Ograniczenia**

### **Cloudflare Free Tier**

| Usługa | Limit | Reset |
|--------|-------|-------|
| Workers Requests | 100,000/dzień | Codziennie |
| KV Storage | 1GB pamięci | - |
| KV Read | 100,000/dzień | Codziennie |
| KV Write | 1,000/dzień | Codziennie |
| R2 Storage | 10GB pamięci | - |
| R2 Operations | 1,000,000/miesiąc | Miesięcznie |
| Pages Requests | 100,000/dzień | Codziennie |

### **AI Free Tier**

| API | Limit | Reset |
|-----|-------|-------|
| Mistral AI | 32,000 token/dzień | Codziennie |
| Hugging Face | 10,000 req/miesiąc | Miesięcznie |
| Replicate | $5 kredytów | Jednorazowo |

### **GitHub Free Tier**

| Usługa | Limit | Reset |
|--------|-------|-------|
| Actions (Linux) | 2,000 min/miesiąc | Miesięcznie |
| Storage | 500MB | - |
| Bandwidth | 1GB/miesiąc | Miesięcznie |

---

## 🔐 **Bezpieczeństwo**

### ✅ **Zaimplementowane**
- HTTPS (wszystkie żądania)
- CORS (skonfigurowany dla Twojej domeny)
- Autentykacja token-based
- Rate limiting (Cloudflare)
- DDoS Protection (Cloudflare)

### ⚠️ **Do zaimplementowania (opcjonalnie)**
- [ ] **AES-256-GCM** - Szyfrowanie lokalne
- [ ] **Argon2id** - Hashowanie haseł
- [ ] **SQLCipher** - Zaszyfrowana baza danych
- [ ] **JWT** - Tokeny autentykacyjne
- [ ] **End-to-End Encryption** - Szyfrowanie plików

---

## 🤝 **Autor**

**CALISTO**
- X: [@ABSURD__CORP](https://x.com/ABSURD__CORP)
- Email: calistoxmass@gmail.com
- Projekt: [Calisto Vault](https://github.com/ElinaXproject/CalistoVault)

---

## 📄 **Licencja**

**MIT License** - Wolne użycie, modyfikacja i dystrybucja.

---

## 🙏 **Podziękowania**

- [Cloudflare](https://cloudflare.com) - Darmowy hosting i storage
- [Mistral AI](https://mistral.ai) - Darmowe API do AI
- [Hugging Face](https://huggingface.co) - Darmowe modele ML
- [Replicate](https://replicate.com) - Darmowe generowanie obrazów
- [JetBrains](https://jetbrains.com) - Android Studio (Community Edition)

---

## 🚨 **WAŻNE**

**Wszystkie używane technologie są w 100% DARMOWE w ramach ich free tier!**

- ❌ **Nie musisz płacić** za nic, jeśli nie przekroczysz limitów
- ✅ **Wszystko działa offline** (oprócz synchronizacji i AI)
- ✅ **Pełna prywatność** - Twoje dane należą do Ciebie
- ✅ **Open Source** - Kod jest publicznie dostępny

---

## 📞 **Support**

- **Błędy?** - Sprawdź logi i [Cloudflare Status](https://www.cloudflarestatus.com/)
- **Pytania?** - Otwórz Issue na GitHub
- **Pomysły?** - Dodaj do Discussions na GitHub

---

**🎉 Gotowe! Teraz masz pełnowartościowy projekt z Android, Cloudflare i AI - wszystko za darmo!**
