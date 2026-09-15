Calisto Vault to nowoczesny, bezpieczny i w pełni prywatny menedżer haseł działający na Windows i Android, z opcjonalnym wsparciem dla pendrive MASTER oraz synchronizacją P2P bez chmury. Aplikacja oferuje automatyczne i ręczne sprawdzanie aktualizacji, pełne szyfrowanie oraz tryby działania dopasowane do każdego użytkownika.

🛡️ Calisto Vault — Bezpieczny Menedżer Haseł Offline
Calisto Vault to wieloplatformowy system zarządzania hasłami zaprojektowany z myślą o prywatności, bezpieczeństwie i elastyczności.
Aplikacja działa w różnych trybach — od pełnej konfiguracji Windows + Android + Pendrive MASTER, aż po tryby solo dla użytkowników, którzy chcą korzystać tylko z jednego urządzenia.

⭐ Najważniejsze funkcje
Szyfrowanie: AES‑256‑GCM

KDF: Argon2id

Baza danych: SQLCipher

Pendrive MASTER: fizyczny klucz bezpieczeństwa

Synchronizacja P2P: bez serwera, bez chmury

Autofill na Androidzie

Testowanie loginów

Działanie offline

Nowoczesny UI Windows + Android

Logi diagnostyczne (w ustawieniach)

Automatyczne i ręczne sprawdzanie aktualizacji aplikacji

Tryby działania wybierane przy pierwszym uruchomieniu

🔧 Tryby działania
Przy pierwszym uruchomieniu użytkownik wybiera tryb:

Pełny: Windows + Android + Pendrive MASTER

Windows + Pendrive

Android + Pendrive

Windows solo

Android solo

Windows + Android (bez pendrive)

Każdy tryb działa niezależnie i bezpiecznie.

💾 Pendrive MASTER
Pendrive MASTER:

przechowuje zaszyfrowaną bazę SQLCipher,

przechowuje klucz master.key,

umożliwia przywracanie danych,

integruje się z Windows i Android (OTG),

może być głównym źródłem danych w trybie pełnym.

🔄 Synchronizacja P2P
Synchronizacja P2P:

działa bez serwera i bez chmury,

wykorzystuje E2EE,

może działać lokalnie lub przez Internet,

automatycznie wykrywa zmiany,

rozwiązuje konflikty w bezpieczny sposób.

🖥️ Aplikacja Windows
Electron + Node.js

ciemny motyw, fiolet + złoto

lista haseł + szczegóły

testowanie loginów

integracja z pendrive MASTER

synchronizacja P2P

logi diagnostyczne

sekcja: Informacje / Bezpieczeństwo / Autor

automatyczne i ręczne sprawdzanie aktualizacji

📱 Aplikacja Android
Kotlin

Autofill API

ciemny motyw, fiolet + złoto

lista haseł w formie kart

szczegóły wpisu z dużymi polami

synchronizacja P2P

integracja z pendrive MASTER (OTG)

sekcja: Informacje / Bezpieczeństwo / Autor

automatyczne i ręczne sprawdzanie aktualizacji

🎨 UI — Windows i Android
nowoczesny, lekki, bez animacji

ciemny motyw

białe napisy

akcenty: fiolet + złoto

minimalistyczne ikony

zbliżony układ na Windows i Android, żeby użytkownik czuł się „u siebie” na obu platformach.

🔔 Aktualizacje aplikacji (EXE/APK)
Calisto Vault obsługuje aktualizacje aplikacji, nie bazy haseł.

Automatyczne sprawdzanie aktualizacji
aplikacja okresowo pobiera z GitHub plik version.json,

porównuje wersję lokalną z wersją dostępną,

jeśli jest nowsza wersja → wyświetla powiadomienie:
„Dostępna aktualizacja Calisto Vault (wersja X.X).”

W ustawieniach:

Automatyczne sprawdzanie aktualizacji: przełącznik ON/OFF.

Ręczne sprawdzanie aktualizacji
W ustawieniach:

przycisk „Sprawdź dostępność aktualizacji”

po kliknięciu aplikacja pobiera version.json z GitHub, porównuje wersję i wyświetla komunikat:

„Twoja wersja jest aktualna”

lub „Dostępna aktualizacja Calisto Vault (wersja X.X).”

Instalacja aktualizacji
Użytkownik:

pobiera nowy EXE (Windows) lub APK (Android) z GitHub Releases,

instaluje ręcznie.

Aplikacja nie aktualizuje się sama — daje pełną kontrolę użytkownikowi.

📘 Instrukcja użytkowania
Instrukcja jest dostępna w aplikacji:

Ustawienia → Informacje → Instrukcja użytkowania

Zawiera:

opis podstawowych funkcji,

opis trybów działania,

opis pendrive MASTER,

opis synchronizacji P2P,

opis bezpieczeństwa,

opis aktualizacji aplikacji,

opis logów diagnostycznych,

FAQ,

dane autora.

🛡️ Bezpieczeństwo
Calisto Vault zapewnia:

AES‑256‑GCM

Argon2id

SQLCipher

E2EE w synchronizacji

brak chmury

brak serwera

brak telemetrii

brak reklam

brak analityki

lokalne przetwarzanie danych

Verified Build (brak malware, brak ukrytych procesów)

⚖️ Informacje prawne
Calisto Vault nie zbiera danych użytkownika.

Calisto Vault nie wysyła danych do Internetu (poza sprawdzaniem aktualizacji z GitHub).

Calisto Vault nie korzysta z chmury.

Calisto Vault nie posiada własnego serwera.

Wszystkie dane są szyfrowane lokalnie.

Użytkownik ma pełną kontrolę nad swoimi danymi.

👤 Autor
Autor: CALISTO
X: https://x.com/ABSURD__CORP  
Email: calistoxmass@gmail.com

📦 Instalacja
Windows
Pobierz CalistoVaultSetup.exe z GitHub Releases.

Uruchom instalator.

Przy pierwszym uruchomieniu wybierz tryb działania.

Android
Pobierz CalistoVault.apk z GitHub Releases.

Zainstaluj na urządzeniu (włącz instalację z nieznanych źródeł, jeśli to konieczne).

Przy pierwszym uruchomieniu wybierz tryb działania.

❓ FAQ
Czy aplikacja działa offline?  
Tak, w pełni.

Czy mogę używać tylko telefonu?  
Tak — tryb Android solo.

Czy mogę używać tylko komputera?  
Tak — tryb Windows solo.

Czy pendrive jest wymagany?  
Nie — jest opcjonalny.

Czy aplikacja jest bezpieczna?  
Tak — pełne szyfrowanie, brak chmury, Verified Build.

Czy aplikacja sama się aktualizuje?  
Nie — informuje o aktualizacji, ale użytkownik instaluje ją ręcznie.

Czy moje dane są wysyłane gdziekolwiek?  
Nie — poza sprawdzaniem wersji aplikacji na GitHub, żadna treść haseł ani danych nie opuszcza urządzenia.

🧩 Repozytorium
Kod źródłowy, zadania AI i dokumentacja znajdują się w repozytorium GitHub projektu Calisto Vault.
