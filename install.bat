@echo off
setlocal
echo ==========================================
echo   Installazione dipendenze in corso...
echo ==========================================

echo [1/3] Installazione dipendenze Service...
cd /d "%~dp0backend\service"
call npm install

echo.
echo [2/3] Installazione dipendenze AUTH Server...
cd /d "%~dp0backend\AUTHserver"
call npm install

echo.
echo [3/3] Installazione dipendenze Gateway...
cd /d "%~dp0backend\gateway"
call npm install

echo.
echo ==========================================
echo   Installazione completata con successo!
echo ==========================================
pause
endlocal