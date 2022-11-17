# Ośrodek Medyczny
Aplikacja webowa ułatwiająca prowadzenie badań nad różnymi chorobami.

### Testy
Aplikacja była testowana na systemie Linux Ubuntu oraz MacOS.

### Wykorzystane technologie
 - ReactJS
 - NodeJS 
 - MySQL

## Demo


## Wymagania
 - Docker (najłatwiejszy sposób uruchomienia programu)

## Konfiguracja
Na potrzeby zadania w repozytorium zawarto przykładowy plik .env (znajdujący się w katalogu [server](https://github.com/sniescior/medical-center/blob/main/server/.env)).


Zmienne środowiskowe DB_NAME oraz SERVER_PORT __NIE POWINNY BYĆ ZMIENIANE__ (może to skutkować niepoprawnym działaniem systemu)

## Instalacja
Po pierwsze należy sklonować repozytorium (branch main)
```
git clone https://github.com/sniescior/medical-center.git
```

Następnie, otwierając nowy terminal w folderze głównym projektu wywołać polecenie
```
docker-compose --env-file ./server/.env up
```

O ile plik .env nie został przeniesiony do innego miejsca, w takim przypadku w miejscu ./server/.env należy podać ścieżkę do tego pliku.

Docker compose powinien utworzyć instancję bazy danych, serwer oraz klienta aplikacji.
Łącznie 3 kontenery w ramach jednej sieci:
 - mysqlcontainer           (10.5.0.5)
 - nodeservercontainer      (10.5.0.6)
 - reactappcontainer        (10.5.0.7)

I tyle...

Po zakończeniu instalacji ostatnich pakietów wymaganych do poprawnego działania aplikacji klienta, można otworzyć w witrynę http://localhost:3000

## Baza danych
Docker zadba o inicjalizację bazy danych wraz z przykładowymi daynmi. Pliki konfiguracyjne bazy danych znajdują się w katalogu [/server/database](https://github.com/sniescior/medical-center/tree/main/server/database).


## Rozwiązywanie błędów
Może się zdarzyć, że aplikacja klienta otworzy się zanim serwer zostanie skonfigurowany. Objawi się to wyświetleniem błędu 500. W takim przypadku należy zrestartować kontener serwera (nodeservercontainer) oraz klienta (reactappcontainer), upewniając się, że przed uruchomieniem klienta, serwer jest aktywny.

