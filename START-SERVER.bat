@echo off
title Festival v Telci - Lokalni server
cd /d "%~dp0"

echo.
echo  ==========================================
echo   FESTIVAL V TELCI 2026 - Lokalni server
echo  ==========================================
echo.
echo  Spoustim server na http://localhost:8090
echo  Krok 1: Otevre se prohlizec automaticky
echo  Krok 2: Zmen artists-data.json a uloz
echo  Krok 3: Stranka se aktualizuje do 30 sekund
echo.
echo  [Zavreni tohoto okna = zastaveni serveru]
echo.

REM Zkus Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Pouzivam: Python HTTP server
    start "" "http://localhost:8090"
    timeout /t 1 /nobreak >nul
    python -m http.server 8090
    goto end
)

REM Zkus Python launcher
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Pouzivam: Python launcher
    start "" "http://localhost:8090"
    timeout /t 1 /nobreak >nul
    py -m http.server 8090
    goto end
)

REM Zkus Node npx serve
where npx >nul 2>&1
if %errorlevel% == 0 (
    echo  Pouzivam: npx serve (Node.js)
    npx --yes serve -l 8090 .
    goto end
)

REM Zkus Node npx http-server
where npx >nul 2>&1
if %errorlevel% == 0 (
    echo  Pouzivam: npx http-server (Node.js)
    npx --yes http-server -p 8090 -o --cors
    goto end
)

echo  CHYBA: Neni dostupny Python ani Node.js
echo  Nainstaluj Python z https://www.python.org/downloads/
pause

:end
