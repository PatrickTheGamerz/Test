@echo off
setlocal EnableDelayedExpansion
color 0c
title O.R.A.N.G. v35.0 - [GHOST_OPERATOR_AUTH]

:: =====================================================================
:: [ MODULE 0: CUSTOM AUTHENTICATION GATEWAY ]
:: =====================================================================
:auth
cls
echo.
echo  =======================================================
echo   [!] SECURE TERMINAL: ENCRYPTED GATEWAY
echo  =======================================================
echo.
echo | set /p="Enter Passkey: "

for /f "usebackq delims=" %%A in (`powershell -Command "$pass = Read-Host -AsSecureString ; $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($pass) ; [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)"`) do set "pass=%%A"

if not "%pass%"=="Orange_Toaster321" (
    echo.
    echo.
    echo [!] ACCESS DENIED: INCORRECT PASSPHRASE.
    echo [*] TERMINATING CONNECTION...
    timeout /t 2 >nul
    exit
)

:: =====================================================================
:: [ MODULE 1: DYNAMIC INTEGRITY SENSOR ]
:: =====================================================================
net session >nul 2>&1
if %errorLevel% == 0 (
    set "INTEGRITY=HIGH (ADMIN)"
) else (
    set "INTEGRITY=STANDARD (USER)"
)

:: Preserve mode if relaunching as Admin
if "%~1"=="MODE4_LAUNCH" (
    set "MODE=OVERSEER"
    set "CUR_CLR=04"
    goto boot
) else (
    set "MODE=PEN-TESTER"
    set "CUR_CLR=06"
)

:boot
cls
color %CUR_CLR%
echo.
echo    [ PASSPHRASE ACCEPTED. ENGAGING GHOST ARCHITECTURE... ]
set "load=####################"
for /L %%i in (1,1,20) do (
    set "seg=!load:~0,%%i!"
    cls
    echo.
    echo    [ INITIALIZING %MODE% SUBSYSTEM ]
    echo    [ !seg! ]  BOOTING: %%i0/200
    ping localhost -n 1 >nul
)

:dashboard
cls
color %CUR_CLR%
echo  _______________________________________________________________________
echo ^|  O.R.A.N.G. v35.0  ^|  %MODE% MODE  ^|  STATUS: SECURE_LINK
echo ^|_______________________________________________________________________^|
echo.
echo    [ OPERATOR: %USERNAME% ]  [ INTEGRITY: %INTEGRITY% ]  [ TIME: %TIME:~0,8% ]
echo  _______________________________________________________________________
echo.

if "%MODE%"=="PEN-TESTER" (
    echo    [1] RECON     - Deep Path Target Map
    echo    [2] CRYPTO    - SHA-256 Binary Hash Engine
    echo    [3] SOCKETS   - External Network C2 Audit
    echo    [4] REGISTRY  - Startup Hive Persistence Scan
    echo    [5] PRIVS     - Token ^& SID Enumeration
    echo    [6] WIFI_KEYS - Extract Local Wi-Fi Profiles
)
if "%MODE%"=="DEFENDER" (
    echo    [1] SCRUBBER  - Scan RAM for Suspicious Strings
    echo    [2] RECOVERY  - Retrieve Recent User Modified Data
    echo    [3] TASKS     - Scheduled Task Anomaly Audit
    echo    [4] KILLER    - Forceful Process Extermination
    echo    [5] FIREWALL  - Firewall State ^& Profile Audit
    echo    [6] BATTERY   - Generate System Battery Health Report
)
if "%MODE%"=="SENTINEL" (
    echo    [1] TRUE_LOGON- Deep Audit of Exact Account Logins
    echo    [2] DNS_TRACE - Website Domain Cache History
    echo    [3] USB_TRACK - Offline USB Device History
    echo    [4] SYS_EVENTS- Extract Recent Critical Windows Events
    echo    [5] CLIPBOARD - Extract Copied Memory Data
    echo    [6] AUDIT_LOG - Export Full System Audit to Desktop
)
if "%MODE%"=="OVERSEER" (
    echo    [!] RESTRICTED ADMINISTRATIVE DIAGNOSTICS [!]
    echo    [1] CMD_AUDIT - Read Process Creation Logs (Typed Commands)
    echo    [2] NET_ROUTE - Deep Network Routing Table Analysis
    echo    [3] SEC_POL   - Audit Local Security Policy Settings
    echo    [4] SYS_INFO  - Advanced WMI Hardware Configuration
)

echo.
echo    [7] SWITCH MODE (ORG_SWITCH 1-4)         [O] OPEN FOLDER (Framework Path)
echo    [S] EXIT FRAMEWORK                       [ORG_DELETE] MASTER UNINSTALL
echo  _______________________________________________________________________
echo.
set "cmd="
set /p "cmd=GHOST_CMD > "

:: --- INPUT VALIDATION ---
if "!cmd!"=="" goto dashboard

:: --- GLOBAL SWITCH LOGIC ---
if /I "!cmd!"=="ORG_SWITCH 1" (set "MODE=PEN-TESTER" & set "CUR_CLR=06" & goto boot)
if /I "!cmd!"=="ORG_SWITCH 2" (set "MODE=DEFENDER" & set "CUR_CLR=0b" & goto boot)
if /I "!cmd!"=="ORG_SWITCH 3" (set "MODE=SENTINEL" & set "CUR_CLR=0d" & goto boot)
if /I "!cmd!"=="ORG_SWITCH 4" goto check_admin_for_mode4
if /I "!cmd!"=="O" ( explorer "%~dp0" & goto dashboard )
if /I "!cmd!"=="S" exit
if /I "!cmd!"=="ORG_DELETE" goto master_uninstall

:: --- ROUTING ---
if "%MODE%"=="PEN-TESTER" goto sub_pen
if "%MODE%"=="DEFENDER" goto sub_def
if "%MODE%"=="SENTINEL" goto sub_sent
if "%MODE%"=="OVERSEER" goto sub_overseer
goto dashboard

:: =====================================================================
:: UAC ELEVATION CHECK FOR MODE 4
:: =====================================================================
:check_admin_for_mode4
if "%INTEGRITY%"=="HIGH (ADMIN)" (
    set "MODE=OVERSEER" & set "CUR_CLR=04" & goto boot
) else (
    cls
    color 0c
    echo.
    echo  =======================================================
    echo   [!] ELEVATION REQUIRED
    echo  =======================================================
    echo   Mode 4 (OVERSEER) requires Administrator privileges.
    echo   Requesting secure elevation via UAC...
    echo.
    timeout /t 2 >nul
    :: Trigger UAC and relaunch script with flag
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~dpnx0\" MODE4_LAUNCH' -Verb RunAs"
    exit
)

:: =====================================================================
:: MODE SUBSYSTEMS
:: =====================================================================
:sub_pen
if "!cmd!"=="1" ( cls & set /p "tp=Enter Target Path: " & if exist "!tp!" (tree "!tp!" /f /a) else (echo [!] PATH NOT FOUND.) & echo. & pause & goto dashboard )
if "!cmd!"=="2" ( cls & set /p "cf=Enter File Path: " & if exist "!cf!" (certutil -hashfile "!cf!" SHA256) else (echo [!] FILE NOT FOUND.) & echo. & pause & goto dashboard )
if "!cmd!"=="3" ( cls & echo [*] SCANNING ESTABLISHED CONNECTIONS... & netstat -ano ^| findstr "ESTABLISHED" & echo. & pause & goto dashboard )
if "!cmd!"=="4" ( cls & echo [*] AUDITING STARTUP HIVES... & reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" 2>nul & echo [+] Note: HKLM requires Admin integrity. & echo. & pause & goto dashboard )
if "!cmd!"=="5" ( cls & whoami /user & echo. & whoami /priv ^| findstr "Enabled" & echo. & pause & goto dashboard )
if "!cmd!"=="6" ( cls & echo [*] EXTRACTING SAVED WI-FI PROFILES... & netsh wlan show profiles ^| findstr "All User Profile" & echo. & pause & goto dashboard )
goto dashboard

:sub_def
if "!cmd!"=="1" ( cls & echo [*] SCANNING RAM... & wmic process get commandline ^| findstr /i "bypass hidden enc" & echo. & pause & goto dashboard )
if "!cmd!"=="2" ( cls & echo [*] RECENT FILES: & powershell -Command "Get-ChildItem $env:USERPROFILE -Recurse -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 10 FullName, LastWriteTime | Format-Table -AutoSize" & echo. & pause & goto dashboard )
if "!cmd!"=="3" ( cls & echo [*] SCHEDULED TASKS: & schtasks /query /fo TABLE 2>nul ^| findstr /i "Enabled" ^| powershell -Command "$input | Select-Object -First 15" & echo. & pause & goto dashboard )
if "!cmd!"=="4" (
    cls & echo [*] ACTIVE PROCESSES: & tasklist /NH ^| findstr /v "svchost.exe" ^| sort /+1 ^| powershell -Command "$input | Select-Object -First 10"
    echo. & set "pid=" & set /p "pid=ENTER PID TO TERMINATE: "
    if not "!pid!"=="" taskkill /F /T /PID !pid!
    echo. & pause & goto dashboard
)
if "!cmd!"=="5" ( cls & echo [*] FIREWALL STATE: & netsh advfirewall show allprofiles state & echo. & pause & goto dashboard )
if "!cmd!"=="6" ( cls & echo [*] GENERATING BATTERY HEALTH REPORT... & powercfg /batteryreport /output "%USERPROFILE%\Desktop\ORANG_Battery_Report.html" & echo [+] Report saved to Desktop! & echo. & pause & goto dashboard )
goto dashboard

:sub_sent
if "!cmd!"=="1" ( cls & echo [*] LOCAL ACCOUNT LAST LOGON: & powershell -Command "Get-LocalUser -ErrorAction SilentlyContinue | Select-Object Name, Enabled, LastLogon | Format-Table -AutoSize" & echo. & pause & goto dashboard )
if "!cmd!"=="2" ( cls & echo [*] DNS CACHE: & powershell -Command "Get-DnsClientCache -ErrorAction SilentlyContinue | Where-Object {$_.Entry -notmatch 'arpa$|local$'} | Select-Object Entry -Unique | Format-Table -AutoSize" & echo. & pause & goto dashboard )
if "!cmd!"=="3" ( 
    cls & echo [*] OFFLINE USB DEVICE HISTORY:
    if "%INTEGRITY%"=="STANDARD (USER)" ( echo [!] Requires Admin to view hardware registry keys. ) else ( reg query HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR ^| findstr "HKEY" )
    echo. & pause & goto dashboard 
)
if "!cmd!"=="4" ( cls & echo [*] RECENT CRITICAL SYSTEM EVENTS: & powershell -Command "Get-WinEvent -FilterHashtable @{LogName='System'; Level=1,2,3} -MaxEvents 5 -ErrorAction SilentlyContinue | Select-Object TimeCreated, Id, Message | Format-List" & echo. & pause & goto dashboard )
if "!cmd!"=="5" ( cls & echo [*] CLIPBOARD DATA: & powershell -Command "Get-Clipboard -ErrorAction SilentlyContinue" & echo. & pause & goto dashboard )
if "!cmd!"=="6" (
    cls & echo [*] EXPORTING SYSTEM AUDIT TO DESKTOP...
    set "audit_file=%USERPROFILE%\Desktop\ORANG_System_Audit.txt"
    echo O.R.A.N.G. SYSTEM AUDIT > "!audit_file!"
    echo TIMESTAMP: %DATE% %TIME% >> "!audit_file!"
    echo INTEGRITY: %INTEGRITY% >> "!audit_file!"
    wmic os get Caption, InstallDate, LastBootUpTime >> "!audit_file!"
    echo [+] Audit complete. Check your Desktop.
    echo. & pause & goto dashboard
)
goto dashboard

:sub_overseer
if "!cmd!"=="1" ( cls & echo [*] COMMAND LINE EXECUTIONS (Event 4688)... & powershell -Command "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688} -MaxEvents 15 -ErrorAction SilentlyContinue | Select-Object TimeCreated, @{Name='CommandLine';Expression={$_.Properties[8].Value}} | Format-Table -AutoSize -Wrap" & echo. & pause & goto dashboard )
if "!cmd!"=="2" ( cls & echo [*] NETWORK ROUTING TABLE... & route print -4 & echo. & pause & goto dashboard )
if "!cmd!"=="3" ( cls & echo [*] AUDITING LOCAL SECURITY POLICY... & secedit /export /cfg "%TEMP%\secpol.txt" >nul 2>&1 & findstr /i "PasswordComplexity MinimumPasswordLength" "%TEMP%\secpol.txt" & echo. & pause & goto dashboard )
if "!cmd!"=="4" ( cls & echo [*] ADVANCED WMI HARDWARE CONFIGURATION: & wmic computersystem get manufacturer,model,systemtype,totalphysicalmemory & wmic cpu get name,numberofcores & echo. & pause & goto dashboard )
goto dashboard

:: =====================================================================
:: [ MASTER UNINSTALLER ]
:: =====================================================================
:master_uninstall
cls
color 0c
echo  =======================================================================
echo   [!] WARNING: SCORCHED EARTH PROTOCOL INITIATED
echo  =======================================================================
set /p "del_conf=Type 'CONFIRM' to execute: "
if not "!del_conf!"=="CONFIRM" ( echo [*] Uninstaller aborted. & pause & goto dashboard )
echo [*] Flushing Network Resolvers...
ipconfig /flushdns >nul 2>&1
echo [*] Sweeping Registry for Legacy Hooks...
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "ORANG_CORE" /f >nul 2>&1
timeout /t 2 >nul
start /b "" cmd /c del "%~f0"&exit
