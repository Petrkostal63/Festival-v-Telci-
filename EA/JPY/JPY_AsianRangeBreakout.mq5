//+------------------------------------------------------------------+
//|                                     JPY_AsianRangeBreakout.mq5  |
//|  Strategie: Asian session range breakout na JPY párech           |
//|  - Buduje range během asijské session (výchozí 00:00-08:00)      |
//|  - Při London open zadá Buy Stop nad High + Sell Stop pod Low    |
//|  - Risk management: % z účtu, RRR konfigurovatelné               |
//|  Doporučené páry: USDJPY, EURJPY, GBPJPY                        |
//|  Doporučený timeframe: M15                                       |
//+------------------------------------------------------------------+
#property copyright "2026"
#property version   "1.00"
#property description "JPY Asian Range Breakout - London Open Strategy"

#include <Trade\Trade.mqh>
#include <Trade\SymbolInfo.mqh>

//--- Vstupní parametry
input group "=== ČASY SESSION (čas brokera) ==="
input int      InpAsianStart    = 0;     // Začátek asijské session (hodina)
input int      InpAsianEnd      = 8;     // Konec asijské session (hodina)
input int      InpLondonOpen    = 8;     // London open - zadání orderů (hodina)
input int      InpCloseAllHour  = 20;   // Uzavřít vše po (hodina)

input group "=== RISK MANAGEMENT ==="
input double   InpRiskPercent   = 1.0;   // Riziko na obchod (% z účtu)
input double   InpRRRatio       = 2.0;   // Risk:Reward ratio (TP = SL * RRR)
input double   InpBreakoutBuf   = 5.0;   // Buffer nad/pod range (body/pips)

input group "=== FILTRY RANGE ==="
input double   InpMinRangePips  = 10.0;  // Minimální velikost range (pips)
input double   InpMaxRangePips  = 80.0;  // Maximální velikost range (pips)

input group "=== POKROČILÉ ==="
input int      InpMagicNumber   = 20260001; // Magic number
input bool     InpBothDirs      = true;     // Obě směry (buy + sell stop)
input bool     InpCloseOnOpposite = true;   // Zrušit opačný order po triggeru
input int      InpSlippage      = 10;       // Max slippage (body)

//--- Globální proměnné
CTrade   trade;
double   asianHigh   = 0;
double   asianLow    = 0;
bool     rangeBuilt  = false;
bool     ordersPlaced = false;
datetime lastBarTime = 0;
datetime lastResetDay = 0;

//+------------------------------------------------------------------+
int OnInit()
{
   if(_Period != PERIOD_M15) {
      Print("VAROVÁNÍ: EA je optimalizováno pro M15. Aktuální TF: ", EnumToString(_Period));
   }

   trade.SetExpertMagicNumber(InpMagicNumber);
   trade.SetDeviationInPoints(InpSlippage);
   trade.SetTypeFilling(ORDER_FILLING_IOC);

   Print("JPY Asian Range Breakout EA spuštěn na ", _Symbol);
   Print("Asian session: ", InpAsianStart, ":00 - ", InpAsianEnd, ":00");
   Print("London open: ", InpLondonOpen, ":00 | Zavření: ", InpCloseAllHour, ":00");

   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   CancelPendingOrders();
}

//+------------------------------------------------------------------+
void OnTick()
{
   // Pracujeme na svíčkách M15
   datetime currentBar = iTime(_Symbol, PERIOD_M15, 0);
   if(currentBar == lastBarTime) return;
   lastBarTime = currentBar;

   MqlDateTime dt;
   TimeToStruct(TimeCurrent(), dt);
   int hour = dt.hour;

   // Reset každý nový den
   datetime todayDate = StringToTime(TimeToString(TimeCurrent(), TIME_DATE));
   if(todayDate != lastResetDay) {
      ResetDay();
      lastResetDay = todayDate;
   }

   // Budování Asian range
   if(hour >= InpAsianStart && hour < InpAsianEnd) {
      BuildAsianRange();
   }

   // London open - zadání pending orderů
   if(hour == InpLondonOpen && !ordersPlaced && rangeBuilt) {
      PlaceBreakoutOrders();
   }

   // Správa - zrušení opačného orderu po triggeru
   if(InpCloseOnOpposite && ordersPlaced) {
      ManageOppositeOrders();
   }

   // Uzavřít vše na konci dne
   if(hour >= InpCloseAllHour) {
      CloseAllPositions();
      CancelPendingOrders();
   }
}

//+------------------------------------------------------------------+
void ResetDay()
{
   asianHigh    = 0;
   asianLow     = DBL_MAX;
   rangeBuilt   = false;
   ordersPlaced = false;
   CancelPendingOrders();
   Print("Nový den - reset Asian range");
}

//+------------------------------------------------------------------+
void BuildAsianRange()
{
   // Projdeme všechny M15 bary v dnešní asijské session
   MqlRates rates[];
   int bars = CopyRates(_Symbol, PERIOD_M15, 0, 50, rates);
   if(bars <= 0) return;

   double dayHigh = 0;
   double dayLow  = DBL_MAX;

   datetime sessionStart = StringToTime(TimeToString(TimeCurrent(), TIME_DATE)) +
                           InpAsianStart * 3600;
   datetime sessionEnd   = StringToTime(TimeToString(TimeCurrent(), TIME_DATE)) +
                           InpAsianEnd * 3600;

   for(int i = 0; i < bars; i++) {
      if(rates[i].time >= sessionStart && rates[i].time < sessionEnd) {
         if(rates[i].high > dayHigh) dayHigh = rates[i].high;
         if(rates[i].low  < dayLow)  dayLow  = rates[i].low;
      }
   }

   if(dayHigh > 0 && dayLow < DBL_MAX) {
      asianHigh  = dayHigh;
      asianLow   = dayLow;
      rangeBuilt = true;
   }
}

//+------------------------------------------------------------------+
void PlaceBreakoutOrders()
{
   if(asianHigh <= 0 || asianLow >= DBL_MAX) return;

   double pipSize    = GetPipSize();
   double rangePips  = (asianHigh - asianLow) / pipSize;

   // Filtr velikosti range
   if(rangePips < InpMinRangePips) {
      Print("Range příliš malý: ", DoubleToString(rangePips, 1), " pips (min: ",
            InpMinRangePips, "). Přeskakuji.");
      ordersPlaced = true;
      return;
   }
   if(rangePips > InpMaxRangePips) {
      Print("Range příliš velký: ", DoubleToString(rangePips, 1), " pips (max: ",
            InpMaxRangePips, "). Přeskakuji.");
      ordersPlaced = true;
      return;
   }

   double buffer    = InpBreakoutBuf * pipSize;
   double buyEntry  = NormalizeDouble(asianHigh + buffer, _Digits);
   double sellEntry = NormalizeDouble(asianLow  - buffer, _Digits);
   double buySL     = NormalizeDouble(asianLow  - buffer, _Digits);
   double sellSL    = NormalizeDouble(asianHigh + buffer, _Digits);
   double slSize    = buyEntry - buySL;
   double buyTP     = NormalizeDouble(buyEntry  + slSize * InpRRRatio, _Digits);
   double sellTP    = NormalizeDouble(sellEntry - slSize * InpRRRatio, _Digits);

   double lotBuy    = CalculateLotSize(buyEntry, buySL);
   double lotSell   = CalculateLotSize(sellEntry, sellSL);

   Print("=== ASIAN RANGE BREAKOUT ===");
   Print("Range High: ", asianHigh, " | Low: ", asianLow,
         " | Velikost: ", DoubleToString(rangePips, 1), " pips");
   Print("Buy Stop:  Entry=", buyEntry,  " SL=", buySL,  " TP=", buyTP,  " Lot=", lotBuy);
   Print("Sell Stop: Entry=", sellEntry, " SL=", sellSL, " TP=", sellTP, " Lot=", lotSell);

   // Buy Stop
   if(lotBuy > 0) {
      if(!trade.BuyStop(lotBuy, buyEntry, _Symbol, buySL, buyTP,
                        ORDER_TIME_DAY, 0, "JPY_Buy")) {
         Print("Chyba Buy Stop: ", trade.ResultRetcodeDescription());
      }
   }

   // Sell Stop
   if(InpBothDirs && lotSell > 0) {
      if(!trade.SellStop(lotSell, sellEntry, _Symbol, sellSL, sellTP,
                         ORDER_TIME_DAY, 0, "JPY_Sell")) {
         Print("Chyba Sell Stop: ", trade.ResultRetcodeDescription());
      }
   }

   ordersPlaced = true;
}

//+------------------------------------------------------------------+
void ManageOppositeOrders()
{
   bool hasBuyPosition  = false;
   bool hasSellPosition = false;

   // Zjistit jestli máme otevřenou pozici
   for(int i = 0; i < PositionsTotal(); i++) {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != InpMagicNumber) continue;
      if(PositionGetString(POSITION_SYMBOL) != _Symbol) continue;

      if(PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY)  hasBuyPosition  = true;
      if(PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_SELL) hasSellPosition = true;
   }

   // Zrušit opačný pending order
   for(int i = OrdersTotal() - 1; i >= 0; i--) {
      ulong ticket = OrderGetTicket(i);
      if(!OrderSelect(ticket)) continue;
      if(OrderGetInteger(ORDER_MAGIC) != InpMagicNumber) continue;
      if(OrderGetString(ORDER_SYMBOL) != _Symbol) continue;

      ENUM_ORDER_TYPE type = (ENUM_ORDER_TYPE)OrderGetInteger(ORDER_TYPE);
      if(hasBuyPosition  && type == ORDER_TYPE_SELL_STOP) trade.OrderDelete(ticket);
      if(hasSellPosition && type == ORDER_TYPE_BUY_STOP)  trade.OrderDelete(ticket);
   }
}

//+------------------------------------------------------------------+
double CalculateLotSize(double entryPrice, double slPrice)
{
   double balance    = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskAmount = balance * InpRiskPercent / 100.0;
   double slPoints   = MathAbs(entryPrice - slPrice) / _Point;

   if(slPoints <= 0) return 0;

   double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   double tickSize  = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(tickValue <= 0 || tickSize <= 0) return 0;

   double lotSize = riskAmount / (slPoints * tickValue / tickSize);

   double minLot  = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double maxLot  = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
   double lotStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);

   lotSize = MathFloor(lotSize / lotStep) * lotStep;
   lotSize = MathMax(lotSize, minLot);
   lotSize = MathMin(lotSize, maxLot);

   return NormalizeDouble(lotSize, 2);
}

//+------------------------------------------------------------------+
double GetPipSize()
{
   int digits = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);
   // JPY páry mají 3 desetinná místa, ostatní 5
   if(digits == 3 || digits == 2) return _Point * 100;
   return _Point * 10;
}

//+------------------------------------------------------------------+
void CloseAllPositions()
{
   for(int i = PositionsTotal() - 1; i >= 0; i--) {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != InpMagicNumber) continue;
      if(PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      trade.PositionClose(ticket);
   }
}

//+------------------------------------------------------------------+
void CancelPendingOrders()
{
   for(int i = OrdersTotal() - 1; i >= 0; i--) {
      ulong ticket = OrderGetTicket(i);
      if(!OrderSelect(ticket)) continue;
      if(OrderGetInteger(ORDER_MAGIC) != InpMagicNumber) continue;
      if(OrderGetString(ORDER_SYMBOL) != _Symbol) continue;
      trade.OrderDelete(ticket);
   }
}
//+------------------------------------------------------------------+
