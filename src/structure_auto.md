# Calisto Vault — AUTO_MODE Structure

AUTO_MODE aktywny — AI generuje pełną strukturę projektu.

## Struktura generowana automatycznie:

src/
├── windows/
│   ├── app.js
│   ├── index.html
│   ├── ui/
│   │   ├── main.css
│   │   ├── main.js
│   │   └── components/
│   │       ├── header.js
│   │       ├── list.js
│   │       └── settings.js
│   └── db/
│       └── sqlcipher.js
│
├── android/
│   ├── MainActivity.kt
│   ├── ui/
│   │   ├── activity_main.xml
│   │   └── components/
│   │       ├── header.xml
│   │       ├── list.xml
│   │       └── settings.xml
│   └── db/
│       └── sqlcipher.kt
│
├── shared/
│   ├── crypto.js
│   ├── sync.js
│   ├── updater.js
│   └── storage.js
│
└── assets/
    ├── icons/
    ├── colors.json
    └── logo.png

## Status
AI będzie automatycznie generować wszystkie pliki w tej strukturze.
