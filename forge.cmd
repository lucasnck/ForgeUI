@echo off
setlocal
REM Double-click to install and open the Forge UI showcase on Windows.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0forge.ps1" %*
exit /b %ERRORLEVEL%
