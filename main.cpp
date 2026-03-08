#include "raylib.h"
#include <vector>

// Game Constants
const int screenWidth = 400;
const int screenHeight = 500;
const float gravity = 0.4f;
const float jumpForce = -7.0f;
const int pipeWidth = 60;
const int pipeGap = 140;

struct Pipe {
    float x;
    float topHeight;
    bool active;
};

int main() {
    // 1. Initialize Window
    InitWindow(screenWidth, screenHeight, "C++ Flappy Bird (Raylib)");
    SetTargetFPS(60);

    // 2. Game Variables
    float birdY = screenHeight / 2.0f;
    float birdVelocity = 0.0f;
    float birdRadius = 15.0f;
    int score = 0;
    bool gameOver = false;

    std::vector<Pipe> pipes;
    float pipeTimer = 0;

    // 3. Main Game Loop
    while (!WindowShouldClose()) {
        
        // --- UPDATE LOGIC ---
        if (!gameOver) {
            // Apply Gravity
            birdVelocity += gravity;
            birdY += birdVelocity;

            // Flap logic
            if (IsKeyPressed(KEY_SPACE) || IsMouseButtonPressed(MOUSE_LEFT_BUTTON)) {
                birdVelocity = jumpForce;
            }

            // Pipe Generation
            pipeTimer += GetFrameTime();
            if (pipeTimer > 1.5f) { // New pipe every 1.5 seconds
                float randomHeight = (float)GetRandomValue(50, 250);
                pipes.push_back({ (float)screenWidth, randomHeight, true });
                pipeTimer = 0;
            }

            // Move Pipes & Check Collisions
            for (int i = 0; i < pipes.size(); i++) {
                pipes[i].x -= 3.0f; // Speed

                // Collision detection (Bird vs Pipes)
                Rectangle topPipe = { pipes[i].x, 0, (float)pipeWidth, pipes[i].topHeight };
                Rectangle bottomPipe = { pipes[i].x, pipes[i].topHeight + pipeGap, (float)pipeWidth, (float)screenHeight };
                
                if (CheckCollisionCircleRec({ 50, birdY }, birdRadius, topPipe) ||
                    CheckCollisionCircleRec({ 50, birdY }, birdRadius, bottomPipe)) {
                    gameOver = true;
                }

                // Scoring
                if (pipes[i].active && pipes[i].x < 50) {
                    score++;
                    pipes[i].active = false;
                }
            }

            // Floor/Ceiling collision
            if (birdY > screenHeight || birdY < 0) gameOver = true;
        } else {
            // Restart Logic
            if (IsKeyPressed(KEY_R)) {
                birdY = screenHeight / 2.0f;
                birdVelocity = 0;
                pipes.clear();
                score = 0;
                gameOver = false;
            }
        }

        // --- DRAWING ---
        BeginDrawing();
            ClearBackground(SKYBLUE);

            if (!gameOver) {
                // Draw Bird
                DrawCircle(50, (int)birdY, birdRadius, YELLOW);
                DrawCircleOutline(50, (int)birdY, birdRadius, 2, BLACK);

                // Draw Pipes
                for (const auto& pipe : pipes) {
                    DrawRectangle((int)pipe.x, 0, pipeWidth, (int)pipe.topHeight, DARKGREEN);
                    DrawRectangle((int)pipe.x, (int)pipe.topHeight + pipeGap, pipeWidth, screenHeight, DARKGREEN);
                }

                // Draw Score
                DrawText(TextFormat("Score: %i", score), 10, 10, 20, WHITE);
            } else {
                DrawText("CRASHED!", 120, 200, 30, RED);
                DrawText(TextFormat("Final Score: %i", score), 135, 240, 20, DARKGRAY);
                DrawText("Press 'R' to Restart", 110, 300, 20, BLACK);
            }
        EndDrawing();
    }

    // 4. Cleanup
    CloseWindow();
    return 0;
}
