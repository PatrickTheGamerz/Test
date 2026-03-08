#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    // Set up the random number generator
    std::srand(std::time(0)); 
    int secretNumber = std::rand() % 100 + 1; // Random number between 1 and 100
    int guess = 0;
    int attempts = 0;

    std::cout << "======================================\n";
    std::cout << "   WELCOME TO THE NUMBER GUESSER!\n";
    std::cout << "======================================\n";
    std::cout << "I am thinking of a number between 1 and 100.\n\n";

    // The Game Loop
    while (guess != secretNumber) {
        std::cout << "Enter your guess: ";
        std::cin >> guess;
        attempts++;

        if (guess > secretNumber) {
            std::cout << "Too high! Try again.\n\n";
        } else if (guess < secretNumber) {
            std::cout << "Too low! Try again.\n\n";
        } else {
            std::cout << "\nBOOM! You got it!\n";
            std::cout << "The number was " << secretNumber << ".\n";
            std::cout << "It took you " << attempts << " attempts.\n";
        }
    }

    std::cout << "Thanks for playing!\n";
    return 0;
}
