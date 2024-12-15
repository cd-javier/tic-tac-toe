import { GameFlow } from "./game-logic.js";

(function UI() {
  // Creates an object with all the needed query selectors
  const Queries = (function () {
    const board = document.getElementById("board");
    const display = document.getElementById("display");
    const resetBtn = document.getElementById("reset-btn");

    return { board, display, resetBtn };
  })();

  // Renders the board on the DOM
  function renderBoard() {
    // Empties the board
    Queries.board.innerHTML = "";

    // Refills the board
    game
      .getBoard()
      .flat()
      .forEach((cell) => {
        const newCell = document.createElement("div");
        const symbol = cell.getValue();
        newCell.classList.add("cell");
        newCell.dataset.x = cell.x;
        newCell.dataset.y = cell.y;

        if (symbol === 1) {
          newCell.classList.add("p1");
        } else if (symbol === 2) {
          newCell.classList.add("p2");
        }

        Queries.board.appendChild(newCell);
      });
  }

  function renderDisplay() {
    Queries.display.textContent = game.getDisplayMessage();
  }

  function render() {
    renderBoard();
    renderDisplay();
  }

  // IIFE that contains all event listeners
  (function EventListeners() {
    Queries.board.addEventListener("click", markSquare);
    Queries.board.addEventListener("mouseover", startHover);
    Queries.board.addEventListener("mouseout", endHover);
    Queries.resetBtn.addEventListener("click", resetGame);
  })();

  // When the board is clicked, if the click is done on a cell,
  // the playRound function is called with the values X and Y of that cell
  function markSquare(e) {
    const targetSquare = e.target;
    if (targetSquare.classList.contains("cell")) {
      game.playRound(targetSquare.dataset.x, targetSquare.dataset.y);
      render();
    }
  }

  // When the mouse enters a square that hasn't been played,
  // the symbol of that player is showed with less opacity
  function startHover(e) {
    const targetSquare = e.target;
    if (
      targetSquare.classList.contains("cell") &&
      !targetSquare.classList.contains("p1") &&
      !targetSquare.classList.contains("p2")
    ) {
      const activePlayer = game.players.getActivePlayer().symbol;
      switch (activePlayer) {
        case 1:
          targetSquare.classList.add("p1-hover");
          break;
        case 2:
          targetSquare.classList.add("p2-hover");
          break;
      }
    }
  }

  // When the mouse leaves the square, the symbol disappears
  function endHover(e) {
    const targetSquare = e.target;
    if (targetSquare.classList.contains("cell")) {
      const activePlayer = game.players.getActivePlayer().symbol;
      switch (activePlayer) {
        case 1:
          targetSquare.classList.remove("p1-hover");
          break;
        case 2:
          targetSquare.classList.remove("p2-hover");
          break;
      }
    }
  }

  // When the reset button is clicked, a new game is started by reassigning
  // the value of the variable game and rendering again.
  function resetGame() {
    game = GameFlow();
    render();
  }

  // Initialize game
  let game = GameFlow();
  render();
})();
