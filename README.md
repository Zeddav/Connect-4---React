# React Connect Four

The objective of this project consist in a simple implementation of the game Connect Four to get started with React and TypeScript. 
The game is played by two players who take turns dropping colored discs into a grid. 
The first player to connect four discs in a row, either horizontally, vertically, or diagonally, wins the game.

## Get started

To run the project, clone the repository then:

1. Install the dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` to view the app.

### React 

This project uses React v18 and TypeScript, if you haven't used React before it is highly recommended to follow 
the [React.dev Learn](https://react.dev/learn) docs and doing the [Tic-Tac-Toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe) 
before starting the project. 

## Game features to implement

- Display grid of 7x6 on the screen
- Player are identified by their color, the first player is chosen randomly
- Players take turns placing a disc on the grid, a player cannot drop a disc twice in a row
- Each turn, check if the current player wins after each move, a player wins when four discs are connected in a row, either horizontally, vertically, or diagonally. in that case display a message to let players know the which player won the game.
- Each turn, check if the grid is completely filled with no four-in-a-row connection, in that case display a message to let players know the game ends in a draw.
- Add a button to start a new game when the previous one ended
- Add a button to re-start the current game

### Bonus features

- Display players moves history during the game (color, coordinates of the disc, ...)
- Click history item to restore the game to that state
- Add a timer to limit the time each player has to make a move
- Enhance the design of your application, make it look good, add some animations...
- Save the current game state in the local storage, so that you can refresh the page to reload the game in the same state
- Save games history in the local storage
- Load games history from the local storage

## Useful resources 

- [React.dev Docs](https://react.dev/reference/react)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)

## Tips

As a good developer you shouldn't start coding right away, take some time to think about the architecture of your app.
You can start by doing some mockups online or on a paper, and/or determine the components you will need to develop the game.

> Feel free to ask for help or validation of your architecture before starting to code.

Try to think in React while developing components, each component should be simple and have a single responsibility.

Leverage the power of TypeScript to use typing in your application, it will help you to produce better and more robust code.

## Note about git

Push to the main branch is restricted, you should switch to a new git branch named with you full name or initials before pushing anything to the remote repository.
