#include <iostream>
using namespace std;

int NWD(int aa, int bb){
    int pom;
    while(bb!=0){
        pom=bb;
        bb=aa%bb;
        aa=pom;
    }
    return aa;
}

void NWD1(int aa, int bb){
    int pom;
    while(bb!=0){
        pom=bb; cout << "pom=" << pom;
        bb=aa%bb; cout << " b=" << bb;
        aa=pom; cout << " a=" << aa << endl;
    }
    cout << "NWD=" << aa;
}

int main(){
    int a, b; //liczby do NWD(a,b)
    int start_a, start_b;
    cout<<"Podaj dwie liczby naturalne:\n";
    cout << "a="; cin >>a;
    cout << "b="; cin >>b;
    start_a=a;
    start_b=b;
    cout << "wersja 1\n";
    cout << "NWD(" << start_a << "," << start_b << ")=" << NWD(a, b);
    cout << "\nwersja 2\n";
    NWD1(a, b);
    return 0;
}
















































































































































#include <iostream>

using namespace std;

int NWD(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

void NWD1(int a, int b) {
    while (b != 0) {
        int temp = b;
        cout << "pom=" << temp;
        b = a % b;
        cout << " b=" << b;
        a = temp;
        cout << " a=" << a << "\n";
    }
    cout << "NWD=" << a << "\n";
}

int main() {
    int a, b;
    
    cout << "Podaj dwie liczby naturalne:\n";
    cout << "a=";
    cin >> a;
    cout << "b=";
    cin >> b;
    
    cout << "wersja 1\n";
    cout << "NWD(" << a << ", " << b << ") = " << NWD(a, b) << "\n";
    
    cout << "\nwersja 2\n";
    NWD1(a, b);
    
    return 0;
}
