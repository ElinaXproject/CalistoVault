Prywatny Menedżer Haseł – Pełna Dokumentacja Projektu
1. Wprowadzenie
Ten dokument opisuje kompletny projekt prywatnego menedżera haseł działającego na Windows i Android, z pełną synchronizacją P2P, pendrive jako głównym magazynem danych oraz lokalną kopią na telefonie. System jest zaprojektowany tak, aby działał bez chmury, bez serwera, bez API i bez ryzyka wycieku danych.

2. Architektura Systemu
2.1 Elementy
Pendrive (MASTER) – główna baza danych.

Laptop (Windows) – praca na bazie z pendrive, integracja z przeglądarką.

Telefon (Android) – lokalna kopia bazy, autofill, logowanie poza domem.

Synchronizacja P2P – bezpośrednie połączenie telefon ↔ laptop przez Internet.

2.2 Przepływ danych
Pendrive (MASTER)
↑ ↓
Laptop Windows
↑ ↓
Synchronizacja P2P
↑ ↓
Telefon Android

3. Bezpieczeństwo
3.1 Szyfrowanie
AES-256-GCM – szyfrowanie bazy.

Argon2id – generowanie klucza.

SQLCipher – szyfrowana baza SQLite.

E2EE – pełne szyfrowanie synchronizacji.

3.2 Brak ryzyka wycieku
Brak serwera.

Brak chmury.

Brak API.

Brak logów.

4. Struktura Plików
4.1 Pendrive (MASTER)
/vault/
passwords.db
master.key
sync.json

4.2 Telefon (LOCAL COPY)
/local/
passwords.db
device.key

5. Format Bazy Danych
site_url – adres strony

login_url – adres logowania

username – login

password_enc – zaszyfrowane hasło

form_user_field – nazwa pola loginu

form_pass_field – nazwa pola hasła

status – OK / błędne / nieznane

last_check – data ostatniego testu

6. Synchronizacja P2P
6.1 Założenia
Działa przez Internet (LTE ↔ Wi-Fi).

Nie wymaga tej samej sieci.

Brak serwera i chmury.

Połączenie bezpośrednie.

6.2 Proces
Laptop uruchamia moduł P2P.

Telefon łączy się przez Internet.

Telefon wysyła zmiany.

Laptop aktualizuje pendrive.

Laptop wysyła główną bazę.

Telefon nadpisuje swoją kopię.

7. Aplikacja Windows
7.1 Funkcje
Praca na pendrive.

Integracja z przeglądarką.

Automatyczne przechwytywanie haseł.

Sprawdzanie loginów.

Synchronizacja P2P.

7.2 Testowanie loginów
Wysyłanie testowego logowania i analiza odpowiedzi serwera.

8. Aplikacja Android
8.1 Funkcje
Lokalna kopia bazy.

Autofill API.

Logowanie offline.

Zmiana haseł poza domem.

Synchronizacja P2P.

8.2 Działanie poza domem
Telefon działa samodzielnie, zapisuje zmiany lokalnie.

9. Integracja z Przeglądarką
Blokowanie zapisywania haseł.

Przechwytywanie formularzy.

Zapisywanie danych na pendrive.

10. Scenariusze Użycia
10.1 Logowanie poza domem
Telefon ma lokalną kopię i autofill.

10.2 Zmiana hasła poza domem
Zmiana zapisywana lokalnie, synchronizacja w domu.

10.3 Synchronizacja
Laptop ↔ telefon przez Internet, pendrive aktualizowany.

11. Ograniczenia
Brak automatycznej synchronizacji.

Wymagany minimalny Internet.

Pendrive musi być podpięty do laptopa.

12. Podsumowanie
Projekt zapewnia maksymalne bezpieczeństwo, pełną prywatność, działanie offline i online, brak chmury, brak serwera, pełną kontrolę nad danymi oraz niezawodną synchronizację P2P.
