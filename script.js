function GameBoard() {
  const numberOfRows = 3;
  const numberOfColumns = 3;
  const board = createBoard(numberOfRows, numberOfColumns);

  // Creates a board with the number of rows and columns specified
  function createBoard(rows, columns) {
    const bd = [];
    for (let i = 0; i < rows; i++) {
      bd[i] = [];
      for (let j = 0; j < columns; j++) {
        bd[i].push(Cell(i, j));
      }
    }
    return bd;
  }

  // Prints a table that shows the value of each cell
  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.table(boardValues);
  };

  // To avoid tempering with the content of the board through the console
  const getBoard = () => board;

  // Creates each cell
  function Cell(a, b) {
    const x = a;
    const y = b;
    let value = 0;

    // To avoid tempering with the value of the cells through the console
    const getValue = () => value;

    // So that the players can mark the cells
    const markCell = (player) => (value = player);

    return { x, y, getValue, markCell };
  }

  // Marks the specified cell only if it hasn't been filled before.
  function placeToken(x, y, player) {
    targetCell = board[x][y];
    targetCell.markCell(player);
  }

  // Checks if the board is full and returns a boolean
  function checkFull() {
    const availableCells = board.flat().filter((cell) => cell.getValue() === 0);
    if (availableCells.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  // Checks if three cells in a row have the same value other than 0 and returns a boolean
  function checkWinner() {
    const cellValue = (x, y) => board[x][y].getValue();
    if (
      (cellValue(0, 0) === cellValue(0, 1) &&
        cellValue(0, 1) === cellValue(0, 2) &&
        cellValue(0, 2) !== 0) ||
      (cellValue(1, 0) === cellValue(1, 1) &&
        cellValue(1, 1) === cellValue(1, 2) &&
        cellValue(1, 2) !== 0) ||
      (cellValue(2, 0) === cellValue(2, 1) &&
        cellValue(2, 1) === cellValue(2, 2) &&
        cellValue(2, 2) !== 0) ||
      (cellValue(0, 0) === cellValue(1, 0) &&
        cellValue(1, 0) === cellValue(2, 0) &&
        cellValue(2, 0) !== 0) ||
      (cellValue(0, 1) === cellValue(1, 1) &&
        cellValue(1, 1) === cellValue(2, 1) &&
        cellValue(2, 1) !== 0) ||
      (cellValue(0, 2) === cellValue(1, 2) &&
        cellValue(1, 2) === cellValue(2, 2) &&
        cellValue(2, 2) !== 0) ||
      (cellValue(0, 0) === cellValue(1, 1) &&
        cellValue(1, 1) === cellValue(2, 2) &&
        cellValue(2, 2) !== 0) ||
      (cellValue(2, 0) === cellValue(1, 1) &&
        cellValue(1, 1) === cellValue(0, 2) &&
        cellValue(0, 2) !== 0)
    ) {
      return true;
    } else {
      return false;
    }
  }

  return { getBoard, printBoard, placeToken, checkFull, checkWinner };
}

function Players(playerOneName = "Player One", playerTwoName = "Player Two") {
  // Factory function to create the players. In case methods are needed in the future
  function createPlayer(name, symbol) {
    const player = {
      name,
      symbol,
    };
    return player;
  }

  // Players are stored in an array
  const players = [
    createPlayer(playerOneName, 1),
    createPlayer(playerTwoName, 2),
  ];

  let activePlayer = players[0];

  // To avoid tempering with the active player through the console
  const getActivePlayer = () => activePlayer;

  function switchPlayer() {
    activePlayer === players[0]
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  }

  return { getActivePlayer, switchPlayer };
}

function GameFlow() {
  const board = GameBoard();
  const players = Players();

  // Logs on the console who's turn it is
  function announcePlayer() {
    console.log(`It's ${players.getActivePlayer().name}'s turn.`);
  }

  // The only way the user interacts with the game
  function playRound(x, y) {
    const activePlayer = players.getActivePlayer();

    // Only allows to play empty cells
    if (board.getBoard()[x][y].getValue() === 0) {
      // Only works if there's no winner yet and the board isn't full.
      if (!board.checkFull() && !board.checkWinner()) {
        // Places active player's token on the target cell
        board.placeToken(x, y, activePlayer.symbol);

        // Prints the board
        board.printBoard();

        if (board.checkWinner()) {
          // If there is a winner it announces the winner
          console.log(`The game is over! ${activePlayer.name} wins the game!`);
        } else if (board.checkFull()) {
          // If the board is full, the game is over and no one wins
          console.log("It's a tie, the board is full!");
        } else {
          // Otherwise it switches the active player and lets them know it's their turn
          players.switchPlayer();
          announcePlayer();
        }
      } else {
        console.log("Sorry girl, the game is over.");
      }
    } else {
      console.log("That cell has been marked already, try again!");
    }
  }

  // Get the live board. Used for the UI
  const getBoard = () => board.getBoard();

  // Starts the game by showing the empty board and announcing whose turn it is
  (function () {
    board.printBoard();
    announcePlayer();
  })();

  return { playRound, getBoard };
}

(function UI() {
  // Creates an object with all the needed query selectors
  const Queries = (function () {
    const board = document.getElementById("board");

    return { board };
  })();

  // Renders the board on the DOM
  function renderBoard() {
    game
      .getBoard()
      .flat()
      .forEach((cell) => {
        const newCell = document.createElement("div");
        const symbol = cell.getValue();
        newCell.classList.add("cell");
        newCell.dataset.x = cell.x;
        newCell.dataset.y = cell.y;
        newCell.textContent = symbol;

        Queries.board.appendChild(newCell);
      });
  }

  const game = GameFlow();
  renderBoard();
})();
