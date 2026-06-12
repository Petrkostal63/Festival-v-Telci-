# JPY Asian Range Breakout - Backtest Pokyny

## Strategie
Asian session (00:00-08:00 broker time) vytvoří range High/Low.
Při London open (08:00) se zadají:
- **Buy Stop** 5 pips nad Asian High
- **Sell Stop** 5 pips pod Asian Low
- SL na opačné straně range, TP = SL × RRR (default 2.0)

## Instalace v MT5
1. Zkopírovat `JPY_AsianRangeBreakout.mq5` do:
   `C:\Users\[Uživatel]\AppData\Roaming\MetaQuotes\Terminal\[ID]\MQL5\Experts\`
2. Otevřít MetaEditor → F7 pro kompilaci
3. Přetáhnout EA na graf M15

## Doporučené páry pro backtest
| Pár     | Volatilita | Spread  | Poznámka                     |
|---------|-----------|---------|------------------------------|
| USDJPY  | Střední   | Nízký   | Začít zde - nejstabilnější   |
| EURJPY  | Střední   | Střední | Dobrá likvidita              |
| GBPJPY  | Vysoká    | Vyšší   | Větší pohyby, větší drawdown |

## Nastavení Strategy Testeru
- **Symbol:** USDJPY
- **Timeframe:** M15
- **Období:** 2022.01.01 – 2025.12.31 (3 roky)
- **Model:** Každý tick (přesnější výsledky)
- **Deposit:** 10 000 USD
- **Leverage:** 1:100

## Startovní parametry k testování
```
InpAsianStart   = 0
InpAsianEnd     = 8
InpLondonOpen   = 8
InpCloseAllHour = 20
InpRiskPercent  = 1.0
InpRRRatio      = 2.0
InpBreakoutBuf  = 5.0
InpMinRangePips = 10
InpMaxRangePips = 80
InpBothDirs     = true
InpCloseOnOpposite = true
```

## Co sledovat ve výsledcích
- **Profit Factor** > 1.5 = dobrý, > 2.0 = výborný
- **Max Drawdown** < 15% ideálně
- **Win Rate** - u RRR 2.0 stačí i 40% winrate
- **Počet obchodů** - min 200 pro statistickou relevanci

## Optimalizace (po prvním backtestu)
Parametry k optimalizaci (v tomto pořadí):
1. `InpRRRatio` (1.5 – 3.0, krok 0.5)
2. `InpBreakoutBuf` (3 – 15, krok 2)
3. `InpMinRangePips` (5 – 20, krok 5)
4. `InpMaxRangePips` (50 – 100, krok 10)
5. `InpAsianEnd` (7 – 9, krok 1)

## Časy brokera
⚠️ Časy jsou v čase brokera! Zkontrolujte offset vašeho brokera vůči GMT.
Většina brokerů: GMT+2 (zima) / GMT+3 (léto).
- Asian session v broker time: obvykle 00:00-08:00 (bez úpravy)
- London open v broker time: obvykle 08:00-10:00
