# 🚀 Calisto Vault - Android + Cloudflare Project

**Nowoczesny projekt łączący aplikację Android z Cloudflare (Pages + Workers) dla maksymalnej wydajności.**

---

## 📱 Android App

Aplikacja mobilna zbudowana w **Kotlin**, z:
- Nowoczesnym UI (Jetpack Compose)
- Obsługą autentykacji
- Integracją z Cloudflare Workers API
- Offline-first z lokalną bazą danych (Room)
- Synchronizacją w tle

## ☁️ Cloudflare

### Pages
- **Statyczna strona** (landing page, dokumentacja)
- Szybkie wczytywanie dzięki globalnej sieci CDN
- Automatyczne wdrażanie z GitHub

### Workers
- **Backend API** (serverless)
- Obsługa żądań HTTP/HTTPS
- Integracja z KV Storage (pamięć klucz-wartość)
- Szybkość i niskie opóźnienia (edge computing)

## 🛠️ Technologie

| Komponent | Technologia |
|-----------|------------|
| Android App | Kotlin, Jetpack Compose, Room |
| Cloudflare Pages | HTML/CSS/JS, React (opcjonalnie) |
| Cloudflare Workers | JavaScript/TypeScript, KV Storage |
| CI/CD | GitHub Actions |
| Monitoring | Cloudflare Analytics |

## 📁 Struktura Projektu

```
CalistoVault/
├── android/
│   └── app/
│       ├── src/main/java/...      # Kod Kotlin
│       ├── src/main/res/          # Zasoby (layouty, ikony)
│       ├── build.gradle            # Konfiguracja Gradle
│       └── settings.gradle         # Ustawienia projektu
│
├── cloudflare/
│   ├── pages/                     # Statyczna strona (HTML/CSS/JS)
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   └── workers/                   # Cloudflare Workers
│       ├── api.js                 # Główne API
│       ├── auth.js                # Autentykacja
│       └── kv-utils.js            # Narzędzia KV Storage
│
├── .github/
│   └── workflows/                 # GitHub Actions
│       ├── deploy-pages.yml       # Wdrażanie Pages
│       └── deploy-workers.yml      # Wdrażanie Workers
│
├── README.md                      # Dokumentacja
└── package.json                   # Zależności (dla Workers)
```

## 🚀 Szybki Start

### 1. Android App

```bash
# Otwórz projekt w Android Studio
cd android
./gradlew build
```

### 2. Cloudflare Pages

```bash
# Wdróż statyczną stronę
cd cloudflare/pages
# Skonfiguruj w Cloudflare Dashboard:
# 1. Utwórz projekt Pages
# 2. Podłącz repozytorium GitHub
# 3. Wybierz folder: `cloudflare/pages`
```

### 3. Cloudflare Workers

```bash
# Zainstaluj Wrangler CLI
npm install -g wrangler

# Zaloguj się do Cloudflare
wrangler login

# Wdróż Worker
cd cloudflare/workers
wrangler deploy
```

## 🔧 Konfiguracja

### Android (app/build.gradle)
```gradle
android {
    compileSdk 34
    defaultConfig {
        applicationId "com.example.calistovault"
        minSdk 24
        targetSdk 34
    }
}

dependencies {
    implementation "androidx.compose.material:material:1.6.0"
    implementation "androidx.room:room-runtime:2.6.0"
    implementation "com.squareup.retrofit2:retrofit:2.9.0"
}
```

### Cloudflare Workers (wrangler.toml)
```toml
name = "calisto-api"
main = "api.js"
compatibility_date = "2024-01-01"

[kv_namespaces]
binding = "DATA"
id = "YOUR_KV_NAMESPACE_ID"
```

## 🌐 API Endpoints

| Endpoint | Metoda | Opis |
|----------|--------|------|
| `/api/data` | GET | Pobierz dane z KV Storage |
| `/api/data` | POST | Zapisz dane do KV Storage |
| `/api/auth` | POST | Autentykacja użytkownika |

## 📦 Wdrażanie CI/CD

### GitHub Actions - Cloudflare Pages
```yaml
name: Deploy Cloudflare Pages
on:
  push:
    branches: [ main ]
    paths:
      - 'cloudflare/pages/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/pages-action@1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: "calisto-pages"
          directory: "cloudflare/pages"
```

### GitHub Actions - Cloudflare Workers
```yaml
name: Deploy Cloudflare Workers
on:
  push:
    branches: [ main ]
    paths:
      - 'cloudflare/workers/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install -g wrangler
      - run: cd cloudflare/workers && wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## 🔐 Bezpieczeństwo

- ✅ Wszystkie żądania przez HTTPS
- ✅ Autentykacja JWT (Cloudflare Workers)
- ✅ CORS skonfigurowany dla Twojej domeny
- ✅ KV Storage z szyfrowaniem (opcjonalnie)
- ✅ Rate limiting w Workers

## 📊 Monitorowanie

- [Cloudflare Analytics](https://dash.cloudflare.com/) - Statystyki Pages
- [Workers Analytics](https://dash.cloudflare.com/) - Logi i metryki API
- GitHub Actions - Logi wdrażania

## 🤝 Autor

**CALISTO**
- X: [@ABSURD__CORP](https://x.com/ABSURD__CORP)
- Email: calistoxmass@gmail.com

## 📄 Licencja

MIT License - Wolne użycie, modyfikacja i dystrybucja.
