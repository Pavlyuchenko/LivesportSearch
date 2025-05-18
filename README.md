# Livesport Search (Web Interview)

Autor: Michal Pavlíček michaelg.pavlicek@gmail.com

## Popis

Tato aplikace je napsána v React s Typescriptem a obsahuje 2 obrazovky: vyhledávání a výsledky.

Vyhledávání oproti zadání neobsahuje tlačítko "Hledat" a je místo toho realizováno pomocí "debounce". Po napsání znaku se čeká 300ms než je dotaz odeslán. Jinak tato obrazovka obsahuje filtraci, zobrazuje skeleton při načítání a zobrazuje chybovou hlášku v případě, že se nepodaří načíst data. Po kliknutí na řádek se uživatel dostane na detail řádku.

Jelikož nebyl k dispozici route pro detail, jsou data poslány komponentu Detail. Pokud by uživatel přímo zadal URL do prohlížeče, jsou data stáhnuta z vyhledávacího routu.

## Testy

Pro demonstraci byly vytvořeny 3 testovací soubory. Dva testují důležité komponenty: Filters.tsx a SearchInput.tsx. Třetí testuje asynchronní volání API a zda se správně zobrazí přijatá data. Testy jsou napsány pomocí Jest a React Testing Library. Pro testování API volání je použit mock funkce.

## Použití

Aplikace je dostupná na adrese https://livesport-search.vercel.app/.

Případně je možné spustit lokálně:

```bash
git clone https://github.com/Pavlyuchenko/LivesportSearch
cd livesport-search
npm install
npm run dev
npm test
```

## Struktura projektu

```
livesport-search
├── src
│   ├── __tests__
│   ├── app
│       ├── routes
│       ├── App.tsx
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── types
│   └── utils
```

Zpracování chyb je implementováno v hooks/useDebounceSearch.ts.
