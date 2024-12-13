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
    const showedBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.table(showedBoard);
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
    if (targetCell.getValue() === 0) {
      targetCell.markCell(player);
    }
  }

  return { getBoard, printBoard, placeToken };
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

  function announcePlayer() {
    console.log(`It's ${players.getActivePlayer().name}'s turn.`);
  }

  function play(x, y) {
    board.placeToken(x, y, players.getActivePlayer().symbol);
    board.printBoard();
    players.switchPlayer();
    announcePlayer();
  }

  (function () {
    board.printBoard();
    announcePlayer();
  })()

  return play;
}

const game = GameFlow();
