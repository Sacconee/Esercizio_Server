@echo off
setlocal
echo ==========================================
echo   Rimozione dipendenze (node_modules)...
echo ==========================================

echo Rimozione node_modules da Service...
if exist "%~dp0backend\service\node_modules" rmdir /s /q "%~dp0backend\service\node_modules"

echo Rimozione node_modules da AUTHserver...
if exist "%~dp0backend\AUTHserver\node_modules" rmdir /s /q "%~dp0backend\AUTHserver\node_modules"

echo Rimozione node_modules da Gateway...
if exist "%~dp0backend\gateway\node_modules" rmdir /s /q "%~dp0backend\gateway\node_modules"

echo.
echo ==========================================
echo   Disinstallazione completata!
echo ==========================================
pause
endlocal