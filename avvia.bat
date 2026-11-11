@echo off
setlocal
echo ==========================================
echo   Avvio dei server in corso...
echo ==========================================

start "FBI Service" /D "%~dp0backend\fbiService" cmd /k "py server.py"

start "Service" /D "%~dp0backend\service" cmd /k "node src\app.js"

timeout /t 2 /nobreak >nul

start "AUTH Server" /D "%~dp0backend\AUTHserver" cmd /k "node src\server.js"

timeout /t 2 /nobreak >nul

start "Gateway" /D "%~dp0backend\gateway" cmd /k "node src\gateway.js"

echo.
echo Le finestre dei quattro server sono state aperte.
endlocal