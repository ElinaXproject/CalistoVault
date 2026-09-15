# 🔐 Calisto Vault - Dokumentacja

> Bezpieczny Menedżer Haseł Offline

Calisto Vault to wieloplatformowy system zarządzania hasłami zaprojektowany z myślą o prywatności, bezpieczeństwie i elastyczności.

---

## 📚 Spis treści

- [O Calisto Vault](#-o-calisto-vault)
- [Główne funkcje](#-główne-funkcje)
- [Tryby działania](#-tryby-działania)
- [Pendrive MASTER](#-pendrive-master)
- [Synchronizacja P2P](#-synchronizacja-p2p)
- [Aplikacje](#-aplikacje)
- [Bezpieczeństwo](#-bezpieczeństwo)
- [Instalacja](#-instalacja)
- [Dokumentacja](#-dokumentacja)
- [Autor](#-autor)

---

## 🔐 O Calisto Vault

Calisto Vault to nowoczesny, **w pełni prywatny** menedżer haseł działający na **Windows** i **Android**, z opcjonalnym wsparciem dla **pendrive MASTER** oraz **synchronizacją P2P** bez chmury.

Aplikacja została zaprojektowana z myślą o:
- ✅ **Maksymalnym bezpieczeństwie** - pełne szyfrowanie, brak chmury
- ✅ **Prywatności** - wszystkie dane pozostają na Twoim urządzeniu
- ✅ **Elastyczności** - multiple tryby działania dostosowane do różnych potrzeb
- ✅ **Łatwości użycia** - nowoczesny, intuicyjny interfejs

---

## ✨ Główne funkcje

| Funkcja | Opis |
|---------|------|
| 🔒 **Szyfrowanie** | AES-256-GCM - najwyższy standard bezpieczeństwa |
| 🔑 **KDF** | Argon2id - odporny na ataki brute-force |
| 🗃️ **Baza danych** | SQLCipher - zaszyfrowana baza SQLite |
| 💾 **Pendrive MASTER** | Fizyczny klucz bezpieczeństwa |
| 🔄 **Synchronizacja P2P** | Bez serwera, bez chmury, E2EE |
| 📱 **Autofill** | Automatyczne wypełnianie na Androidzie |
| ✅ **Offline** | Pełna funkcjonalność bez połączenia internetowego |
| 🎨 **UI** | Nowoczesny, ciemny motyw z akcentami fiolet + złoto |
| 🔄 **Aktualizacje** | Automatyczne i ręczne sprawdzanie |

---

## 🎯 Tryby działania

Przy pierwszym uruchomieniu wybierasz jeden z dostępnych trybów:

### 🖥️ Tryby z pendrive MASTER
- **Pełny**: Windows + Android + Pendrive MASTER
- **Windows + Pendrive**: Synchronizacja między komputerem a pendrive
- **Android + Pendrive**: Synchronizacja między telefonem a pendrive (OTG)

### 📱 Tryby bez pendrive
- **Windows solo**: Tylko komputer
- **Android solo**: Tylko telefon
- **Windows + Android (bez pendrive)**: Synchronizacja P2P między urządzeniami

**Każdy tryb działa niezależnie i bezpiecznie.**

---

## 💾 Pendrive MASTER

Pendrive MASTER to fizyczne urządzenie, które służy jako:

- 🔐 **Przechowywanie zaszyfrowanej bazy** SQLCipher
- 🔑 **Przechowywanie klucza master.key**
- 🔄 **Umożliwienie przywracania danych**
- 📱 **Integracja z Windows i Android** (OTG)
- 💾 **Główne źródło danych** w trybie pełnym

### Zalety pendrive MASTER:
- ⚡ **Szybkie przywracanie** - wystarczy podłączyć pendrive
- 🔒 **Dodatkowa warstwa bezpieczeństwa** - fizyczna kontrola dostępu
- 📱 **Mobilność** - zabierz swoje hasła ze sobą
- 💾 **Backup** - automatyczna kopia zapasowa

---

## 🔄 Synchronizacja P2P

Synchronizacja peer-to-peer (P2P) to innowacyjne rozwiązanie, które:

- 🌐 **Działa bez serwera** - żadne dane nie opuszczają Twoich urządzeń
- 🔐 **Wykorzystuje E2EE** - End-to-End Encryption
- 📡 **Może działać lokalnie lub przez Internet**
- ⚡ **Automatycznie wykrywa zmiany**
- 🎯 **Rozwiązuje konflikty** w bezpieczny sposób

### Jak to działa?
1. Urządzenia łączą się bezpośrednio (lokalnie lub przez Internet)
2. Wymieniane są tylko zaszyfrowane dane
3. System automatycznie synchronizuje zmiany
4. Konflikty są rozstrzygane według reguł zdefiniowanych przez użytkownika

---

## 📱 Aplikacje

### Windows (Electron + Node.js)
- 🎨 **Ciemny motyw** z kolorami fiolet + złoto
- 📋 **Lista haseł** z podglądem szczegółów
- 🧪 **Testowanie loginów**
- 🔌 **Integracja z pendrive MASTER**
- 🔄 **Synchronizacja P2P**
- 📝 **Logi diagnostyczne**
- ℹ️ **Sekcje**: Informacje / Bezpieczeństwo / Autor
- 🔄 **Aktualizacje**: automatyczne i ręczne sprawdzanie

### Android (Kotlin)
- 🎨 **Ciemny motyw** z kolorami fiolet + złoto
- 📋 **Lista haseł** w formie kart
- 📝 **Szczegóły wpisu** z dużymi polami
- 🔄 **Synchronizacja P2P**
- 🔌 **Integracja z pendrive MASTER** (OTG)
- ✅ **Autofill API** - automatyczne wypełnianie formularzy
- ℹ️ **Sekcje**: Informacje / Bezpieczeństwo / Autor
- 🔄 **Aktualizacje**: automatyczne i ręczne sprawdzanie

---

## 🛡️ Bezpieczeństwo

Calisto Vault zapewnia **kompleksową ochronę** Twoich danych:

### 🔐 Technologie szyfrowania
- **AES-256-GCM** - symetryczne szyfrowanie najwyższej jakości
- **Argon2id** - nowoczesna funkcja pochodzenia klucza (KDF)
- **SQLCipher** - zaszyfrowana baza danych SQLite
- **E2EE** - End-to-End Encryption w synchronizacji P2P

### 🚫 Czego NIE robimy
- ❌ **Nie zbieramy danych użytkownika**
- ❌ **Nie wysyłamy danych do Internetu** (poza sprawdzaniem aktualizacji)
- ❌ **Nie korzystamy z chmury**
- ❌ **Nie posiadamy własnego serwera**
- ❌ **Nie zbieramy telemetrii**
- ❌ **Nie wyświetlamy reklam**
- ❌ **Nie korzystamy z analityki**

### ✅ Co gwarantujemy
- ✅ **Wszystkie dane są szyfrowane lokalnie**
- ✅ **Użytkownik ma pełną kontrolę nad swoimi danymi**
- ✅ **Lokalne przetwarzanie danych**
- ✅ **Verified Build** - brak malware, brak ukrytych procesów

---

## 📥 Instalacja

### Windows
1. Pobierz **CalistoVaultSetup.exe** z [GitHub Releases](https://github.com/ElinaXproject/CalistoVault/releases)
2. Uruchom instalator
3. Przy pierwszym uruchomieniu wybierz tryb działania

### Android
1. Pobierz **CalistoVault.apk** z [GitHub Releases](https://github.com/ElinaXproject/CalistoVault/releases)
2. Zainstaluj na urządzeniu (włącz instalację z nieznanych źródeł, jeśli to konieczne)
3. Przy pierwszym uruchomieniu wybierz tryb działania

---

## 📚 Dokumentacja

### Podręcznik użytkownika
- [Instrukcja użycia](#) - Podstawowe funkcje aplikacji
- [Tryby działania](#-tryby-działania) - Opis wszystkich trybów
- [Pendrive MASTER](#-pendrive-master) - Konfiguracja i użycie
- [Synchronizacja P2P](#-synchronizacja-p2p) - Jak działą synchronizacja
- [Bezpieczeństwo](#-bezpieczeństwo) - Zasady bezpieczeństwa
- [Aktualizacje](#-aktualizacje-aplikacji) - Jak aktualizować aplikację
- [Logi diagnostyczne](#) - Jak pobrać i interpretować logi
- [FAQ](#-faq) - Najczęściej zadawane pytania

### Dokumentacja deweloperska
- [Architektura](#) - Opis struktury aplikacji
- [API](#) - Dokumentacja interfejsów
- [Szyfrowanie](#) - Implementacja algorytmów szyfrujących
- [Synchronizacja](#) - Mechanizmy synchronizacji P2P
- [Bezpieczeństwo](#) - Zasady i najlepsze praktyki

---

## 🔄 Aktualizacje aplikacji

Calisto Vault obsługuje **aktualizacje aplikacji** (nie bazy haseł).

### Automatyczne sprawdzanie aktualizacji
- Aplikacja okresowo pobiera z GitHub plik **version.json**
- Porównuje wersję lokalną z wersją dostępną
- Jeśli jest nowsza wersja → wyświetla powiadomienie

### Ręczne sprawdzanie aktualizacji
1. Przejdź do **Ustawienia**
2. Kliknij przycisk **"Sprawdź dostępność aktualizacji"**
3. Aplikacja pobierze version.json z GitHub
4. Wyświetli komunikat:
   - ✅ "Twoja wersja jest aktualna"
   - 📦 "Dostępna aktualizacja Calisto Vault (wersja X.X)"

### Instalacja aktualizacji
1. Pobierz nowy **EXE (Windows)** lub **APK (Android)** z [GitHub Releases](https://github.com/ElinaXproject/CalistoVault/releases)
2. Zainstaluj ręcznie

> ⚠️ **Aplikacja nie aktualizuje się sama** - dajemy pełną kontrolę użytkownikowi.

---

## ❓ FAQ

### Czy aplikacja działa offline?
✅ **Tak**, w pełni.

### Czy mogę używać tylko telefonu?
✅ **Tak** - tryb **Android solo**.

### Czy mogę używać tylko komputera?
✅ **Tak** - tryb **Windows solo**.

### Czy pendrive jest wymagany?
❌ **Nie** - jest opcjonalny.

### Czy aplikacja jest bezpieczna?
✅ **Tak** - pełne szyfrowanie, brak chmury, Verified Build.

### Czy aplikacja sama się aktualizuje?
❌ **Nie** - informuje o aktualizacji, ale użytkownik instaluje ją ręcznie.

### Czy moje dane są wysyłane gdziekolwiek?
❌ **Nie** - poza sprawdzaniem wersji aplikacji na GitHub, **żadna treść haseł ani danych nie opuszcza urządzenia**.

---

## 📧 Kontakt

**Autor:** CALISTO

- 📧 **Email:** [calistoxmass@gmail.com](mailto:calistoxmass@gmail.com)
- 🐦 **X (Twitter):** [@ABSURD__CORP](https://x.com/ABSURD__CORP)

---

## 📜 Informacje prawne

Calisto Vault **nie zbiera danych użytkownika**.

Calisto Vault **nie wysyła danych do Internetu** (poza sprawdzaniem aktualizacji z GitHub).

Calisto Vault **nie korzysta z chmury**.

Calisto Vault **nie posiada własnego serwera**.

**Wszystkie dane są szyfrowane lokalnie.**

**Użytkownik ma pełną kontrolę nad swoimi danymi.**

---

## 🔗 Linki

- 📦 [GitHub Repository](https://github.com/ElinaXproject/CalistoVault)
- 📄 [Releases](https://github.com/ElinaXproject/CalistoVault/releases)
- 📖 [Dokumentacja](https://elinaxproject.github.io/CalistoVault/)

---

*© 2024 Calisto Vault. Wszelkie prawa zastrzeżone.*
