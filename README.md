#include <iostream>
#include <fstream>

int main() {
    // We tell C++ to create a new file called "my_game.html"
    std::ofstream gameFile("my_game.html");

    if (gameFile.is_open()) {
        std::cout << "Building your web game..." << std::endl;

        // Writing the HTML structure
        gameFile << "<!DOCTYPE html>\n<html>\n<head>\n<title>C++ Web Game</title>\n";
        
        // Writing the CSS (The "style.css" part you asked for!)
        gameFile << "<style>\n";
        gameFile << "  body { background-color: #2b2b2b; color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; margin-top: 50px; }\n";
        gameFile << "  #game-board { width: 500px; height: 500px; background-color: #1e1e1e; border: 4px solid #444; border-radius: 10px; margin: 0 auto; position: relative; overflow: hidden; }\n";
        gameFile << "  #target { width: 40px; height: 40px; background-color: #ff4757; border-radius: 50%; position: absolute; top: 50%; left: 50%; cursor: pointer; transition: transform 0.1s; }\n";
        gameFile << "  #target:active { transform: scale(0.8); }\n";
        gameFile << "</style>\n</head>\n<body>\n";

        // Writing the visual elements
        gameFile << "  <h1>Catch the Dot!</h1>\n";
        gameFile << "  <h2>Score: <span id='score'>0</span></h2>\n";
        gameFile << "  <div id='game-board'>\n";
        gameFile << "    <div id='target'></div>\n";
        gameFile << "  </div>\n";

        // Writing the JavaScript to make the game actually work
        gameFile << "<script>\n";
        gameFile << "  let score = 0;\n";
        gameFile << "  const target = document.getElementById('target');\n";
        gameFile << "  const scoreDisplay = document.getElementById('score');\n";
        
        gameFile << "  target.addEventListener('click', function() {\n";
        gameFile << "    score++;\n";
        gameFile << "    scoreDisplay.innerText = score;\n";
        // Move the dot to a random position inside the 500x500 box
        gameFile << "    const randomX = Math.floor(Math.random() * 460);\n"; 
        gameFile << "    const randomY = Math.floor(Math.random() * 460);\n";
        gameFile << "    target.style.left = randomX + 'px';\n";
        gameFile << "    target.style.top = randomY + 'px';\n";
        gameFile << "  });\n";
        gameFile << "</script>\n";

        gameFile << "</body>\n</html>";

        // Close and save the file
        gameFile.close();
        std::cout << "Success! Look in the folder where this C++ file is located." << std::endl;
        std::cout << "Double-click 'my_game.html' to play your game in the browser!" << std::endl;
    } else {
        std::cout << "Error: C++ could not create the file." << std::endl;
    }

    return 0;
}
