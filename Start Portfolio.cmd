@echo off
cd /d "%~dp0"
if not exist node_modules call npm ci
if errorlevel 1 exit /b 1
echo Preparing the production preview. Pages will be built before the server starts.
call npm run build
if errorlevel 1 exit /b 1
echo Local portfolio: http://127.0.0.1:4317
call npm run preview
