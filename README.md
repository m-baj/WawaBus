# WawaBus - aplikacja wyświetlająca położenie autobusów warszawskich w czasie rzeczywistym

### Uruchamianie aplikacji

Ponieważ w projekcie została wykorzystana konteneryzacja, proces budowy systemu sprowadza się do:

1. Pobrania kodu z repozytorium

```bash
git clone https://gitlab.com/pis-24z-kodolamacze/WawaBus.git
```

2. Zbudowania obrazów i uruchomienia kontenerów poleceniem:

```bash
docker-compose up --build
```

Po około dwóch minutach wszystkie usługi w kontenerach będą gotowe.

Frontend będzie dostępny pod adresem: http://localhost:3000/

Aby zatrzymać działanie kontenerów należy użyć skrótu klawiszowego Ctrl+C lub polecenia:

```bash
docker-compose down
```
