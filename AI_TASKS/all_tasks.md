 Calisto Vault — AI TASKS 

🔰 Cel projektu
Calisto Vault to bezpieczny, offline menedżer haseł działający na Windows i Android, z opcjonalnym pendrive MASTER oraz synchronizacją P2P. Ten plik definiuje wszystkie zadania i moduły dla AI, które generują kod, UI, logikę i dokumentację aplikacji.

⚙️ Główne moduły

1️⃣ Struktura aplikacji

Windows + Android (identyczny UI)

Ciemny motyw, białe napisy, akcenty fiolet + złoto

Minimalistyczne ikony

Brak animacji

Responsywność i lekkość

2️⃣ Tryby działania

Pełny: Windows + Android + Pendrive MASTER

Windows + Pendrive

Android + Pendrive

Windows solo

Android solo

Windows + Android bez pendrive

Automatyczne wykrywanie trybu przy starcie

3️⃣ Pendrive MASTER

Przechowuje zaszyfrowaną bazę SQLCipher

Przechowuje klucz master.key

Synchronizuje dane między urządzeniami

Umożliwia przywracanie danych

Integracja z Android (OTG) i Windows

4️⃣ Synchronizacja P2P

Bez serwera, bez chmury

E2EE (end‑to‑end encryption)

Lokalna lub internetowa komunikacja

Automatyczne wykrywanie zmian

Rozwiązywanie konfliktów danych

5️⃣ Bezpieczeństwo

AES‑256‑GCM

Argon2id

SQLCipher

Verified Build

Brak telemetrii, reklam, analityki

Lokalna obróbka danych

Brak chmury i serwera

6️⃣ Aktualizacje aplikacji

Automatyczne sprawdzanie wersji z GitHub (plik version.json)

Ręczne sprawdzanie aktualizacji (przycisk w ustawieniach)

Przełącznik ON/OFF dla automatycznego sprawdzania

Powiadomienia o dostępnej wersji

Użytkownik pobiera i instaluje ręcznie

Bezpieczne, lekkie, offline

7️⃣ Instrukcja użytkowania

Dostępna w aplikacji: Ustawienia → Informacje → Instrukcja użytkowania

Opis funkcji, trybów, pendrive MASTER, synchronizacji, bezpieczeństwa, aktualizacji

FAQ i dane autora

8️⃣ Logi diagnostyczne

Dostępne w ustawieniach

Nie przeszkadzają użytkownikowi

Pomagają w debugowaniu

Zapis lokalny, bez wysyłania danych

🧩 Architektura AI

AI generuje kod i UI na podstawie tego pliku

Każdy moduł jest niezależny

AI może tworzyć lub aktualizować komponenty

Wszystkie funkcje muszą działać offline

Synchronizacja i aktualizacje muszą być bezpieczne

🧱 Struktura repozytorium
CalistoVault/
README.md
AI_TASKS/
all_tasks.md
src/
android/
windows/
shared/
assets/
docs/
user_manual.md
version.json

🧠 Zadania AI

Generowanie kodu dla każdego modułu

Tworzenie UI Windows + Android

Implementacja aktualizacji aplikacji

Implementacja synchronizacji P2P

Implementacja pendrive MASTER

Implementacja szyfrowania i bezpieczeństwa

Generowanie dokumentacji użytkownika

Testowanie i walidacja funkcji

🧩 Dane autora
Autor: CALISTO
X: https://x.com/ABSURD__CORP (x.com in Bing)  
Email: calistoxmass@gmail.com
Projekt: Calisto Vault
Rok: 2026

✅ Status projektu
README: Gotowe
AI_TASKS: Gotowe
Repozytorium: Struktura poprawna
Kod: W trakcie generowania
UI: W trakcie projektowania
Testy: W przygotowaniu

🧠 Cel końcowy
Stworzyć w pełni działającą aplikację Calisto Vault, która:

działa offline,

jest bezpieczna,

jest prywatna,

jest wieloplatformowa,

jest profesjonalna,

jest wizytówką autora.
