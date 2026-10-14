@echo off
title RRBY Outbreak Task Portal - Server
echo ========================================================
echo   RRBY GAME OUTBREAK (UNITY 6) - FULLSTACK PORTAL
echo ========================================================
echo.
echo [1/2] Memastikan dependencies siap...
if not exist node_modules (
  echo Menginstall packages...
  call npm install
)
echo.
echo [2/2] Menjalankan server backend Express di http://localhost:3000...
echo.
start http://localhost:3000
node server.js
pause
