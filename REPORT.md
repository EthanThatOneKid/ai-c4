# Report

- **Title**: Connect Four with AI using Minimax and Alpha-Beta Pruning
- **Author**: [**Ethan Davidson @EthanThatOneKid**](https://etok.codes/)

## Problem statement

This project aims to develop a playable Connect Four game with an AI opponent using SvelteKit and TypeScript. The AI leverages the Minimax algorithm with Alpha-Beta pruning for decision-making. The game offers user interaction, customizable player colors, and multiple player types (User vs. User, User vs. AI, Random vs. Random, etc.). Additionally, the game provides a turn history log and a restart functionality.

## Approach

The game utilizes the following:

- **Algorithms**:
  - **Minimax**: Evaluates all possible game states for a specific depth, maximizing the score for the AI player and minimizing for the human player.
  - **Alpha-Beta Pruning**: Optimizes Minimax by pruning branches that cannot possibly influence the final decision, significantly improving efficiency.
- **Data representation**: The board state is represented in TypeScript as a two-dimensional array, where each cell holds a player identifier (e.g., 0 for Player 1, 1 for Player 2, or -1 for empty).

## Description of the software

The software consists of the following components (see diagram below):

- **Front-end (Svelte):** Handles user interaction (clicks, selections), renders the game board UI with player pieces, updates the game state based on user input, and displays the turn history log.
- **AI (TypeScript):** Implements the Minimax algorithm with Alpha-Beta pruning. Analyzes the current game state, generates possible moves, evaluates each move using the Minimax approach, and determines the optimal move for the AI player.
- **Game Logic (TypeScript):** Manages the overall game flow, validates user moves, checks for game over conditions (win, draw), and interacts with both the Front-End and AI components.

### Components and IO relationships

```
+--------------------+      (User Input)
| Front-End (Svelte) | ------------------> (Game State)
+--------------------+      (Player Moves)
                     |
                     v
+--------------------+      (AI Move Recommendation)
|   Game Logic     | ------------------> (Updated Game State)
+--------------------+      (Win/Draw Status)
                     |
                     v
+--------------------+      (Board Update)
|       AI          | ------------------> (Move Evaluation)
+--------------------+      (Possible Moves)
```

### Technology stack

- Programming Language: TypeScript
- Framework: SvelteKit
- Libraries: None (Vanilla Typescript implementation)
- Data: Two-dimensional array representing the game board

## Evaluation

The game was tested by playing against the AI with varying Minimax search depths. Here are some observations:

- **Performance** :The AI plays strategically and achieves a high win rate. Increasing the search depth improves AI performance but also increases computation time.
- **Strengths:**: The game offers a user-friendly interface, customizable options, and a challenging AI opponent.
- **Limitations:**: Performance can be slow with high search depths.

## Conclusion

This project successfully created a playable Connect Four game with a competent AI opponent. The Minimax algorithm with Alpha-Beta pruning provides an effective solution for AI decision-making.

### Lessons learned

- Implementing AI algorithms like Minimax can significantly enhance game complexity and challenge.
- Balancing AI performance with computation time requires careful consideration of search depth.

### Future work

- Explore alternative AI algorithms like Negamax for potential performance improvements.
- Implement a difficulty level selection for the AI opponent.
- Enhance the game UI with animations, sound effects, and quality-of-life features.

## References

- [https://en.wikipedia.org/wiki/Minimax](https://en.wikipedia.org/wiki/Minimax) (Minimax algorithm)
- [https://simple.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning](https://simple.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) (Alpha-Beta pruning)
- [https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/) (Minimax with Alpha-Beta pruning)
