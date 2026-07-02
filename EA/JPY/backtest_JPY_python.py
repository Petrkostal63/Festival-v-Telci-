import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, time

# === PARAMETRY ===
SYMBOL         = "USDJPY=X"
RISK_PCT       = 0.01       # 1% riziko na obchod
RRR            = 2.0        # Risk:Reward
BREAKOUT_PIPS  = 0.05       # 5 pips buffer (USDJPY: 1 pip = 0.01)
MIN_RANGE_PIPS = 0.10       # 10 pips
MAX_RANGE_PIPS = 0.80       # 80 pips
ACCOUNT_SIZE   = 10000      # USD

# Stáhni 4 roky dat M15
print("Stahuji data USDJPY M15 (2021-2025)...")
df = yf.download("USDJPY=X", start="2021-01-01", end="2025-12-31",
                 interval="15m", auto_adjust=True, progress=False)

if df.empty:
    # Fallback na H1 pokud M15 není dostupný
    print("M15 nedostupné, zkouším H1...")
    df = yf.download("USDJPY=X", start="2021-01-01", end="2025-12-31",
                     interval="1h", auto_adjust=True, progress=False)

# Flatten multi-index columns pokud existují
if isinstance(df.columns, pd.MultiIndex):
    df.columns = df.columns.get_level_values(0)

print(f"Staženo {len(df)} svíček | Od {df.index[0]} do {df.index[-1]}")
df.index = pd.to_datetime(df.index, utc=True).tz_convert('Europe/Prague')

# === BACKTEST LOGIKA ===
trades = []
equity = ACCOUNT_SIZE
equity_curve = []

days = df.groupby(df.index.date)

for date, day_data in days:
    # Asijská session: 00:00 - 08:00 Prague time
    asian = day_data.between_time('00:00', '07:59')
    if asian.empty:
        continue

    asian_high = asian['High'].max()
    asian_low  = asian['Low'].min()
    range_size = asian_high - asian_low

    # Filtr range velikosti
    if range_size < MIN_RANGE_PIPS or range_size > MAX_RANGE_PIPS:
        continue

    # London open data: 08:00+
    london = day_data.between_time('08:00', '19:59')
    if london.empty:
        continue

    buy_entry  = asian_high + BREAKOUT_PIPS
    sell_entry = asian_low  - BREAKOUT_PIPS
    sl_size    = buy_entry - sell_entry  # symetrické SL

    buy_sl  = buy_entry  - sl_size
    sell_sl = sell_entry + sl_size
    buy_tp  = buy_entry  + sl_size * RRR
    sell_tp = sell_entry - sl_size * RRR

    # Procházej London svíčky chronologicky
    buy_triggered  = False
    sell_triggered = False
    buy_closed     = False
    sell_closed    = False

    for ts, bar in london.iterrows():
        h = bar['High']
        l = bar['Low']

        # Buy Stop trigger
        if not buy_triggered and h >= buy_entry:
            buy_triggered = True
            # Zrušíme sell order (InpCloseOnOpposite)
            sell_triggered = True
            sell_closed    = True

        # Sell Stop trigger
        if not sell_triggered and l <= sell_entry:
            sell_triggered = True
            buy_triggered  = True
            buy_closed     = True

        # Správa Buy pozice
        if buy_triggered and not buy_closed and not sell_closed:
            if l <= buy_sl:
                pnl_pct = -RISK_PCT
                equity  *= (1 + pnl_pct)
                trades.append({'date': date, 'dir': 'BUY', 'result': 'SL',
                               'pnl_pct': pnl_pct * 100, 'range_pips': range_size * 100})
                buy_closed = True
            elif h >= buy_tp:
                pnl_pct = RISK_PCT * RRR
                equity  *= (1 + pnl_pct)
                trades.append({'date': date, 'dir': 'BUY', 'result': 'TP',
                               'pnl_pct': pnl_pct * 100, 'range_pips': range_size * 100})
                buy_closed = True

        # Správa Sell pozice
        if sell_triggered and not sell_closed and not buy_closed:
            if h >= sell_sl:
                pnl_pct = -RISK_PCT
                equity  *= (1 + pnl_pct)
                trades.append({'date': date, 'dir': 'SELL', 'result': 'SL',
                               'pnl_pct': pnl_pct * 100, 'range_pips': range_size * 100})
                sell_closed = True
            elif l <= sell_tp:
                pnl_pct = RISK_PCT * RRR
                equity  *= (1 + pnl_pct)
                trades.append({'date': date, 'dir': 'SELL', 'result': 'TP',
                               'pnl_pct': pnl_pct * 100, 'range_pips': range_size * 100})
                sell_closed = True

        # Konec dne - zavři bez TP/SL
        if ts.hour >= 20:
            if buy_triggered and not buy_closed:
                price = bar['Close']
                pnl_pct = (price - buy_entry) / buy_entry * 10  # přibližné
                equity  *= (1 + pnl_pct * 0.1)
                trades.append({'date': date, 'dir': 'BUY', 'result': 'EOD',
                               'pnl_pct': pnl_pct, 'range_pips': range_size * 100})
                buy_closed = True
            if sell_triggered and not sell_closed:
                price = bar['Close']
                pnl_pct = (sell_entry - price) / sell_entry * 10
                equity  *= (1 + pnl_pct * 0.1)
                trades.append({'date': date, 'dir': 'SELL', 'result': 'EOD',
                               'pnl_pct': pnl_pct, 'range_pips': range_size * 100})
                sell_closed = True
            break

    equity_curve.append({'date': date, 'equity': equity})

# === VÝSLEDKY ===
results = pd.DataFrame(trades)
equity_df = pd.DataFrame(equity_curve)

if results.empty:
    print("ŽÁDNÉ OBCHODY - zkontrolujte data")
else:
    total_trades = len(results)
    wins = results[results['result'] == 'TP']
    losses = results[results['result'] == 'SL']
    eod = results[results['result'] == 'EOD']

    win_rate = len(wins) / total_trades * 100
    total_pnl = results['pnl_pct'].sum()
    net_profit = equity - ACCOUNT_SIZE

    gross_win  = wins['pnl_pct'].sum() if not wins.empty else 0
    gross_loss = abs(losses['pnl_pct'].sum()) if not losses.empty else 0
    profit_factor = gross_win / gross_loss if gross_loss > 0 else float('inf')

    # Max drawdown
    eq_vals = equity_df['equity'].values
    peak = np.maximum.accumulate(eq_vals)
    drawdown = (peak - eq_vals) / peak * 100
    max_dd = drawdown.max()

    print("\n" + "="*50)
    print("  JPY ASIAN RANGE BREAKOUT - VÝSLEDKY BACKTESTU")
    print("="*50)
    print(f"  Symbol:          USDJPY")
    print(f"  Období:          2021-2025")
    print(f"  Počáteční účet:  ${ACCOUNT_SIZE:,.0f}")
    print(f"  Konečný účet:    ${equity:,.2f}")
    print(f"  Čistý zisk:      ${net_profit:,.2f} ({(net_profit/ACCOUNT_SIZE*100):.1f}%)")
    print("-"*50)
    print(f"  Celkem obchodů:  {total_trades}")
    print(f"    TP (výhra):    {len(wins)}  ({win_rate:.1f}%)")
    print(f"    SL (prohra):   {len(losses)}  ({100-win_rate-len(eod)/total_trades*100:.1f}%)")
    print(f"    EOD (zavřeno): {len(eod)}")
    print(f"  Win Rate:        {win_rate:.1f}%")
    print(f"  Profit Factor:   {profit_factor:.2f}")
    print(f"  Max Drawdown:    {max_dd:.1f}%")
    print(f"  Průměrná výhra:  {wins['pnl_pct'].mean():.2f}% / obchod" if not wins.empty else "")
    print(f"  Průměrná prohra: {losses['pnl_pct'].mean():.2f}% / obchod" if not losses.empty else "")
    print("-"*50)
    print(f"  Risk/obchod:     {RISK_PCT*100:.1f}%  |  RRR: {RRR:.1f}")
    print(f"  Min/Max range:   {MIN_RANGE_PIPS*100:.0f}-{MAX_RANGE_PIPS*100:.0f} pips")
    print("="*50)

    # Po směrech
    print("\nVÝKON PODLE SMĚRU:")
    for direction in ['BUY', 'SELL']:
        d = results[results['dir'] == direction]
        if not d.empty:
            dw = d[d['result'] == 'TP']
            print(f"  {direction}: {len(d)} obchodů | WR: {len(dw)/len(d)*100:.0f}% | "
                  f"PnL: {d['pnl_pct'].sum():.1f}%")
