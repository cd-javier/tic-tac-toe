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
    console.table(showedBoard)
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

  // Marks the specified cell
  function placeToken(x, y, player) {
    targetCell = board[x][y];
    targetCell.markCell(player);
  }

  return { getBoard, printBoard, placeToken };
}