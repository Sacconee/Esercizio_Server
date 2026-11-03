@echo off
setlocal
echo Avvio dei server...
echo Installazione dipendenze in corso...

start "FBI Service" /D "%~dp0backend\fbiService" cmd /k "py server.py"

:: Installa le dipendenze e poi avvia ogni server dalla cartella del relativo progetto.
start "Service" /D "%~dp0backend\service" cmd /k "npm install && node src\app.js"

timeout /t 2 /nobreak >nul

start "AUTH Server" /D "%~dp0backend\AUTHserver" cmd /k "npm install && node src\server.js"

timeout /t 2 /nobreak >nul

start "Gateway" /D "%~dp0backend\gateway" cmd /k "npm install && node src\gateway.js"

echo Le finestre dei tre server sono state aperte.
endlocal